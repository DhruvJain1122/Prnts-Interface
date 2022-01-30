import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import introImg from "../../assets/images/Intro-image2.jpg";
import PrntNFTData from "../../ethereum/PrntNFTData";

const Body = () => {
  const [latestMint, setLatestMint] = useState();
  const [tokenURI, setTokenURI] = useState();

  const listArtworks = async () => {
    try {
      const list = await PrntNFTData.methods.getAllPrnts().call();
      setLatestMint(list[list.length - 1]);
      console.log("list: ", list);

      const res = await fetch(list[list.length - 1].tokenUri);
      res.json().then((resp) => {
        console.log("token uri", resp);
        setTokenURI(resp);
      });
    } catch (err) {
      if (err) console.log(err);
    }
  };
  useEffect(() => {
    listArtworks();
  }, []);
  return (
    <div className="intro">
      <div className="intro-img">
        {/* <img src={introImg} alt="" /> */}
        <Link to={`/music/${latestMint ? latestMint[0] : ""}/1`}>
          <img
            src={tokenURI ? `https://ipfs.io/ipfs/${tokenURI.imageHash}` : ""}
            alt=""
          />
        </Link>
      </div>
      <div className="intro-content">
        <h1 style={{ padding: "10px 0px 20px 0px" }}>
          {/* Imagine music as NFTS{' '} */}
        </h1>
        {/* <Link to={`/music/${latestMint[0]}/1`}> */}
        <Link to="/">
          <button className="btn">
            <h3>Explore Music</h3>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Body;
