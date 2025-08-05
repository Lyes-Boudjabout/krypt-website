"use client"

import Header from "@/components/Header";
import { RainbowConnectButton } from "@/components/RainbowConnectButton";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FaEthereum, FaPowerOff, FaInfo } from "react-icons/fa";
import { useAccount, useBalance, useChainId, useDisconnect } from "wagmi";

interface InputProps {
  value: string;
  type: string;
  id: string; 
  placeholder: string;
  setFunction: Dispatch<SetStateAction<string>>
}

const Input = (props: InputProps) => {
  return (
    <input 
      type={props.type} 
      id={props.id} 
      placeholder={props.placeholder}
      value={props.value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => props.setFunction(event.target.value)}
      className="bg-[#211f2a] w-full rounded-sm p-2 outline-none border-none py-2 px-4 placeholder:text-gray-600 shadow shadow-[#211f2a] focus:shadow-lg transition-shadow"
    />
  )
}

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
          <div className="eth-card p-5 mx-20 space-y-10 text-white rounded-2xl">
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
  );
}
