import { MetaMaskSDK } from "@metamask/sdk";
import Web3 from "web3";
import QUEST_NFT_ABI from "@/lib/questContractAbi.json";
import TICKET_NFT_ABI from "@/lib/ticketContractAbi.json";

const MMSDK = new MetaMaskSDK();
export const ethereum = MMSDK.getProvider();

export const web3 = new Web3(ethereum);

const TICKET_NFT_ADDRESS = "";
export const QUEST_NFT_ADDRESS = "0x4a0fb56E04A670EB6842a344a7998543f49a3d94";

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
