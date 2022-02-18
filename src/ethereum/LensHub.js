import web3 from "./web3";
import LensHub from "./build/LensHub.json";

const instance = new web3.eth.Contract(
  LensHub.abi,
  "0xF6BF84E5df229029C9D36dC7ABaCDBE9c0bd7b4F"
);

export default instance;
