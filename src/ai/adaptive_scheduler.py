
# adaptive_scheduler.py
import time, json, math
import redis
from datetime import datetime, timedelta

# In a real setup, connect to your Redis instance.
# r = redis.Redis(host='REDIS_HOST', port=6379, db=0)

# Mock Redis for demonstration in this environment
class MockRedis:
    def __init__(self):
        self._data = {}
    def hset(self, name, key, value):
        if name not in self._data:
            self._data[name] = {}
        self._data[name][key] = value
    def hget(self, name, key):
        return self._data.get(name, {}).get(key)
r = MockRedis()


# Example metric inputs collected elsewhere (ingest_stats table/per-source)
# Each item: {source_id, last_change_ts, change_freq_per_day, last_error_rate, avg_value_score}
def compute_score(stats):
    # a simple weighted formula that can be expanded to ML
    last_change_ts_str = stats.get('last_change_ts')
    if last_change_ts_str:
        last_change_dt = datetime.strptime(last_change_ts_str, '%Y-%m-%dT%H:%M:%SZ')
    else:
        last_change_dt = datetime.utcnow() - timedelta(days=1)
        
    age_hours = max((datetime.utcnow() - last_change_dt).total_seconds()/3600.0, 1.0)
    freshness = 1.0 / age_hours
    freq = stats.get('change_freq_per_day', 0)    # higher => more important
    error = stats.get('last_error_rate', 0.0)
    value = stats.get('avg_value_score', 1.0)     # human-assigned or ML estimate
    score = (0.6 * value) + (0.3 * freq) + (0.6 * freshness) - (0.4 * error)
    return max(score, 0.0)

def cadence_from_score(score):
    # map score to cadence in seconds (lower = more frequent)
    if score > 5: return 60    # every minute
    if score > 3: return 300   # 5 minutes
    if score > 1.5: return 900 # 15 minutes
    if score > 0.5: return 3600 # hourly
    return 14400               # 4 hours

def update_cadences(all_stats):
    print("Updating cadences...")
    for s in all_stats:
        score = compute_score(s)
        cadence = cadence_from_score(score)
        r.hset('source_cadence', s['source_id'], cadence)
        r.hset('source_score', s['source_id'], score)
        print(f"  Source: {s['source_id']}, Score: {score:.2f}, Cadence: {cadence}s")

# Example: scheduled run every 5 minutes from cron / Kubernetes CronJob
if __name__ == '__main__':
    # This is a mock stats file. In production, this would be a database query.
    mock_stats_data = [
        {"source_id": "google_ads", "last_change_ts": "2025-09-24T18:00:00Z", "change_freq_per_day": 50, "last_error_rate": 0.01, "avg_value_score": 5.0},
        {"source_id": "meta_business", "last_change_ts": "2025-09-24T17:30:00Z", "change_freq_per_day": 100, "last_error_rate": 0.05, "avg_value_score": 4.5},
        {"source_id": "government_land_registry", "last_change_ts": "2025-09-23T12:00:00Z", "change_freq_per_day": 1, "last_error_rate": 0.0, "avg_value_score": 8.0}
    ]
    
    # Simulate running this as a service
    # while True:
    print("Running adaptive scheduler cycle...")
    # In a real cron job, you would query your stats database here.
    # For this example, we're just using the mock data.
    update_cadences(mock_stats_data)
    print("Scheduler cycle complete.")
    # time.sleep(300)
