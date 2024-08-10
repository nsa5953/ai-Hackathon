import base64
import json
from google.cloud import aiplatform
from google.cloud import aiplatform_v1
from google.cloud.aiplatform.gapic.schema import predict
from google.cloud import storage
from cloudevents.http import CloudEvent

def predict_image_classification_job(event, context=None):
  project = "222320937624"  # replace with your GCP project ID
  endpoint_id = "215308565974351872"  # replace with your endpoint ID
  location = "us-central1"
  api_endpoint = "us-central1-aiplatform.googleapis.com"

  client_options = {"api_endpoint": api_endpoint}
  client = aiplatform.gapic.PredictionServiceClient(client_options=client_options)

  # Read the image file from GCS
  bucket_name = event['bucket']
  file_name = event['name']
  gcs_uri = f"gs://{bucket_name}/{file_name}"

  storage_client = storage.Client()
  bucket = storage_client.bucket(bucket_name)
  blob = bucket.blob(file_name)
  image_content = blob.download_as_bytes()

  encoded_image = base64.b64encode(image_content).decode('utf-8')

  instance = predict.instance.ImageClassificationPredictionInstance(
    content=encoded_image,
  ).to_value()
  instances = [instance]

  parameters = predict.params.ImageClassificationPredictionParams(
    confidence_threshold=0.2,
    max_predictions=5,
  ).to_value()

  endpoint = client.endpoint_path(
    project=project, location=location, endpoint=endpoint_id
  )
  response = client.predict(
    endpoint=endpoint, instances=instances, parameters=parameters
  )

  max_confidence = 0.0
  max_id_confidence = 0

  for prediction in response.predictions:
    display_names = prediction.get("displayNames", [])
    confidences = prediction.get("confidences", [])

    if display_names and confidences:
     for display_name, confidence in zip(display_names, confidences):
      if confidence > max_confidence:
        max_confidence = confidence
        max_id_confidence = display_name

  # Create a dictionary to hold the predictions
  output_data = {
    "predictions": max_id_confidence
  }

  # Convert the dictionary to JSON string
  output_json = json.dumps(output_data)

  # Save the prediction result to GCS (optional)
  output_bucket_name = "dementia-image-output"
  output_file_name = f"predictions/output.json"
  output_blob = storage_client.bucket(output_bucket_name).blob(output_file_name)
  output_blob.upload_from_string(output_json)

  print(f"Prediction results saved to: gs://{output_bucket_name}/{output_file_name}")