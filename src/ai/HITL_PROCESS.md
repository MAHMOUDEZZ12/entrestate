# Human-in-the-Loop (HITL) & Active Learning Process

This document outlines the architecture for our Human-in-the-Loop (HITL) and active learning system. This system is crucial for continuously improving our AI models by incorporating human feedback, especially for low-confidence predictions or novel data patterns.

## 1. Core Workflow

The process follows a continuous feedback loop:

1.  **Route for Review**: When an AI model (e.g., entity linker, sentiment classifier) produces a result with a confidence score below a predefined threshold, or when it encounters a new, unrecognized entity, the item is flagged and routed to the HITL queue.

2.  **Human Labeling**: A human analyst reviews the item in a simple labeling UI. They either confirm the AI's prediction, correct it, or provide a new label.

3.  **Store Feedback**: The feedback is stored in a structured format in a dedicated `labels` database table. This creates a high-quality, human-verified dataset.

4.  **Retrain Models**: Periodically (e.g., nightly or weekly), a training job is triggered. This job uses the newly collected human-labeled data to fine-tune or retrain the relevant AI models.

5.  **Deploy Updated Models**: The improved models are deployed back into the production pipeline, leading to better accuracy and fewer items needing human review over time.

## 2. Data Schema for Feedback

A simple but effective schema is used to store the feedback from human labelers. This data is stored in a `labels` table in our primary database (e.g., Firestore or Cloud SQL).

**Table: `labels`**

| Column | Type | Description |
|---|---|---|
| `id` | UUID | Primary key for the label entry. |
| `item_type` | STRING | The type of item being labeled (e.g., 'entity_link', 'sentiment', 'image_classification'). |
| `item_ref` | STRING | A reference ID to the original item in the database (e.g., a listing ID, a review ID). |
| `label` | STRING | The label applied by the human (e.g., 'Emaar', 'positive', 'villa_exterior'). |
| `user_id` | STRING | The ID of the human analyst who provided the label. |
| `ts` | TIMESTAMP | The timestamp when the label was submitted. |
| `prev_confidence`| FLOAT | The AI's original confidence score that triggered the review. Useful for analysis. |
| `session_id` | STRING | An identifier for the labeling session. |


## 3. Active Learning Strategy

Instead of reviewing items randomly, we use an **active learning** strategy to prioritize the most "interesting" or "uncertain" items for human review. This makes the labeling process much more efficient.

The primary method is **uncertainty sampling**, specifically using the **entropy** of the classifier's predictions.

### Pseudocode for Active Learning Loop:

```python
def active_learning_cycle():
    # 1. Get a batch of new, unlabeled data from the ingestion pipeline
    unlabeled_data = get_new_data_batch(size=5000)

    # 2. Get predictions and their confidence scores (or probability distributions) from the current model
    predictions = model.predict_proba(unlabeled_data)

    # 3. Calculate the entropy for each prediction. Higher entropy means more uncertainty.
    # Entropy = -sum(p * log(p)) for each class probability p
    uncertainty_scores = calculate_entropy(predictions)

    # 4. Select the top 'k' items with the highest uncertainty scores
    most_uncertain_items = select_top_k_by_score(unlabeled_data, uncertainty_scores, k=200)

    # 5. Push these items to the HITL labeling queue/UI
    push_to_labeling_ui(most_uncertain_items)

    # --- After human feedback is collected ---

    # 6. Fetch the new labels from the 'labels' table
    new_labels = get_new_labels_from_db()

    # 7. Retrain or fine-tune the model using the new high-value labels
    model.fine_tune(new_labels)

    # 8. Deploy the updated model
    deploy_model(model)
```

This cycle ensures that human effort is focused on the examples that the model is most confused about, leading to the fastest possible improvement in model performance.
