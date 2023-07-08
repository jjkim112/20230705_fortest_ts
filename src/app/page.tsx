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
  TICKET_NFT_ADDRESS,
  ticketContract,
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
        .attendance(ticketContractList[0])
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
        .attendancePointCheck(ticketContractList[0])
        .call({
          from: account,
        });
      console.log(Number(response));
    } catch (error) {
      console.error(error);
    }
  };

  const getWholeTicketContractList = async () => {
    try {
      const response = await questContract.methods
        .getWholeTicketContractsList()
        .call();
      setTicketContractList(response);
      console.log(response);
      // console.log(ticketContractList);
      // console.log(ticketContractList[0]);
      //티컨만들어진 리스트중에 제일 첫번째꺼로 실험하기위해 유즈스테이트에 이렇게 등록해놧당
    } catch (error) {
      console.error(error);
    }
  };
  const getMyLastTimeOfAttendance = async () => {
    try {
      const response = await questContract.methods
        .lastCheckedTime(ticketContractList[0])
        .call({
          from: account,
        });

      console.log(response);
      // console.log(ticketContractList);
      // console.log(ticketContractList[0]);
      //티컨만들어진 리스트중에 제일 첫번째꺼로 실험하기위해 유즈스테이트에 이렇게 등록해놧당
    } catch (error) {
      console.error(error);
    }
  };

  const ticketBuying = async () => {
    try {
      const response = await questContract.methods
        .ticketTransfer(ticketContractList[0], 2)
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
      const response = await questContract.methods.withdraw(10).send({
        from: account,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const getWholeTicketList = async () => {
    try {
      //여기 10에 들어간 자리는 아래 내가 수동으로 프라이스 리스트 넣을때 1번토큰을 10wei로 했기때문이다 그거 트랜스퍼
      //시키면서 퀘컨에 10wei를 넣어놨기때문에 10wei만큼만빼려고 10을 넣었다.
      const response = await ticketContract.methods.getAllTokenIds().call();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const processTicketUsed = async () => {
    try {
      const response = await questContract.methods
        .setTicketUsed(ticketContractList[0], 1)
        .send({
          from: account,
        });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  tokenId = [1, 2, 3];
  price = [10, 10, 10];
  minCount = [1, 1, 2];
  ticketNum = 3;
  uri =
    "https://gold-alleged-yak-272.mypinata.cloud/ipfs/QmU1kyYpFKqawrrHX6J94DfJEBMPT3uanVDW71BP7XGdYY";
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
      console.log(typeof response);
    } catch (error) {
      console.error(error);
    }
  };

  // const transactionTracking = async () => {
  //   const targetTokenId = 1;
  //   let tokenNotTransferred = true;

  //   const options = {
  //     filter: {
  //       tokenId:targetTokenId,
  //     },
  //     fromBlock: 0,
  //     toBlock: "latest",
  //   };

  //   try {
  //     const events = await ticketContract.getPastEvents("Transfer", options);

  //     for (const event of events) {
  //       const { from, to, tokenId } = event.returnValues;

  //       if (tokenId == targetTokenId) {
  //         console.log("Transfer 이벤트 발생했네? 감히!!! : ", {
  //           from,
  //           to,
  //           tokenId,
  //         });

  //         tokenNotTransferred = false;
  //         break;
  //       }
  //     }

  //     if (tokenNotTransferred) {
  //       console.log(
  //         `요 사람은 토큰 ID ${targetTokenId}을 잘소유하고 있어 음음 아주좋아 넌 자격돼!.`
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const transactionTracking = async () => {
    const targetTokenId = 2;
    const targetReceiverAddress = "0x3d3DDcc24715AFD91002935a02c6A0fa4fc0F708"; // 구매한사람의 주소넣음되어요
    let transferCount = 0;
    let lastReceiver = null;

    const options = {
      filter: {
        tokenId: targetTokenId,
      },
      fromBlock: 0,
      toBlock: "latest",
    };

    try {
      const events = await ticketContract.getPastEvents("Transfer", options);

      // 이전 전송 이벤트를 차례대로 검토
      for (const event of events) {
        const { from, to, tokenId } = event.returnValues;

        if (tokenId == targetTokenId) {
          transferCount++;
          lastReceiver = to;
          console.log("Transfer 이벤트는 이런것들이 잇엇슴돠: ", {
            from,
            to,
            tokenId,
          });
        }
      }

      if (transferCount >= 3) {
        console.log(
          `토큰 ID ${targetTokenId}의 거래가 3회 이상 발생했네 죽고싶구나 너.`
        );
      } else if (lastReceiver === targetReceiverAddress) {
        console.log(`우리 퀘컨이 준 사람이 너 맞네`);
      } else {
        console.log(
          `너뭐야 우리퀘컨이 준게 아니잖어 뭔짓을한거야 이베드가이즈.`
        );
      }
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
          onClick={processTicketUsed}
        >
          티켓사용처리하기
        </button>
        <button
          className="border-4 border-black py-2 px-1 bg-red-500 mx-4"
          onClick={getMyLastTimeOfAttendance}
        >
          마지막출석시간
        </button>
        <button
          className="border-4 border-black py-2 px-1 bg-blue-600 mx-4"
          onClick={transactionTracking}
        >
          거래추적
        </button>
        <button
          className="border-4 border-black py-2 px-1 bg-yellow-300 mx-4"
          onClick={getWholeTicketList}
        >
          티켓명단내놔
        </button>
      </div>
    </>
  );
};

export default Home;
