"use client"

import Header from "@/components/Header";
import Input from "@/components/InputComponent";
import { RainbowConnectButton } from "@/components/RainbowConnectButton";
import ServiceCard from "@/components/ServiceCard";
import { FormEvent, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsShieldFillCheck } from "react-icons/bs";
import { FaEthereum, FaPowerOff, FaInfo } from "react-icons/fa";
import { RiHeart2Fill } from "react-icons/ri";
import { useAccount, useBalance, useChainId, useDisconnect } from "wagmi";
import { mockTransactions } from "../../constants";
import { TransactionProps } from "../../types";
import TransactionCard from "@/components/TransactionCard";

export default function Home() {
  const [addressTo, setAddressTo] = useState("");
  const [amount, setAmount] = useState("");
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { data } = useBalance({
    address,
  });

  function getChainName(chainId: number): string {
    let chainName: string = "";
    switch (chainId) {
      case 1:
        chainName = "Ethereum Mainnet"
        break;
      case 137:
        chainName = "Polygon"
        break;
      case 10:
        chainName = "Optimism"
        break;
      case 42161:
        chainName = "Arbitrum One"
        break;
      case 8453: 
        chainName = "Base Mainnet"
        break;
      case 11155111: 
        chainName = "Sepolia Testnet"
        break;
      case 31337: 
        chainName = "Anvil Local Chain"
        break;
      default:
        chainName = "undefined (please connect)"
        break;
    }
    return chainName;
  }

  function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("address: ", addressTo)
    console.log("amount: ", amount)
    console.log("keyword: ", keyword)
    console.log("message: ", message)
  }

  return (
    <>
      <main className="gradient-bg-welcome">
        <Header/>
        <section className="flex w-full px-65 py-20">
          <div className="w-1/2 space-y-8 space-x-25">
            <p className="text-gradient text-6xl pr-7">
              Send Crypto across the world
            </p>
            <p className="text-gradient text-xl font-light pr-30">
              Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
            </p>
            <div className="flex items-center space-x-5">
              <RainbowConnectButton/>
              {isConnected && 
                <button 
                  className="text-white text-xl py-5 px-5 rounded-xl bg-indigo-600 hover:cursor-pointer hover:bg-indigo-700 transition-colors"
                  onClick={() => disconnect()}
                >
                  <FaPowerOff/>
                </button>
              }
            </div>
            <div className="flex flex-wrap w-full text-md mt-25">
              <p className="flex justify-center py-10 w-1/3 border border-gray-600 text-gray-400 rounded-tl-4xl">Reliability</p>
              <p className="flex justify-center py-10 w-1/3 border border-gray-600 text-gray-400">Security</p>
              <p className="flex justify-center py-10 w-1/3 border border-gray-600 text-gray-400 rounded-tr-4xl">Ethereum</p>
              <p className="flex justify-center py-10 w-1/3 border border-gray-600 text-gray-400 rounded-bl-4xl">Web 3.0</p>
              <p className="flex justify-center py-10 w-1/3 border border-gray-600 text-gray-400">Low Fees</p>
              <p className="flex justify-center py-10 w-1/3 border border-gray-600 text-gray-400 rounded-br-4xl">Blockchain</p>
            </div>
          </div>
          <div className="w-1/2 mx-25">
            <div className="eth-card p-5 mx-20 space-y-10 text-white rounded-2xl overflow-hidden">
              <div className="flex justify-between">
                <div className="border border-white rounded-4xl p-2">
                  <FaEthereum size={24}/>
                </div>
                <div className="flex items-center border border-white p-2 rounded-[50%]">
                  <FaInfo size={15}/>
                </div>
              </div>
              <div>
                <p className="font-bold">
                  {getChainName(chainId)}
                </p>
                <p>
                  {`${address}`}
                </p>
                <div>
                  Balance: {data?.formatted} {data?.symbol}
                </div>
              </div>
            </div>
            <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSend(event)} className="bg-[#100f14] w-full rounded-2xl shadow-2xl shadow-black text-gray-600 text-lg space-y-8 px-5 py-10 mt-10">
              <div className="space-y-4">
                <Input 
                  value={addressTo} 
                  type="text" 
                  id="addressTo" 
                  placeholder="Address To" 
                  setFunction={setAddressTo}
                />
                <br />
                <Input 
                  value={amount} 
                  type="text" 
                  id="amountInEth" 
                  placeholder="Amount (ETH)" 
                  setFunction={setAmount}
                />
                <br />
                <Input 
                  value={keyword} 
                  type="text" 
                  id="keywordGif" 
                  placeholder="Keyword (Gif)" 
                  setFunction={setKeyword}
                />
                <br />
                <Input 
                  value={message}
                  type="text"
                  id="transactionMessage"
                  placeholder="Enter Message"
                  setFunction={setMessage}
                /> 
                <br />
              </div>
              <hr />
              <button 
                type="submit" 
                className="border border-gray-600 w-full py-3 rounded-4xl text-white hover:cursor-pointer shadow shadow-gray-600 hover:shadow-md transition-shadow"
              >
                Send now
              </button>
            </form>
          </div>
        </section>
      </main>
      <main className="gradient-bg-services">
        <section className="flex items-center w-full px-65 py-40">
          <div className="w-1/2 space-y-6">
            <p className="text-gradient text-5xl pr-7">
              Services that we continue to improve
            </p>
            <p className="text-gradient text-lg font-light pr-30">
              The best choice for buying and selling your crypto assets, with the various super friendly services we offer
            </p>
          </div>
          <div className="w-1/2 space-y-6 text-white px-10">
              <ServiceCard
                title="Security gurantee"
                description="Security is guranteed. We always maintain privacy and maintain the quality of our products"
                style="bg-[#2952E3]"
                icon={BsShieldFillCheck}
              />
              <ServiceCard
                title="Best exchange rates"
                description="Security is guranteed. We always maintain privacy and maintain the quality of our products"
                style="bg-[#8945F8]"
                icon={BiSearchAlt}
              />
              <ServiceCard
                title="Fastest transactions"
                description="Security is guranteed. We always maintain privacy and maintain the quality of our products"
                style="bg-[#F84550]"
                icon={RiHeart2Fill}
              />
          </div>
        </section>
      </main>
      <main className="gradient-bg-transactions">
        <section className="py-20 px-15">
          <p className="text-gradient text-5xl text-center">Latest Transactions</p>
          <div className="flex flex-wrap justify-around overflow-hidden px-5 py-15 text-lg space-x-5 w-full">
            {mockTransactions.map((element: TransactionProps, index: number) => 
              <TransactionCard {...element} key={index}/>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
