"use client";

import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./layout";
import {
  GOERLI_CHAIN_ID,
  QUEST_NFT_ADDRESS,
  ethereum,
  questContract,
  web3,
} from "@/lib/web3.config";

interface QuestContractProps {
  tokenId: number[];
  price: number[];
  minCount: number[];
  ticketNum: number;
  uri: string;
  name: string;
  symbol: string;
}

const Home: NextPage<QuestContractProps> = ({
  tokenId,
  price,
  minCount,
  ticketNum,
  uri,
  name,
  symbol,
}) => {
  // const { account } = useContext(AppContext);

  const { account, setAccount } = useContext(AppContext);
  const [ ticketContractList, setTicketContractList ] = useState<string[]>([]);
 
  // const { account, setAccount } = useContext(AppContext);

  const onClickLogIn = async () => {
    try {
      const accounts = await ethereum?.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);

      if (parseInt(ethereum?.networkVersion) !== GOERLI_CHAIN_ID) {
        await ethereum?.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: web3.utils.toHex(GOERLI_CHAIN_ID) }],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const attendance = async () => {
    try {
      const response = await questContract.methods.attendance(ticketContractList[0]).send({
        from: account,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const attendancePointCheck = async () => {
    try {
      const response = await questContract.methods.attendancePointCheck(ticketContractList[0]).call({
        from: account,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getWholeTicketContractList = async () => {
    try {
      const response = await questContract.methods
        .getWholeTicketContractsList()
        .call();
      console.log(response);
      setTicketContractList(response);
      console.log(ticketContractList);
      console.log(ticketContractList[0]);
    } catch (error) {
      console.error(error);
    }
  };

  tokenId = [1, 2];
  price = [10, 20];
  minCount = [1, 2];
  ticketNum = 2;
  uri = "";
  name = "ohno";
  symbol = "ON";

  const makeTicketContractWithMint = async () => {
    try {
      const response = await questContract.methods
        .makeTicketContract(
          tokenId,
          price,
          minCount,
          ticketNum,
          uri,
          name,
          symbol
        )
        .send({
          from: account
        });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

useEffect(()=>{
  getWholeTicketContractList();
},[])
  return (
    <>
      <div className="bg-green-100 py-4 pr-8 flex justify-end">
        {account ? (
          <div>
            {account.substring(0, 4)}...{account.substring(account.length - 4)}
          </div>
        ) : (
          <button onClick={onClickLogIn}>지갑로그인</button>
        )}
      </div>

      <div className="bg-red-100 min-h-screen flex justify-center items-center">
        <button
          className="border-4 border-black py-2 px-1 bg-blue-300 mx-4"
          onClick={makeTicketContractWithMint}
        >
          티컨만들기
         </button>
         <button
          className="border-4 border-black py-2 px-1 bg-green-300 mx-4"
          onClick={getWholeTicketContractList}
        >
          티켓컨트랙트리스트
        </button>
        <button
          className="border-4 border-black py-2 px-1 bg-red-300 mx-4"
          onClick={attendance}
        >
          출석하기
        </button>
        <button
          className="border-4 border-black py-2 px-1 bg-yellow-300 mx-4"
          onClick={attendancePointCheck}
        >
          출석체크하기
        </button>
        </div>
        {/* 
        
        
        <button
          className="border-4 border-black py-2 px-1 bg-purple-300 mx-4"
          onClick={}
        >
          티켓구매하기
        </button>
      </div> */} */}
    </>
  );
};

export default Home;
