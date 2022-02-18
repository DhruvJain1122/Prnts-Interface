import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { ReactVideo, ReactAudio, YoutubePlayer } from "reactjs-media";
import ReactPlayer from "react-player";
import "../components/Art/Art.css";
import { Link, useHistory, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { FaExternalLinkAlt } from "react-icons/fa";
import Bids from "../components/Art/Bids/Bids";
import web3 from "../ethereum/web3";
import PrntNFTData from "../ethereum/PrntNFTData";
import PrntNFTMarketplace from "../ethereum/PrntNFTMarketplace";
import PrntNFT from "../ethereum/build/PrntNFT.json";
import PrntNFTFactory from "../ethereum/PrntNFTFactory";

import Modal from "../components/Art/ApproveModal/ApproveModal";
import useModal from "../hooks/useModal";
import {Grid} from '@mui/material';

import axios from "axios";

const LinkToProfile = styled(Link)`
  display: grid;
  height: 100px;
  width: 100px;
  border-radius: 100px;
  /* background: rgb(233, 233, 233); */
  background: #e9eff0;
  /* box-shadow: 3px 3px 7px #d3d3d3, -1px -2px 30px #f8f8f8; */
  box-shadow: 5px 5px 12px #dbe1e2, -5px -5px 12px #f7fdfe;
  align-self: center;
  overflow: hidden;
  margin-top: 10px;
  justify-content: center;
  align-content: center;

  img {
    width: 100px;
    height: auto;
    border-radius: 100px;
  }
`;

const Art = ({ account, isMobile }) => {
  const { id, tokenId } = useParams();

  let history = useHistory();

  const { isShowing, toggle } = useModal();

  const [prnt, setprnt] = useState(["", "", ""]);
  const [totalOwners, settotalOwners] = useState(1);
  // const [account, setaccount] = useState(null)
  // const [Account, setAccount] = useState("")
  const [status, setstatus] = useState("");
  const [PRNT_NFT_MARKETPLACE, setPRNT_NFT_MARKETPLACE] = useState("");
  const [listBids, setlistBids] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [instance, setInstance] = useState();
  const [isApproved, setIsApproved] = useState(false);
  const [ownerArray, setOwnerArray] = useState([""]);
  const [prntPrice, setprntPrice] = useState("0");
  const [tokenURI, settokenURI] = useState({ attributes: [{ value: 1 }] });
  const [edition, setEdition] = useState(tokenId);
  const [listEditions, setListEditions] = useState(null);
  const [creator, setCreator] = useState({
    name: "",
    username: "",
    about: "",
    pfpHash: "",
  });

  const VideoWrapper = styled.div`
    width: ${isMobile} ? 100vw : 70vw
  `;

  //bytes32 for "Open"
  const open =
    "0x4f70656e00000000000000000000000000000000000000000000000000000000";
  //bytes32 from "Cancelled"
  // const cancelled = "0x43616e63656c6c65640000000000000000000000000000000000000000000000"

  // console.log(id);
  const getPrnt = async () => {
    try {
      // const accounts = await web3.eth.getAccounts();
      // console.log(accounts[0])
      // setaccount(accounts[0])
      // setaccount(accounts[0])
      //   console.log("account:", account);
      const prnt = await PrntNFTData.methods.getPrntByNFTAddress(id).call();
      const tokenUri = prnt.tokenUri;
      const tokenURI = await (await fetch(tokenUri)).json();
      settokenURI(tokenURI);
      //   console.log("tokenUri", tokenURI);
      const { prntPrice, status } = await PrntNFTData.methods
        .tokensByAddress(id, tokenId)
        .call();
      // console.log(prntPrice);
      setprntPrice(prntPrice);
      console.log("id: ", id, "tokenId: ", tokenId);
      const ownerArray = await PrntNFTData.methods
        .getOwnerOfToken(id, tokenId)
        .call();
      console.log("owner array calc: ", ownerArray);
      const totalOwners = ownerArray.length;
      setOwnerArray(ownerArray);
      settotalOwners(totalOwners);
      const trade = await PrntNFTMarketplace.methods
        .getTrade(id, tokenId)
        .call();
      const PRNT_NFT_MARKETPLACE = await PrntNFTFactory.methods
        .prntNFTMarketplace()
        .call();
      setPRNT_NFT_MARKETPLACE(PRNT_NFT_MARKETPLACE);
      setstatus(trade.status);
      const instance = new web3.eth.Contract(
        PrntNFT.abi,
        id //PrntNFT address
      );
      setInstance(instance);
      //   console.log(prnt);

      setprnt(prnt);

      if (account) {
        const isApproved = await instance.methods
          .isApprovedForAll(account, PRNT_NFT_MARKETPLACE)
          .call();
        setIsApproved(isApproved);
      }
    } catch (err) {
      // alert("You need to install metamask and connect your wallet.");
      if (err) console.log(err);
    }
  };

  useEffect(() => {
    getPrnt();
  }, [account, isApproved]);

  const onBuy = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      await PrntNFTMarketplace.methods.buyPrntNFT(id, tokenId).send({
        from: account,
        value: prntPrice,
        gas: "500000",
      });
      setLoading(false);
      // alert(`Bought ${prnt.prntNFTName} NFT successfully`)
      window.location.reload();
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Not enough funds.");
    }
  };

  useEffect(() => {
    try {
      console.log("owner array in list bids: ", ownerArray);
      if (ownerArray.length > 0) {
        const listBids = ownerArray.map((address) => {
          return (
            <Bids
              key={address}
              address={address}
              title={address === ownerArray[0] ? "Created by" : "Owned by"}
              by={`@${address.slice(0, 6)}....${address.slice(-7)}`}
            />
          );
        });
        listBids.reverse();
        setlistBids(listBids);
      }

      const no_of_editions = tokenURI.attributes[0].value;
      // const edition[no_of_editions];
      const listNoOfEditions = () => {
        let listEditions = [];
        for (let i = 1; i <= no_of_editions; i++) {
          listEditions.push(<option value={i}>{i}</option>);
        }
        setListEditions(listEditions);
      };
      listNoOfEditions();
    } catch (err) {
      if (err) console.log(err);
    }
  }, [prnt, ownerArray]);

  const selectEdition = (e) => {
    setEdition(e.target.value);
    history.push(`/music/${id}/${e.target.value}`);
    window.location.reload();
  };

  const getCreatorData = async () => {
    const url = `https://prnts-nfts.herokuapp.com/api/users/${ownerArray[0]}`;
    const res = await axios.get(url);
    setCreator(res.data);
  };

  useEffect(() => {
    getCreatorData();
  }, [ownerArray]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div style={{ maxWidth: "100vw" }}>
        {/* <h1>Artwork display</h1> */}
        {/* art piece */}
        
        {/* creator and owner */}
        {/* <div className="det">
          <div className="css-4cffwv">
            <Link to={`/profile/${ownerArray[0]}`}>
              <div className="css-1mitdaa">
                <p>
                  @
                  {ownerArray.length > 0
                    ? `${ownerArray[0].slice(0, 6)}....${ownerArray[0].slice(
                        -7
                      )}`
                    : ""}
                </p>
              </div>
            </Link>
          </div>

          <div className="css-ykl0r1">
            <div className="css-yk10r2">
              <Link to={`/profile/${ownerArray[totalOwners - 1]}`}>
                <div className="css-3ts36d">
                  <p>
                    @
                    {ownerArray.length > 0
                      ? `${ownerArray[totalOwners - 1].slice(
                          0,
                          6
                        )}....${ownerArray[totalOwners - 1].slice(-7)}`
                      : ""}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div> */}
        {/* description & history */}
        <div className="desc-his">
          <div className="desc">
            <div className="desc-1">
              {/* <h2>Description</h2> */}
              <div
                style={{
                  // padding: "10px 0px"
                  display: "grid",
                  gridGap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "2vw",
                    // flexDirection: 'row',
                    // flexWrap: 'wrap',
                    flexFlow: "row wrap",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <div>
                    {/* 
                    <h3>{tokenURI.name}</h3>
                    <h4>{tokenURI.symbol}</h4>
                    */}
                    <h3 style={{ textAlign: "center" }}>
                      Welcome to {tokenURI.name}'s Project!
                    </h3>
                  </div>
                  {/*
                    <div className="editions-dropdown">
                    <h3>Edition</h3>
                    <select value={edition} onChange={selectEdition}>
                      {listEditions}
                    </select>
                  </div>
                  */}
                </div>
              </div>
              <span style={{ margin: "10px" }}>{tokenURI.description}</span>
              {/* Profile image */}
              <LinkToProfile to={`/profile/${ownerArray[0]}`}>
                <img
                  src={
                    creator.pfpHash
                      ? `https://prnts.mypinata.cloud/ipfs/${creator.pfpHash}`
                      : null
                  }
                  alt=""
                />
              </LinkToProfile>
                
              <Grid container justifyContent="space-between">
                    <Grid item >
                    <button className="btn" >
                    <h4>share</h4>
                    
                </button>
           
                    </Grid>
                    <Grid item>
                    <button className="btn" onClick={onBuy} disabled={Loading}>
                    {!Loading && <h4>follow</h4>}
                    {Loading && (
                      <ReactLoading type="bubbles" height="30px" width="30px" />
                    )}
                </button>
           
                    </Grid>
                </Grid>
              {/* <p>Animation and music created by Nacho </p>
                        <p>1400x1400</p>
                        <p>30fps</p> */}
            </div>
            
          </div>

          {/* History */}

          {/*
              <div className="his-1">
              <h2>History</h2>
              <div className="bids-1">{listBids}</div>
            </div>
            */}
        </div>
      </div>
    </>
  );
};

export default Art;
