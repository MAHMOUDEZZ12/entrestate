# anomaly_detector.py

# This script provides a lightweight streaming anomaly detection function.
# It can be used in a streaming job (like Flink or Spark Streaming) or
# a scheduled batch job to check for anomalies in time-series data.

def calculate_ewma(data, span):
    """Calculates the Exponentially Weighted Moving Average."""
    if not data:
        return 0
    alpha = 2.0 / (span + 1.0)
    ewma = data[0]  # Start with the first value
    for value in data[1:]:
        ewma = alpha * value + (1 - alpha) * ewma
    return ewma

def anomaly_detect_streaming(new_value, historical_ewma, historical_std_dev, alpha=0.1):
    """
    Detects anomalies on a single new data point using historical stats.
    This is suitable for high-frequency streaming scenarios.
    
    Args:
        new_value: The latest data point.
        historical_ewma: The EWMA calculated up to the previous data point.
        historical_std_dev: The standard deviation up to the previous point.
        alpha: The smoothing factor for updating the EWMA.
        
    Returns:
        A tuple: (is_anomaly, z_score, new_ewma, new_std_dev)
    """
    if historical_std_dev is None or historical_std_dev < 1e-9:
        z_score = 0.0
    else:
        z_score = (new_value - historical_ewma) / historical_std_dev

    is_anomaly = abs(z_score) > 3.0 # A common threshold for z-score

    # Update EWMA and std dev for the next iteration (simplified update)
    new_ewma = alpha * new_value + (1 - alpha) * historical_ewma
    # A more robust implementation would update variance/std_dev as well.
    # For this example, we assume std_dev is recalculated periodically in batches.
    
    return is_anomaly, z_score, new_ewma


def anomaly_detect_batch(metric_timeseries: list, window=24, min_data_points=10):
    """
    Detects an anomaly on the most recent point in a batch of time-series data.
    
    Args:
        metric_timeseries: A list of (timestamp, value) tuples, sorted by timestamp.
        window: The number of recent data points to use for calculation.
        min_data_points: The minimum number of points required to perform detection.
        
    Returns:
        A tuple: (is_anomaly, z_score)
    """
    if len(metric_timeseries) < min_data_points:
        return False, 0.0

    # Use the last 'window' points for calculation
    vals = [v for _, v in metric_timeseries[-window:]]
    if not vals:
        return False, 0.0
        
    mean = sum(vals) / len(vals)
    variance = sum((x - mean) ** 2 for x in vals) / len(vals)
    std_dev = variance ** 0.5
    
    last_value = vals[-1]
    
    # Avoid division by zero for flat-lining metrics
    if std_dev < 1e-9:
        return False, 0.0
        
    z_score = (last_value - mean) / std_dev
    
    # Anomaly is flagged if the z-score is high (e.g., > 3 standard deviations)
    if abs(z_score) > 3.0:
        return True, z_score
        
    return False, z_score

# Example Usage:
if __name__ == '__main__':
    # Batch example
    hourly_ad_spend = [
        (1, 100), (2, 105), (3, 110), (4, 95), (5, 102), (6, 108),
        (7, 99), (8, 112), (9, 105), (10, 100), (11, 115), (12, 500) # Anomaly
    ]
    is_anomaly_batch, z_score_batch = anomaly_detect_batch(hourly_ad_spend, window=12)
    print(f"Batch Detection: Anomaly detected: {is_anomaly_batch}, Z-Score: {z_score_batch:.2f}")

    # Streaming example
    historical_average = 105.0
    historical_std = 5.0
    new_point = 500
    
    is_anomaly_stream, z_score_stream, new_ewma = anomaly_detect_streaming(new_point, historical_average, historical_std)[:3]
    print(f"Streaming Detection: Anomaly detected: {is_anomaly_stream}, Z-Score: {z_score_stream:.2f}, New EWMA: {new_ewma:.2f}")
