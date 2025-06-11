import { IoIosAttach } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";
import { useContext, useEffect, useRef, useState} from "react";
import AppDataProvider from "../contexts/AppDataProvider";
import { AppContext} from "../contexts/AppDataProvider";
import { io } from 'socket.io-client';

const socket = new WebSocket("ws://localhost:8000/llm");



type Props = {
    disableBtn:boolean;
}

export default function({disableBtn}:Props) {

    const {appData,setAppData} = useContext(AppContext);
    const [inputText, setInputText] = useState("");

    useEffect(() => {
      socket.addEventListener("open",event=>{
        console.log("Connection established");
      });

      socket.addEventListener("message", (event) => {
            const newResponse = {
              "message":event.data,
              "response":true,
              "loading":false
            };

            
            setAppData(prev => {
              const updatedMessages = [...prev.messages];
              updatedMessages[updatedMessages.length - 1] = newResponse;

              return {
                ...prev,
                llmStatus: "normal",
                messages: updatedMessages,
              };
            });
          
            console.log(event.data);

       });

    }, []);



    const sendMessage = ()=>{
        if (inputText!==""){
            const newMessage = {
                "message":inputText,
                "response":false,
                "loading":false
            }

            const newResponse = {
                "message":"",
                "response":true,
                "loading":true,
            }
            setAppData(prev => ({
                ...prev,
                llmStatus: "generating",
                messages: [...prev.messages, newMessage,newResponse],
            }));
            
            setInputText("");
            
            socket.send(inputText);

            };
        }


    return(
        <div className="w-full flex flex-row justify-center fixed bottom-0">
            <div className="bg-[#2E2E2E] m-10  w-1/2 rounded-3xl">
                <input onChange={(e) => setInputText(e.target.value)} value={inputText}
                onKeyDown={(e)=>{if(e.key==="Enter" && appData.llmStatus=="normal"){sendMessage()}}}
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