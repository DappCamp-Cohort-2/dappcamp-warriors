# DappCamp Warriors

### Warriors Generator

warriors-generator contains all the scripts and assets to generate the ~2.2K warriors. It uses p5.js to draw hat, character, and weapon charts on the canvas element in the browser and then takes a snapshot of the canvas to generate the image.
Currently, the ~2.2K images take ~12 minutes to generate.

-   Open warriors-generator/index.html in a local development server mode (like with VS Code Live Server)
-   Images will start getting generated when you open the index.html file. Keep the browser tab open until all the images get generated.

### Uploading to IPFS

-   Every image must be renamed to have numbers from 0 to `number of images - 1` and put in a separate directory. Use `prep-scripts/rename.py` for this.
-   Upload the directory to [Pinata](https://www.pinata.cloud/) and get the directory hash.
-   Generate metadata for each image. Use file `prep-scripts/prepare_metadata.py` by replacing `IMAGE_DIR_HASH` with image directory hash from last step.
-   Upload the metadata directory to Pinata and get the directory hash. Let's call it `METADATA_DIR_HASH`.
-   Once the contract is deployed you can call the setBaseURI() function with this parameter - `https://gateway.pinata.cloud/ipfs/{METADATA_DIR_HASH}/`
-   Now your NFTs will automatically get an image and metadata assigned on minting.
