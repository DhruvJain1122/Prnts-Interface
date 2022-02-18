import web3 from "./web3";
import MockProfileCreationProxy from "./build/MockProfileCreationProxy.json";

const instance = new web3.eth.Contract(
  MockProfileCreationProxy.abi,
  "0x08C4fdC3BfF03ce4E284FBFE61ba820c23722540"
);

export default instance;
