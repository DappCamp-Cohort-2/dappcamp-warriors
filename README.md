# DappCamp Warriors

### Genearting the images

warriors-generator contains the nodejs script to generate the ~2.2K warriors images

```
cd warriors-generator
yarn install
mkdir images
node ./index.js images
```

### Uploading to IPFS
-   Upload the generated images directory to [Pinata](https://www.pinata.cloud/) and get the directory hash.
-   Generate metadata for each image. Use file `prep-scripts/prepare_metadata.py` by replacing `IMAGE_DIR_HASH` with image directory hash from last step.
```
cd warriors-generator
mkdir metadatas
node ./index.js metadatas <ipfs-base-url-here>
```
-   Upload the metadata directory to Pinata and get the directory hash. Let's call it `METADATA_DIR_HASH`.
-   Once the contract is deployed you can call the setBaseURI() function with this parameter - `https://gateway.pinata.cloud/ipfs/{METADATA_DIR_HASH}/`
-   Now your NFTs will automatically get an image and metadata assigned on minting.
