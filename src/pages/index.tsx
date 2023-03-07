import Head from "next/head";
import { Card } from "@/components/Card";
import NftListing from "@/components/NftListing";

export default function Home() {
  return (
    <>
      <Head>
        <title>Altura Assessment</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* NFT LISTING GRID */}
      <div className="bg-gray-100 pb-7 overflow-x-hidden">
        <h1 className="text-5xl font-bold text-center py-7">LIST OF NFTs</h1>
        <NftListing />
      </div>
    </>
  );
}
