import json
from glob import glob

HASH = "IMAGE_DIR_HASH"
NUM_OF_IMAGES = 2211

base_url = f"https://gateway.pinata.cloud/ipfs/{HASH}"

for idx in range(NUM_OF_IMAGES):
    image_path = f"{base_url}/{idx}.png"
    nft_metadata = {
        "image": image_path,
    }

    with open(f"metadata/{idx}.json", "w") as f:
        json.dump(nft_metadata, f, indent=2)
