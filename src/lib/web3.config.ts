import { MetaMaskSDK } from "@metamask/sdk";
import Web3 from "web3";
import QUEST_NFT_ABI from "@/lib/questContractAbi.json";
import TICKET_NFT_ABI from "@/lib/ticketContractAbi.json";

const MMSDK = new MetaMaskSDK();
export const ethereum = MMSDK.getProvider();

export const web3 = new Web3(ethereum);

export const TICKET_NFT_ADDRESS = "0x85137e2A4cB3ec5a3EEc771C77af71E28A2f67e4";
export const QUEST_NFT_ADDRESS = "0x8f574b5cE7CC129D5Da4842BE5A1a4008B4E3c8b";

export const questContract = new web3.eth.Contract(
  QUEST_NFT_ABI,
  QUEST_NFT_ADDRESS
);
export const ticketContract = new web3.eth.Contract(
  TICKET_NFT_ABI,
  TICKET_NFT_ADDRESS
);

export const GOERLI_CHAIN_ID = 5;
// export const MUMBAI_CHAIN_ID = 80001;

// export const PINATA_URL =
//   "https://olbm.mypinata.cloud/ipfs/QmU52T5t4bXtoUqQYStgx39DdXy3gLQq7KDuF1F9g3E9Qy";

// export interface INft {
//   name: string;
//   description: string;
//   image: string;
//   attributes: {
//     trait_type: string;
//     value: string;
//   }[];
// }
