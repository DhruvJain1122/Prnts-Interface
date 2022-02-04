import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Artworks/Card/Card";
// import web3 from '../ethereum/web3';
// import PrntNFT from '../ethereum/PrntNFT';
import web3 from "../ethereum/web3";
import PrntNFTData from "../ethereum/PrntNFTData";
import { rejectedCards } from "../utils/config";

const Artworks = () => {
  const [listItems, setlistItems] = useState(null);

  const listArtworks = async () => {
    const list = await PrntNFTData.methods.getAllPrnts().call();
    // console.log(list);
    let promises = list.map((items) => {
      // console.log("items: ", items);
      return fetch(items.tokenUri)
        .then((res) => {
          // tokenURI = res;
          // console.log(res);
          let tokenURI;
          // = {
          //     name: '',
          //     symbol: '',
          //     description: '',
          //     no_of_editions: '',
          //     imageHash: '',
          //     videoHash: '',
          // };
          // let json;
          return res
            .json()
            .then(async (resp) => {
              tokenURI = resp;
              // console.log("tokenUri", tokenURI);

              const { prntPrice, status } = await PrntNFTData.methods
                .tokensByAddress(items[0], 1) // display price of 1st edition
                .call();
              // console.log(
              //     'price:',
              //     prntPrice,
              //     '-------- status:',
              //     status
              // );

              const ownerArray = await PrntNFTData.methods
                .getOwnerOfToken(items[0], 1)
                .call();
              const creator = ownerArray[0];
              // console.log(creator);

              const editions = tokenURI.attributes[0].value;
              const fetchEditionToBuy = async () => {
                for (let i = 1; i <= editions; i++) {
                  const ownerArray = await PrntNFTData.methods
                    .getOwnerOfToken(items[0], i)
                    .call();
                  if (ownerArray.length === 1) {
                    // console.log("edition to buy:", i);
                    return i;
                  }
                }
                return 1;
              };
              return fetchEditionToBuy().then(async (editionToBuy) => {
                // console.log("edition to buy inside:", editionToBuy);

                const rejectCards = rejectedCards;

                for (let i = 0; i < rejectCards.length; i++) {
                  if (items[0] === rejectCards[i]) {
                    return null;
                  }
                }

                return (
                  <div key={items[0]}>
                    <Link to={`/music/${items[0]}/${editionToBuy}`}>
                      <Card
                        title={`# ${tokenURI.name} - ${tokenURI.symbol}`}
                        username={creator}
                        price={`${web3.utils.fromWei(
                          prntPrice,
                          "ether"
                        )} MATIC`}
                        imageUrl={`https://prnts.mypinata.cloud/ipfs/${tokenURI.imageHash}`}
                        editions={tokenURI.attributes[0].value}
                        editionToBuy={editionToBuy}
                      />
                    </Link>
                  </div>
                );
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    });

    Promise.all(promises).then((listitems) => {
      listitems.reverse();
      setlistItems(listitems);
    });
  };

  useEffect(() => {
    listArtworks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchEditionToBuy = async () => {};

  return (
    <div
      style={{
        padding: "30px 0px",
        // margin: "100px"
      }}
    >
      <div className="grid-style">{listItems}</div>
    </div>
  );
};

export default Artworks;
