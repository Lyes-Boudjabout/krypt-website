import { NavLink, TransactionProps } from "./types";

export const contractAddress: string =
  "0xfD5FF465DeD864a8c8eFabdCCEC327b5E1274Ed7";

export const contractAbi = [
  {
    inputs: [],
    name: "KryptTransfer__ReceiverAddressCantBeZero",
    type: "error",
  },
  {
    inputs: [],
    name: "KryptTransfer__TransferAmountCantBeZero",
    type: "error",
  },
  { inputs: [], name: "KryptTransfer__TransferFailed", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EthTransfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address payable", name: "_to", type: "address" },
      { internalType: "string", name: "message", type: "string" },
    ],
    name: "transferEth",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export const navLinks: NavLink[] = [
  {
    name: "Market",
    link: "/market",
  },
  {
    name: "Exchange",
    link: "/exchange",
  },
  {
    name: "Tutorials",
    link: "/tutorials",
  },
  {
    name: "Wallets",
    link: "/wallets",
  },
];

export const mockTransactions: TransactionProps[] = [
  {
    url: "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284",
    message: "",
    timestamp: "12/21/2021, 4:33:21 PM",
    addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
    amount: "0.01",
    addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
  {
    url: "https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif",
    message: "",
    timestamp: "12/21/2021, 4:33:21 PM",
    addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
    amount: "0.01",
    addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
  {
    url: "https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif",
    message: "",
    timestamp: "12/21/2021, 4:33:21 PM",
    addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
    amount: "0.01",
    addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
  {
    url: "https://i.pinimg.com/originals/68/a0/9e/68a09e774e98242871c2db0f99307420.gif",
    message: "",
    timestamp: "12/21/2021, 4:33:21 PM",
    addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
    amount: "0.01",
    addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
  {
    url: "https://i.pinimg.com/originals/73/d3/a1/73d3a14d212314ab1f7268b71d639c15.gif",
    message: "",
    timestamp: "12/21/2021, 4:33:21 PM",
    addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
    amount: "0.01",
    addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
  {
    url: "https://www.omnisend.com/blog/wp-content/uploads/2016/09/funny-gifs-9.gif",
    message: "",
    timestamp: "12/21/2021, 4:33:21 PM",
    addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
    amount: "0.01",
    addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
];
