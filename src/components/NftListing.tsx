import React from "react";
import { Card } from "./Card";
import { httpsClient } from "../lib/httpClient";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Dialog from "./Modal";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import PaginatedLayout from "./PaginationLayout";

const NftListing = () => {
    // use router hook for navigation
    const router = useRouter();
    // useState for state managemnet
  const [nftId, setNftId] = React.useState();
  const [page, setPage] = React.useState(1);
  // function for fetching All NFTs
  const getNftList = async () => {
    const res = await httpsClient.get(`nfts/list?per_page=15&page=${page}`);
    return res.data;
  };
  const { data, isLoading } = useQuery(["NFT"], getNftList);
  // GET SINGLE NFT DETAIL
  const getNftDetailQuery = async () => {
    const response = await httpsClient.get(`nfts/${nftId}`);
    return response.data;
  };
  const nftDetailsQueryResult = useQuery(
    ["NFT_DETAILS", { nftId, page }],
    getNftDetailQuery
  );
  // imageURL for NFT detail
  const imagePath = nftDetailsQueryResult.data?.image?.small;

  if (isLoading)
    return (
      <div className="text-6xl h-screen text-center flex justify-center align-center mt-16">
        <Oval
          height={180}
          width={180}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  return (
    <>
    <div className=" max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-3 mb-3">
      {/* MAPPING THROUGH DATA FETCHED FOR NFT LIST*/}
      {data?.map((nft: any, index: number) => (
        // card component displaying NFT basic details
        <NFTCard
          key={index}
          name={nft.name}
          contactAddress={nft.contract_address}
          symbol={nft.symbol}
          platformId={nft.asset_platform_id}
          onClick={() => {
            setNftId(nft.id);
            router.push("/?nft_detail=true");
          }}
        />
      ))}
      {/* MODAL COMPONENT DISPLAYING NFT DETAILS */}
      {router.query.nft_detail && (
        <Dialog variant="scroll" open={false} onClose={() => router.back()}>
          <div className="px-5 py-6">
            {/* IF NFT DETAILS IS STILL LOADING DUE TO SLOW NETWORK OR OTHER FACTORS THE BELOW ELEMENT IS DISPLAYED */}
            {nftDetailsQueryResult?.isLoading && (
              <div className="text-6xl text-center flex justify-center align-center mt-16">
                <Oval
                  height={80}
                  width={80}
                  color="#4fa94d"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            )}
            {/* WHEN NFT DETAILS  IS SUCCESSFULLY FETCHED FROM THE SERVER */}
            {nftDetailsQueryResult?.data && (
              <>
                <div className="mb-5 flex items-center justify-between ">
                  <h2 className="text-2xl font-bold">Details</h2>
                  <button
                    onClick={() => router.back()}
                    className="text-lg font-semibold text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="pb-3 grid grid-cols-1 md:grid-cols-2 items-center gap-6">
                  <div>
                    <Image
                      loader={() => imagePath}
                      src={imagePath}
                      width={300}
                      height={300}
                      alt="nft"
                    />
                  </div>
                  <div className="border-l border-gray-300 px-3">
                    <h1 className="text-2xl font-bold mb-3">
                      {nftDetailsQueryResult.data?.name}
                    </h1>
                    <p className="text-xs mt-1 font-medium text-gray-600">
                      {nftDetailsQueryResult.data?.description}
                    </p>

                    <p className="text-sm mt-1 font-medium text-gray-600">
                      {" "}
                      <span className="text-gray-800 font-bold">
                        Total Supply :{" "}
                      </span>
                      {nftDetailsQueryResult.data?.total_supply}
                    </p>

                    <p className="text-sm mt-1 font-medium text-gray-500">
                      <span className="text-gray-800 font-bold">
                        No of Unique Address :{" "}
                      </span>{" "}
                      {nftDetailsQueryResult.data?.number_of_unique_addresses}
                    </p>
                    <p className="text-sm mt-1 font-medium text-green-500">
                      <span className="text-gray-800 font-bold">
                        Native Currency :{" "}
                      </span>{" "}
                      {nftDetailsQueryResult.data?.native_currency}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 mt-4 font-semibold">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">
                      Market Cap
                    </h3>
                    <p>USD : {nftDetailsQueryResult.data?.market_cap?.usd}</p>
                    <p>
                      Native currency :{" "}
                      {nftDetailsQueryResult.data?.market_cap?.native_currency}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">
                      Floor Price
                    </h3>
                    <p>USD : {nftDetailsQueryResult.data?.floor_price?.usd}</p>
                    <p>
                      Native currency :{" "}
                      {nftDetailsQueryResult.data?.floor_price?.native_currency}
                    </p>
                  </div>
                  <div>
                    <p className="md:text-base text-sm mt-4 font-medium text-gray-600">
                      <span className="block text-gray-800 font-bold">
                        Contract Address :{" "}
                      </span>
                      {nftDetailsQueryResult.data?.contract_address}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </Dialog>
      )}
    </div>
   
    </>
  );
};

export default NftListing;

// NFT CARD COMPONENT
interface CardProps {
  name: string;
  contactAddress: string;
  symbol: any;
  platformId?: string;
  onClick: () => void;
}

const NFTCard = (props: CardProps) => {
  // card properties
  const { name, contactAddress, symbol, platformId, onClick } = props;
  return (
    <Card
      className="flex-col shadow-md py-4 px-3 hover:cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-[120px] text-center">{symbol}</h2>
      <h1 className="font-bold text-xl text-gray-700">{name}</h1>
      <div className="py-2">
        <h6 className="text-sm font-semibold">Contract Address :</h6>
        <p className="font-medium text-xs text-gray-500">{contactAddress}</p>
      </div>
      <div>
        <h6 className="text-sm font-semibold">Native Currency </h6>
        <p className="font-medium text-sm text-green-500">{platformId}</p>
      </div>
    </Card>
  );
};
