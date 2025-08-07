"use client"

import Header from "@/components/Header";
import Input from "@/components/InputComponent";
import { RainbowConnectButton } from "@/components/RainbowConnectButton";
import ServiceCard from "@/components/ServiceCard";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsShieldFillCheck } from "react-icons/bs";
import { FaEthereum, FaPowerOff, FaInfo } from "react-icons/fa";
import { RiErrorWarningFill, RiHeart2Fill } from "react-icons/ri";
import { useAccount, useBalance, useChainId, useDisconnect, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { contractAbi, contractAddress, mockTransactions } from "../../constants";
import { TransactionProps } from "../../types";
import TransactionCard from "@/components/TransactionCard";
import { CgSpinner } from "react-icons/cg";
import { createPublicClient, parseEther } from "viem";
import { sepolia } from "wagmi/chains";

export default function Home() {
  const [addressTo, setAddressTo] = useState("");
  const [amount, setAmount] = useState("");
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  let [logs, setLogs] = useState([]);
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
        break;false
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

  const {
    data: transferHash,
    isPending: isTransferPending,
    isError: isTransferError,
    error: transferError,
    writeContractAsync: writeTransferAsync,
  } = useWriteContract();

  const {
    isLoading: isTransferConfirming,
    isSuccess: isTransferConfirmed,
    isError: isTransferErrorFinal,
    data: dataFromTransferReceipt,
  } = useWaitForTransactionReceipt({
    confirmations: 1,
    hash: transferHash,
  })

  async function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const txHash = await writeTransferAsync({
        abi: contractAbi,
        address: contractAddress as `0x${string}`,
        functionName: "transferEth",
        args: [addressTo, message],
        value: parseEther(amount)
      })
      console.log("Transfer transaction submitted:", txHash)
    } catch (error) {
      console.error("Error in the Transfer:", error)
    }
  }

  function getButtonContent() {
    if (isTransferPending) {
      return (
          <div className="flex text-white justify-center items-center space-x-2">
              <CgSpinner className="animate-spin" size={20}/>
              <span>Confirming in Wallet...</span>
          </div> as ReactNode
      )
    }
    if(isTransferError || isTransferErrorFinal) {
      return (
          <div className="flex text-red-600 justify-center items-center space-x-2">
              <RiErrorWarningFill size={20}/>
              <span>Transfering Error, check console</span>
          </div> as ReactNode
      )
    }
    if (isTransferConfirming) {
      return (
          <div className="flex text-white justify-center items-center space-x-2">
              <CgSpinner className="animate-spin" size={20} />
              <span>Confirming the Transfer...</span>
          </div>
      )
    }
    return (
        <div className="flex text-white justify-center items-center space-x-2">
            <FaEthereum size={20}/>
            <span>Send Now</span>
        </div>
    ) as ReactNode
  }

  useEffect(() => {
    if (isSuccess) {
        const timer = setTimeout(() => {
            setIsSuccess(false);
        }, 3000);

        return () => clearTimeout(timer);
    }
  }, [isSuccess]); 
  
  useEffect(() => {
    if(isTransferConfirmed) {
      setIsSuccess(true)
    }
  }, [isTransferConfirmed]);

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
              {!isConnected && 
                <div className={`flex items-center space-x-2 ${isTransferError || isTransferErrorFinal ? "text-red-600" : "text-yellow-600"}`}>
                  <svg 
                        stroke="currentColor" 
                        fill="currentColor" 
                        strokeWidth="0" 
                        viewBox="0 0 24 24" 
                        height="20" 
                        width="20" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.8659 3.00017L22.3922 19.5002C22.6684 19.9785 22.5045 20.5901 22.0262 20.8662C21.8742 20.954 21.7017 21.0002 21.5262 21.0002H2.47363C1.92135 21.0002 1.47363 20.5525 1.47363 20.0002C1.47363 19.8246 1.51984 19.6522 1.60761 19.5002L11.1339 3.00017C11.41 2.52187 12.0216 2.358 12.4999 2.63414C12.6519 2.72191 12.7782 2.84815 12.8659 3.00017ZM10.9999 16.0002V18.0002H12.9999V16.0002H10.9999ZM10.9999 9.00017V14.0002H12.9999V9.00017H10.9999Z"></path>
                  </svg>
                  <p>Warning: Please connect your wallet</p>
                </div>
              }
              {isSuccess &&
                <div className="flex justify-center space-x-3 bg-green-500 text-white mt-7 p-4 rounded-3xl mr-40">
                  <p>✅</p>
                  <span>Eth amount transfered successfully !</span>
                </div>
              }
              <button 
                type="submit" 
                className="border border-gray-600 w-full py-3 rounded-4xl text-white hover:cursor-pointer shadow shadow-gray-600 hover:shadow-md transition-shadow"
              >
                {getButtonContent()}
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
