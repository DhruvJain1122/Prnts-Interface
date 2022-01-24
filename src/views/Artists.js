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
    try {
      const artists = await PrntNFTData.methods.getAllArtists().call();
      console.log("artists: ", artists);
      const promises = artists.map((address) => {
        const url = `https://prnts-nfts.herokuapp.com/api/users/${address}`;
        const userData = async () => {
          try {
            const { data } = await axios.get(url);
            return data;
          } catch (err) {
            // if (err) console.error(err);
          }
        };
        return userData().then((data) => {
          return (
            <div key={address}>
              <Link to={`/artists/${address}`}>
                <Card
                  ethAddress={address}
                  name={data ? data.name : ""}
                  imageUrl={
                    data
                      ? data.pfpHash
                        ? `https://ipfs.io/ipfs/${data.pfpHash}`
                        : profile
                      : profile
                  }
                />
              </Link>
            </div>
          );
        });

        // const url = `https://prnts-nfts.herokuapp.com/api/users/${address}`;
        // return axios.get(url).then((res) => {
        //   if (res.status == 404) return null;
        //   console.log("res: ", res);
        //   let data;
        //   if (res.data) data = res.data;
        //   return (
        //     <div key={address}>
        //       <Link to={`/artists/${address}`}>
        //         <Card
        //           ethAddress={address}
        //           name={data ? data.name : ""}
        //           imageUrl={
        //             data
        //               ? data.pfpHash
        //                 ? `https://ipfs.io/ipfs/${data.pfpHash}`
        //                 : profile
        //               : profile
        //           }
        //         />
        //       </Link>
        //     </div>
        //   );
        // });
      });

      Promise.all(promises).then((listArtists) => {
        //   listArtists.reverse();
        setlistArtists(listArtists);
      });
    } catch (err) {
      if (err) console.error(err);
    }
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
