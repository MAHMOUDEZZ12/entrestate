# Full Airflow DAG — Ingest Grade A + B Sources End-to-End
# This DAG skeleton covers all Grade A and B sources from the expanded CSV. Each source has fetch → store_raw_snapshot → index_to_search_and_vector steps, with retries, provenance, and parallel execution.
# It now includes the CadenceSensor to dynamically adjust task scheduling.

from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.sensors.base import BaseSensorOperator
from datetime import datetime, timedelta
import redis
import time
import json

REDIS_URL = 'redis://redis:6379/0' # In production, use Airflow Variables/Connections

class CadenceSensor(BaseSensorOperator):
    def __init__(self, source_id, redis_conn=REDIS_URL, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.source_id = source_id
        # In a real environment, you'd use redis.Redis.from_url(redis_conn)
        self.r = redis.Redis.from_url(redis_conn)

    def poke(self, context):
        # Default to 1 hour if not set
        cadence = int(self.r.hget('source_cadence', self.source_id) or 3600)
        
        last_run = context['ti'].xcom_pull(task_ids=f"store_{self.source_id}_raw", key='last_run_ts')
        now_ts = int(time.time())
        
        if not last_run or (now_ts - int(last_run) >= cadence):
            print(f"CadenceSensor for '{self.source_id}': Cadence is {cadence}s. Last run was {last_run}. Cleared to run.")
            return True
            
        print(f"CadenceSensor for '{self.source_id}': Cadence is {cadence}s. Last run was {last_run}. Skipping.")
        return False

# Mock fetch functions
def fetch_google_ads(**kwargs): pass
def fetch_meta_business(**kwargs): pass
def fetch_tiktok_ads(**kwargs): pass
def fetch_youtube_data(**kwargs): pass
def fetch_google_search_serp(**kwargs): pass
def fetch_bing_serp(**kwargs): pass
def fetch_google_my_business(**kwargs): pass
def fetch_developer_site_feed(**kwargs): pass
def fetch_major_mls(**kwargs): pass
def fetch_broker_sites(**kwargs): pass
def fetch_government_land_registry(**kwargs): pass
def fetch_building_permits_portal(**kwargs): pass
def fetch_news_wire(**kwargs): pass
def fetch_press_release_wires(**kwargs): pass
def fetch_social_instagram(**kwargs): pass
def fetch_social_linkedin(**kwargs): pass
def fetch_social_x(**kwargs): pass
def fetch_youtube_channel_updates(**kwargs): pass
def fetch_ad_intel_pathmatics(**kwargs): pass
def fetch_similarweb(**kwargs): pass
def fetch_adbeat(**kwargs): pass
def fetch_trustpilot_reviews(**kwargs): pass
def fetch_google_reviews(**kwargs): pass
def fetch_local_review_sites(**kwargs): pass
def fetch_airbnb_listings(**kwargs): pass
def fetch_booking_com(**kwargs): pass

def store_raw_snapshot(source_id, **kwargs):
    # Save raw payload to object store + provenance envelope
    # Push execution timestamp to XComs for the sensor.
    ti = kwargs['ti']
    payload = ti.xcom_pull(task_ids=f"fetch_{source_id}")
    # ... storing logic here ...
    ti.xcom_push(key='last_run_ts', value=int(time.time()))
    pass

def index_raw_to_search_and_vector(**kwargs):
    # Parse, extract entities, compute embeddings, index to OpenSearch/vector DB
    # This would call the embeddings_pipeline.py script
    pass

with DAG(
    dag_id='realestate_ingestion_adaptive',
    start_date=datetime(2025, 9, 23),
    schedule_interval='@minute', # Sensor controls the actual run frequency
    catchup=False,
    default_args={
        'owner': 'data_team',
        'retries': 2,
        'retry_delay': timedelta(minutes=5),
        'poke_interval': 60, # How often the sensor checks
        'timeout': 600,      # Sensor timeout
    }
) as dag:

    all_source_tasks = []

    # Grade A & B sources combined
    sources_to_ingest = [
        (fetch_google_ads, 'google_ads'),
        (fetch_meta_business, 'meta_business'),
        (fetch_tiktok_ads, 'tiktok_ads'),
        (fetch_youtube_data, 'youtube_data'),
        (fetch_google_search_serp, 'google_search_serp'),
        (fetch_bing_serp, 'bing_serp'),
        (fetch_google_my_business, 'google_my_business'),
        (fetch_developer_site_feed, 'developer_site_feed'),
        (fetch_major_mls, 'major_mls'),
        (fetch_broker_sites, 'broker_sites'),
        (fetch_government_land_registry, 'government_land_registry'),
        (fetch_building_permits_portal, 'building_permits_portal'),
        (fetch_news_wire, 'news_wire'),
        (fetch_press_release_wires, 'press_release_wires'),
        (fetch_social_instagram, 'social_instagram'),
        (fetch_social_linkedin, 'social_linkedin'),
        (fetch_social_x, 'social_x'),
        (fetch_youtube_channel_updates, 'youtube_channel_updates'),
        (fetch_ad_intel_pathmatics, 'ad_intel_pathmatics'),
        (fetch_similarweb, 'similarweb'),
        (fetch_adbeat, 'adbeat'),
        (fetch_trustpilot_reviews, 'trustpilot_reviews'),
        (fetch_google_reviews, 'google_reviews'),
        (fetch_local_review_sites, 'local_review_sites'),
        (fetch_airbnb_listings, 'airbnb_listings'),
        (fetch_booking_com, 'booking_com')
    ]

    for fn, source in sources_to_ingest:
        t_sensor = CadenceSensor(
            task_id=f'sense_cadence_{source}',
            source_id=source,
            mode='poke',
        )

        t_fetch = PythonOperator(
            task_id=f'fetch_{source}',
            python_callable=fn
        )
        
        t_store = PythonOperator(
            task_id=f'store_{source}_raw',
            python_callable=store_raw_snapshot,
            op_kwargs={'source_id': source}
        )

        t_sensor >> t_fetch >> t_store
        all_source_tasks.append(t_store)

    # Indexing task depends on all storage tasks completing successfully
    t_index_all = PythonOperator(
        task_id='index_all_sources',
        python_callable=index_raw_to_search_and_vector,
        trigger_rule='all_success' # This task runs only if all its upstreams succeed
    )

    for t in all_source_tasks:
        t >> t_index_all
