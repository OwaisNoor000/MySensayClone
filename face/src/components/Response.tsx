import { useContext } from "react";
import ProfilePicture from "../assets/pp.jpg";
import { AppContext } from "../contexts/AppDataProvider";

type Props = {
    text:string;
    waiting?:boolean
}

 function Loading(){
    return(
        <div className="flex space-x-2 ml-2 mt-1">
            <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]" />
            <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]" />
            <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
    );
}

export default function Response({text,waiting}:Props){


    return (
        <div className="w-1/2">
            <div className="w-full text-white flex flex-row items-start my-5">
                    <img src={ProfilePicture} className="rounded-full mr-5" style={{height:"30px", width:"30px"}}/>
                    
                    {waiting && text}

                    {waiting && <Loading/>}
            </div> 
        </div>
    )
}