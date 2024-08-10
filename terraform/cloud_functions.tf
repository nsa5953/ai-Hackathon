resource "google_cloudfunctions_function" "image_classifier_function" {
  entry_point           = "predict_image_classification_job"
  name                  = "gen1-image-classifier-cloud-function"
  region                = "us-central1"
  runtime               = "python310"
  service_account_email = var.workload_sa_email
  source_archive_bucket = "dementia-image-input"
  source_archive_object = "image_classifier.zip"
  event_trigger {
    event_type = "google.storage.object.finalize"
    resource = "dementia-image-input"
  }
}

output "gen1_function_uri" {
  value = google_cloudfunctions_function.image_classifier_function.https_trigger_url
}
