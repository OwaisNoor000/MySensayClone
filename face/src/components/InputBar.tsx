import { IoIosAttach } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";
import { useContext, useEffect, useState} from "react";
import AppDataProvider from "../contexts/AppDataProvider";
import { AppContext} from "../contexts/AppDataProvider";

type Props = {
    disableBtn:boolean;
}

export default function({disableBtn}:Props) {

    const {appData,setAppData} = useContext(AppContext);
    const [inputText, setInputText] = useState("");

    const sendMessage = ()=>{
        console.log("This is working");
        console.log(inputText);
        if (inputText!==""){
            console.log("tis works");
            setAppData(prev => ({
                llmStatus: "generating",
                messages: [...prev.messages, inputText],
            }));
        
            console.log("new status");
            console.log(appData.llmStatus);
            console.log(appData.messages);
        }
    }

    return(
        <div className="w-full flex flex-row justify-center fixed bottom-0">
            <div className="bg-[#2E2E2E] m-10  w-1/2 rounded-3xl">
                <input onChange={(e) => setInputText(e.target.value)}
                className="placeholder-gray-300 py-4 px-6 outline-none focus:outline-none text-white w-full" type="text" placeholder="Ask Owais Anything"/>
                <div className="w-full flex flex-row justify-start h-fit relative">
                    <IoIosAttach className=" left-0 m-5 text-2xl"/>
                        <button
                            onClick={sendMessage}
                            disabled={appData.llmStatus === "generating"}
                            className={`right-5 top-1/2 absolute bg-[#F5145F] p-2 rounded-full -translate-y-1/2 ${appData.llmStatus === "generating" ? "opacity-50" : ""}`}
                            >
                            <FaArrowUp className="text-white" />
                            </button>
                </div>
            </div>
        </div>
    )
}