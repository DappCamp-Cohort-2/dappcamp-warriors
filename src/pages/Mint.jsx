import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { getBaseURI, mintNft, updateBaseURI } from "../utils/common";

import "react-toastify/dist/ReactToastify.css";

export default function Mint({ provider, contract, contractOwner }) {
  const [baseURI, setBaseURI] = useState("");

  useEffect(() => {
    if (!contract) {
      return;
    }
    provider.once("block", () => {
      contract.on("Transfer", onMintCompletion);
    });
  }, [contract]);

  useEffect(() => {
    const f = async () => {
      const uri = await getBaseURI(contract);
      setBaseURI(uri);
    };
    f();
  });

  const onBaseURIUpdate = () => {
    toast.success(`BaseURI updated successfully!`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onMintCompletion = (fromAddress, toAddress, tokenId) => {
    toast.success(
      `🦄 NFT with tokenId ${tokenId} was successfully minted by $${toAddress}!`,
      {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  return (
    <div className="mt-8">
      <section className="text-gray-600 body-font mb-8">
        <div
          className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col"
          style={{ margin: "auto" }}
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Settings
          </h2>
          <div className="relative mb-4">
            <label className="leading-7 text-sm text-gray-600">Base URI</label>
            <input
              type="text"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={baseURI}
              onChange={(e) => setBaseURI(e.target.value)}
            />
          </div>
          <button
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={() => updateBaseURI(contract, baseURI, onBaseURIUpdate)}
          >
            Update Base URI
          </button>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div
          className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col"
          style={{ margin: "auto" }}
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Immortalize your creation
          </h2>
          <button
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={() => mintNft(contract, contractOwner)}
          >
            Mint next item in Collection
          </button>
        </div>
      </section>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
