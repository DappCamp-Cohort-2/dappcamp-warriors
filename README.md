### Setup

1. Install Depedencies

```bash
    npm install
  ```

### Deploy the contract on Rinkeby Test Network using Alchemy as Node Provider

1. Create a file by name `.env` inside the root directory of this project (if not already created by the contract deploy script). Paste the following lines inside this .env file

```
ALCHEMY_API_KEY = 'YOUR_ALCHEMY_API_KEY"
WALLET_PRIVATE_KEY = 'YOUR_WALLET_PRIVATE_KEY'
```

2. Replace `YOUR_ALCHEMY_API_KEY` with API key (use the full Alchemy URL) created using Alchemy

3. Replace `YOUR_WALLET_PRIVATE_KEY` with private key obtained by following these steps
    
    1. Click on metamask plugin icon in the browser
    2. Select `Account details`
    3. Click `Export Private Key` button and confirm your password

4. Run the following command to deploy faucet on rinkeby network

    `npx hardhat run scripts/deploy.js --network rinkeby`

5. The deployed contract address will be printed to console and will also be automatically be copied to the abis folder in src directory.


### Generating the images

- `warriors-generator` folder contains the Node.js script to generate the ~2.2K warriors images

```
cd warriors-generator
npm install
mkdir images
node ./index.js images
```

### Uploading to IPFS

-   Upload the generated images directory to [Pinata](https://www.pinata.cloud/).
-   Generate metadata for each image.
```
cd warriors-generator
mkdir metadata
node ./index.js metadata <images-directory-ipfs-url-here>
```
-   Upload the metadata directory to Pinata and get the directory hash. Let's call it `METADATA_DIR_HASH`.
-   Once the contract is deployed you can call the setBaseURI() function with this parameter - `https://gateway.pinata.cloud/ipfs/{METADATA_DIR_HASH}/`
-   Now your NFTs will automatically get an image and metadata assigned on minting.

### Start the Web App

Use the following command to start the web app
```
npm start
```

### Minting the NFTs

1. After running the web application click on `Mint next item in Collection` to mint a new NFT
2. You can also use `Remix` to mint NFTs
    1. Copy the contract abi to Remix IDE
    2. Paste contract address in `At Address` field
    3. Use `mint` function to mint an NFT

### Viewing the NFT Collection on OpenSea

1. Replace `CONTRACT_ADDR` and `TOKEN_ID` in `https://testnets.opensea.io/assets/CONTRACT_ADDR/TOKEN_ID` to access specific token in this collection
