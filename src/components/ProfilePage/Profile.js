import React, { useState } from "react";
import profile from "../../assets/images/default-profile.jpg";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Profile = ({ name, username, ethAddress, Id, pfpHash }) => {
  const [copied, setCopied] = useState(false);

  const address = ethAddress.slice(0, 6) + "....." + ethAddress.slice(-7);

  const onCopyAddress = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div>
      <div className="profile-desc">
        <div className="pic-1">
          <img
            src={pfpHash ? `https://ipfs.io/ipfs/${pfpHash}` : profile}
            alt="Profile Pic"
          />
        </div>
        <div className="details-1">
          {name && (
            <div>
              <h1>{name}</h1>
            </div>
          )}
          {username && (
            <div>
              <h3>@{username}</h3>
            </div>
          )}
          <div className="eth-address">
            <div className="artist-id">#{Id}</div>
            <div className="address">{address}</div>
            <CopyToClipboard text={ethAddress} onCopy={() => onCopyAddress()}>
              <div className="copy-symbol">
                {copied ? <span>Copied!</span> : <span>Copy</span>}
              </div>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.defaultProps = {
  // name: "Jack Butcher",
  // username: "anonymus",
  // ethAddress: "0x09a9601349928e391fB12BAb0270999d189072EE",
  Id: " ID",
};

export default Profile;
