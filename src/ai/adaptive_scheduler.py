#!/usr/bin/env python3
"""
adaptive_scheduler.py
- Reads per-source ingest stats (from a JSON file, DB, or HTTP endpoint)
- Computes source scores and desired cadences
- Writes `source_cadence` and `source_score` to Redis (hashes)
- Exposes a minimal HTTP health / metrics endpoint
"""

import os
import time
import json
import logging
from datetime import datetime, timedelta
from typing import Dict, Any, List

import redis
import requests  # optional if you fetch stats via HTTP

LOG = logging.getLogger("adaptive_scheduler")
LOG.setLevel(logging.INFO)
ch = logging.StreamHandler()
ch.setFormatter(logging.Formatter("%(asctime)s %(levelname)s %(message)s"))
LOG.addHandler(ch)

REDIS_URL = os.environ.get("REDIS_URL", "redis://redis:6379/0")
STATS_SOURCE = os.environ.get("STATS_SOURCE", "")  # file path or HTTP URL
POLL_SECONDS = int(os.environ.get("POLL_SECONDS", "300"))  # default 5 minutes
MIN_SCORE = float(os.environ.get("MIN_SCORE", "0.0"))

r = redis.Redis.from_url(REDIS_URL, decode_responses=True)


def load_stats_from_file(path: str) -> List[Dict[str, Any]]:
    try:
        with open(path, "r") as f:
            data = json.load(f)
        return data
    except Exception as e:
        LOG.exception("Error loading stats file: %s", e)
        return []


def fetch_stats_from_http(url: str) -> List[Dict[str, Any]]:
    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        LOG.exception("Error fetching stats from HTTP: %s", e)
        return []


def compute_score(stats: Dict[str, Any]) -> float:
    # Robust version of earlier formula. Stats expected keys:
    # last_change_ts (ISO8601 string), change_freq_per_day (float),
    # last_error_rate (0..1), avg_value_score (0..10)
    try:
        now = datetime.utcnow()
        last_change = stats.get("last_change_ts")
        if last_change:
            try:
                last_change_dt = datetime.fromisoformat(last_change.replace("Z", "+00:00"))
            except Exception:
                last_change_dt = now - timedelta(days=365)
        else:
            last_change_dt = now - timedelta(days=365)

        age_hours = max((now - last_change_dt).total_seconds() / 3600.0, 1.0)
        freshness = 1.0 / age_hours  # higher if recently changed

        freq = float(stats.get("change_freq_per_day", 0.0))
        error = float(stats.get("last_error_rate", 0.0))
        # avg_value_score expected 0..10 scale
        value = float(stats.get("avg_value_score", 1.0))

        # weights can be tuned or loaded from config
        score = (0.5 * (value / 2.0)) + (0.35 * freq) + (0.7 * freshness) - (0.6 * error)
        # normalize lower bound
        score = max(score, MIN_SCORE)
        return float(score)
    except Exception as e:
        LOG.exception("compute_score error: %s", e)
        return float(MIN_SCORE)


def cadence_from_score(score: float) -> int:
    # Map score to cadence (seconds)
    # Aggressive mapping for production; tune as needed
    if score >= 6.0:
        return 60         # 1 minute
    if score >= 4.0:
        return 300        # 5 minutes
    if score >= 2.0:
        return 900        # 15 minutes
    if score >= 1.0:
        return 3600       # hourly
    return 14400          # 4 hours


def update_cadences(all_stats: List[Dict[str, Any]]):
    for s in all_stats:
        try:
            source_id = s.get("source_id") or s.get("id")
            if not source_id:
                continue
            score = compute_score(s)
            cadence = cadence_from_score(score)
            # In a real setup, pipeline this for performance
            r.hset('source_cadence', source_id, cadence)
            r.hset('source_score', source_id, score)
            LOG.info(f"Updated source: {source_id}, Score: {score:.2f}, Cadence: {cadence}s")
        except Exception as e:
            LOG.exception("Error processing stat item: %s", s)


def main():
    LOG.info("Starting adaptive scheduler...")
    while True:
        try:
            if STATS_SOURCE.startswith("http"):
                stats_data = fetch_stats_from_http(STATS_SOURCE)
            elif STATS_SOURCE:
                stats_data = load_stats_from_file(STATS_SOURCE)
            else:
                LOG.warning("No STATS_SOURCE defined. Nothing to process.")
                stats_data = []
            
            if stats_data:
                update_cadences(stats_data)

        except Exception as e:
            LOG.exception("Scheduler main loop error: %s", e)
        
        LOG.info("Cycle complete. Sleeping for %d seconds.", POLL_SECONDS)
        time.sleep(POLL_SECONDS)


if __name__ == "__main__":
    main()
