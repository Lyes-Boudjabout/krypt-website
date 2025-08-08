import Image from "next/image";
import { TransactionProps } from "../../types";

export default function TransactionCard(props: TransactionProps) {
    const shortenAddress = (address: string) => {
        return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
    }

    return (
        <div className="w-full md:w-1/4 text-gray-400 backdrop-blur-3xl p-5 border border-gray-600 mb-15 rounded-2xl shadow shadow-gray-600 hover:shadow-blue-600 hover:border-blue-600 hover:cursor-pointer hover:shadow-lg transition-all scroll-snap-start">
            <div className="backdrop-blur-3xl border border-gray-600 p-3 rounded-2xl">
                <p>
                    <span className="font-black text-[#415bb3]"><em>From:</em></span> {shortenAddress(props.addressFrom)}
                </p>
                <p>
                    <span className="font-black text-[#415bb3]"><em>To:</em></span> {shortenAddress(props.addressTo)}
                </p>
                <p>
                    <span className="font-black text-[#415bb3]"><em>Amount:</em></span> {props.amount} ETH
                </p>
                <p>
                    <span className="font-black text-[#415bb3]"><em>Message:</em></span> {props.message ? props.message : "Empty"}
                </p>
            </div>
            <Image
                src={props.url}
                alt="GIF"
                height={300}
                width={250}
                className="md:w-full md:h-63 h-40 pt-8"
            />
            <div className="flex justify-center pt-8 text-wrap">
                <p className="bg-cyan-950 py-3 text-center md:w-1/2 rounded-2xl text-cyan-200">
                    {props.timestamp}
                </p>
            </div>
        </div>
    )
}