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
  const [ticketContractList, setTicketContractList] = useState<string[]>([]);
  const [WhiciTicketContract, setWhiciTicketContract] = useState<string>("");

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
      const response = await questContract.methods
        .attendance(ticketContractList[1])
        .send({
          from: account,
        });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const attendancePointCheck = async () => {
    try {
      const response = await questContract.methods
        .attendancePointCheck(ticketContractList[1])
        .call({
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
      console.log(ticketContractList[1]);
      //티컨만들어진 리스트중에 제일 첫번째꺼로 실험하기위해 유즈스테이트에 이렇게 등록해놧당
    } catch (error) {
      console.error(error);
    }
  };

  const ticketBuying = async () => {
    try {
      const response = await questContract.methods
        .ticketTransfer(ticketContractList[1], 1)
        .send({
          from: account,
          value: web3.utils.toWei(10, "wei"),
          //여기 10에 들어간 자리는 아래 내가 수동으로 프라이스 리스트 넣을때 1번토큰을 10wei로 했기때문이다
        });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // withdrawMoney: Number = web3.utils.toWei(10, "wei");

  const withdraw = async () => {
    try {
      //여기 10에 들어간 자리는 아래 내가 수동으로 프라이스 리스트 넣을때 1번토큰을 10wei로 했기때문이다 그거 트랜스퍼
      //시키면서 퀘컨에 10wei를 넣어놨기때문에 10wei만큼만빼려고 10을 넣었다.
      const response = await questContract.methods
        .withdraw(ticketContractList[1], 1)
        .send({
          from: account,
        });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const processTicketUsed = async () => {
    try {
      const response = await questContract.methods
        .setTicketUsed(ticketContractList[1], 1)
        .send({
          from: account,
        });
      console.log(response);
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
          from: account,
        });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWholeTicketContractList();
  }, []);
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

        <button
          className="border-4 border-black py-2 px-1 bg-purple-300 mx-4"
          onClick={ticketBuying}
        >
          티켓구매하기
        </button>

        <button
          className="border-4 border-black py-2 px-1 bg-orange-300 mx-4"
          onClick={withdraw}
        >
          출금하기
        </button>
        <button
          className="border-4 border-black py-2 px-1 bg-green-500 mx-4"
          onClick={ticketBuying}
        >
          티켓사용처리하기
        </button>
      </div>
    </>
  );
};

export default Home;
