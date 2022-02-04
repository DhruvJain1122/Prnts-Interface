import React, { useRef, useState, useEffect } from "react";
import { Container, Preview, Text, UploadButton } from "./ProfilePic.elements";
import ReactLoading from "react-loading";
const axios = require("axios");

const ProfilePic = ({ imageHash, setImageHash, user, setUser }) => {
  const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
  const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState();
  const [imageUpload, setImageUpload] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!selectedImage) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(selectedImage);
  }, [selectedImage]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pinImageToIPFS = async (e) => {
    e.preventDefault();
    setImageUpload(true);
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const data = new FormData();
    data.append("file", selectedImage);
    // alert("pinning to pinata")
    try {
      // const accounts = await web3.eth.getAccounts();
      // setaccounts(accounts);
      const res = await axios.post(url, data, {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });
      setImageHash(res.data.IpfsHash);
      setUser({
        ...user,
        pfpHash: res.data.IpfsHash,
      });
      //   alert(res.data.IpfsHash);
      setImageUpload(false);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
      setImageUpload(false);
    }
  };

  return (
    <Container>
      <input
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
      <Preview onClick={pickImageHandler}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={selectedImage ? selectedImage.name : "Preview"}
          />
        ) : user.pfpHash ? (
          <img
            src={`https://prnts.mypinata.cloud/ipfs/${user.pfpHash}`}
            alt={selectedImage ? selectedImage.name : "Preview"}
          />
        ) : (
          <Text>Pick a Profile pic</Text>
        )}
      </Preview>
      {previewUrl ? (
        imageHash ? (
          <UploadButton className="btn">Uploaded!</UploadButton>
        ) : (
          <UploadButton className="btn" onClick={pinImageToIPFS}>
            {!imageUpload ? (
              <span>Upload Image</span>
            ) : (
              <ReactLoading type={"bubbles"} height={30} width={30} />
            )}
          </UploadButton>
        )
      ) : null}
    </Container>
  );
};

export default ProfilePic;
