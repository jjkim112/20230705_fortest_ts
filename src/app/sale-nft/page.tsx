// "use client";

// import NftCard from "@/components/NftCard";
// import SaleNftCard from "@/components/SaleNFtCard";
// import { saleNftContract } from "@/lib/web3.config";
// import { NextPage } from "next";
// import { useEffect, useState } from "react";

// const SaleNft: NextPage = () => {
//   const [saleNfts, setSaleNfts] = useState<number[]>();

//   const getSaleNfts = async () => {
//     try {
//       const response: bigint[] = await saleNftContract.methods
//         .getOnSaleNft()
//         .call();

//       const tempArray = response.map((v) => Number(v));

//       setSaleNfts(tempArray);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getSaleNfts();
//   }, []);

//   return (
//     <div>
//       {saleNfts?.map((v, i) => (
//         <SaleNftCard key={i} tokenId={v} />
//       ))}
//     </div>
//   );
// };

// export default SaleNft;
