import React, { useState, useEffect } from "react";
import "../components/Artists/Artists.css";
import Card from "../components/Artists/Card";
import { Link } from "react-router-dom";
import PrntNFTData from "../ethereum/PrntNFTData";
import profile from "../assets/images/profile.png";

import axios from "axios";

const Artists = () => {
  const [listArtists, setlistArtists] = useState([]);

  const getAllArtists = async () => {
    const artists = await PrntNFTData.methods.getAllArtists().call();
    const promises = artists.map((address) => {
      const url = `https://prnts-nfts.herokuapp.com/api/users/${address}`;
      return axios.get(url).then(({ data }) => {
        return (
          <div key={address}>
            <Link to={`/artists/${address}`}>
              <Card
                ethAddress={address}
                name={data ? data.name : ""}
                imageUrl={
                  data.pfpHash
                    ? `https://ipfs.io/ipfs/${data.pfpHash}`
                    : profile
                }
              />
            </Link>
          </div>
        );
      });
    });

    Promise.all(promises).then((listArtists) => {
      //   listArtists.reverse();
      setlistArtists(listArtists);
    });
  };

  useEffect(() => {
    getAllArtists();
    return () => {
      // cleanup
    };
  }, []);

  return (
    <div className="grid-container">
      {/* <h2>Artists</h2> */}
      {listArtists}
    </div>
  );
};

export default Artists;
