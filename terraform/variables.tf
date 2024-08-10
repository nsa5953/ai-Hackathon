variable "project_id" {
  description = "hack-team-dbvolt-hacksquad"
  type = string
 }

variable "region" {
  description = "us-central1"
  type = string
  default = "us-central1"
}

# variable "bucket_name" {
#   description = "hack-team-dbvolt-hacksquad_terraform_test"
#  type = string
# }

variable "workload_sa_email" {
  description = "workload@hack-team-dbvolt-hacksquad.iam.gserviceaccount.com"
  type = string
}

variable "bucket_names" {
  description = "List of Google Cloud Storage bucket names"
  type        = list(string)
  default     = ["dbvolt-hacksquad-dementia", "dementia-image-input", "dementia-image-output", "video-generator-data"]
}
