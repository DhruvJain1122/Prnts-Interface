import web3 from "./web3";
import PrntNFTMarketplace from "./build/PrntNFTMarketplace.json";

const instance = new web3.eth.Contract(
  PrntNFTMarketplace.abi,
  // '0xed72eDC437dA2fe36Aa9a7174F5E8C0cc3878cab' //single
  // '0xde15CB514205Ac587c07f37bcE64CDcBee74F163' //kovan //multiple
  // '0x0D9aAA2166fCff0c4b7BE29F05BF5011c6E0C165' //rinkeby
  // '0xc948e3470b72b92f5C93Bf600B59682a32Db7370'
  // '0xBE290E5D5E1d9d9d145F5ED65a67e1C807179EC2'
  //   "0xA55a8F2016dc3b8959435637095C0F85a6640A5D"

  // Rinkeby
  // "0xF8b4B4F7629f4e101dF8C93f7D17205Fed476f43"
  // "0xf0B46Cd04637276AeC13785164Ae44bd281B5329"
  "0x18b12a450C3da54127CBD6D503A8f3F9Af7D6F47"

  // mumbai
  // "0xBE290E5D5E1d9d9d145F5ED65a67e1C807179EC2"

  // Mainnet v1.0
  // "0x15c0b561d1af54c8DBAf4aa369dFC448f2d3F375"
);

export default instance;
