import React, { useEffect, useState } from "react";

import NoNFTsIllustration from "../components/NoNFTsIllustration.jsx";
import NFT from "../components/NFT.jsx";

import "../App.css";

export default function Home({ currentAccount, contractOwner, contract }) {
  const [nfts, setNfts] = useState([]);
  const [nftsLoaded, setNftsLoaded] = useState(false);

  useEffect(() => {
    fetchNfts();
  }, [currentAccount]);

  const fetchNfts = async () => {
    try {
      if (!contract) {
        return;
      }

      const counter = await contract._tokenIds();
      const baseURI = await contract.baseURI();

      const counterInt = parseInt(counter._hex, 16);

      setNftsLoaded(false);

      const allNfts = await Promise.all(
        Array(counterInt)
          .fill()
          .map(async (_, index) => {
            const tokenId = index;
            const ownerOf = await contract.ownerOf(tokenId);
            const tokenURI = `${baseURI}/${tokenId}`;

            try {
              const response = await (await fetch(tokenURI)).json();
              const { image } = response;

              return {
                tokenId,
                imageUrl: image,
                name: tokenId,
                currentOwner: ownerOf,
              };
            } catch {
              return {
                tokenId,
                imageUrl: "https://error404.fun/img/illustrations/09@2x.png",
                name: tokenId,
                currentOwner: ownerOf,
              };
            }
          })
      );

      setNftsLoaded(true);
      setNfts(allNfts);
    } catch (error) {
      console.log("fetchNfts error: ", error);
      setNftsLoaded(true);
    }
  };

  const isMetamaskConnected = !!currentAccount;

  return (
    <div style={{ maxWidth: "1280px", margin: "auto" }}>
      {isMetamaskConnected && nftsLoaded && nfts.length === 0 && (
        <NoNFTsIllustration />
      )}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {nfts.map((nft, index) => {
              return (
                <NFT
                  imageUrl={nft.imageUrl}
                  title={nft.tokenId}
                  currentOwner={nft.currentOwner}
                  contractOwner={contractOwner}
                  currentAccount={currentAccount}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
