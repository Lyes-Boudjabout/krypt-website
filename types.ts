import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

export interface NavLink {
    name: string,
    link: string
}

export interface TransactionProps {
    addressFrom: `0x${string}`;
    addressTo: `0x${string}`;
    amount: string;
    message: string;
    url: string;
    timestamp: string
}

export interface ServiceProps {
  title: string;
  description: string;
  style: string
  icon: IconType
}

export interface InputProps {
  value: string;
  type: string;
  id: string; 
  placeholder: string;
  setFunction: Dispatch<SetStateAction<string>>
}