import { ChangeEvent } from "react";
import { InputProps } from "../../types";

export default function Input(props: InputProps) {
  return (
    <input 
      type={props.type} 
      id={props.id} 
      placeholder={props.placeholder}
      value={props.value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => props.setFunction(event.target.value)}
      className="bg-[#211f2a] w-full rounded-sm p-2 outline-none border border-[#211f2a] focus:border-blue-600 py-2 px-4 placeholder:text-gray-600 shadow shadow-[#211f2a] focus:shadow-lg transition-shadow"
    />
  )
}