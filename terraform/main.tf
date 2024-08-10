provider "google" {
  project = var.project_id
  region = var.region
}

# resource "google_storage_bucket" "bucket" {
#  name = var.bucket_name
#  location = var.region
#  force_destroy = true
# }

# Create multiple storage buckets using a loop
resource "google_storage_bucket" "buckets" {
  for_each = toset(var.bucket_names)
  name = each.key
  location = var.region
  force_destroy = true

  # Optional: Configure bucket settings
  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      age = 30
    }
  }
}

# resource "google_storage_bucket" "my_github_bucket" {
#  name                        = "hack-team-dbvolt-hacksquad_tfc_bucket"
#  location                    = "EU"
#  force_destroy               = true
#  public_access_prevention    = "enforced"
#  uniform_bucket_level_access = true
# }


