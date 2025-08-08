import { ServiceProps } from "../../types";

export default function ServiceCard({ title, description, style, icon: Icon }: ServiceProps) {
    return (
        <div className="flex space-x-5 backdrop-blur-xl text-gray-100 shadow shadow-gray-600 border border-gray-600 p-5 rounded-2xl h-full hover:cursor-pointer hover:border-blue-600 hover:shadow-blue-600 hover:shadow-lg transition-all">
            <div className={`${style} rounded-full p-3 h-1/2`}>
                <Icon size={30}/>
            </div>
            <div>
                <p className="text-xl md:text-lg mb-1 font-black">{title}</p>
                <p className="text-md font-lighter">{description}</p>
            </div>
        </div>
        
    )
}