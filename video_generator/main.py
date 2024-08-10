from Wav2Lip_master import inference

def main():
    python inference.py --checkpoint_path "https://storage.cloud.google.com/video-generator-data/checkpoints/wav2lip.pth?authuser=3" --fps "240" --face "https://storage.cloud.google.com/video-generator-data/input/ganesh.jpg?authuser=3" --audio "https://storage.cloud.google.com/video-generator-data/input/Ajay.mp3?authuser=3" --outfile "https://storage.cloud.google.com/video-generator-data/output/Ganesh_Ajay.mp4"

    python inference.py --checkpoint_path "https://storage.cloud.google.com/video-generator-data/checkpoints/wav2lip.pth?authuser=3" --fps "240" --face "https://storage.cloud.google.com/video-generator-data/input/ganesh.jpg?authuser=3" --audio "https://storage.cloud.google.com/video-generator-data/input/Apurva.mp3?authuser=3" --outfile "https://storage.cloud.google.com/video-generator-data/output/Ganesh_Apurva.mp4"

    python inference.py --checkpoint_path "https://storage.cloud.google.com/video-generator-data/checkpoints/wav2lip.pth?authuser=3" --fps "240" --face "https://storage.cloud.google.com/video-generator-data/input/ganesh.jpg?authuser=3" --audio "https://storage.cloud.google.com/video-generator-data/input/Rahil.mp3?authuser=3" --outfile "https://storage.cloud.google.com/video-generator-data/output/Ganesh_Rahil.mp4"

    python inference.py --checkpoint_path "https://storage.cloud.google.com/video-generator-data/checkpoints/wav2lip.pth?authuser=3" --fps "240" --face "https://storage.cloud.google.com/video-generator-data/input/ganesh.jpg?authuser=3" --audio "https://storage.cloud.google.com/video-generator-data/input/mayank.mp3?authuser=3" --outfile "https://storage.cloud.google.com/video-generator-data/output/Ganesh_Mayank.mp4"

    python inference.py --checkpoint_path "https://storage.cloud.google.com/video-generator-data/checkpoints/wav2lip.pth?authuser=3" --fps "240" --face "https://storage.cloud.google.com/video-generator-data/input/ganesh.jpg?authuser=3" --audio "https://storage.cloud.google.com/video-generator-data/input/vishal.m4a?authuser=3" --outfile "https://storage.cloud.google.com/video-generator-data/output/Ganesh_Vishal.mp4"


if __name__ == '__main__':
	main()
