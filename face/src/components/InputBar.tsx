import { IoIosAttach } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
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
    const messagesRef = useRef(appData.messages);
    
    useEffect(() => {
    messagesRef.current = appData.messages;
    }, [appData.messages]);

    useEffect(() => {
      socket.addEventListener("open",event=>{
        console.log("Connection established");
      });

       

      socket.addEventListener("message", (event) => {
            const parsed_message = JSON.parse(event.data);
        

            if(parsed_message.type === "message_segment"){
              const currentMessages = messagesRef.current;
              let lastResponse = currentMessages[currentMessages.length-1]
              if (lastResponse === undefined){
                console.log("lastResponse undefined");
                console.log(appData.messages);
                lastResponse = {
                  "message":"",
                  loading:false,
                  response:true
                }
              }

              // Add on the streamed text to the response
              let newResponse = {
              "message":lastResponse.message + parsed_message.text,
              "response":true,
              "loading":false
              };


              if(lastResponse.loading){
                newResponse = {
                "message":parsed_message.text,
                "response":true,
                "loading":false
                };
              }
              
              
              // Perform a replace operation
                setAppData(prev => {
                const updatedMessages = [...prev.messages];
                updatedMessages[updatedMessages.length - 1] = newResponse;

                return {
                  ...prev,
                  llmStatus: "generating",
                  messages: updatedMessages,
                };
              });
            }else if(parsed_message.type == "message_end"){
              setAppData(prev => ({
                ...prev,
                llmStatus: "normal",
              }));

            }

            
          

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
        
        const sendEmail = async()=>{
          const res = await fetch("http://localhost:8000/email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // add authorization headers if needed
            },
            body: JSON.stringify({ emailContents: inputText }),
          });

          const newMessage = {
                "message":inputText,
                "response":false,
                "loading":false
          }

          const newResponse = {
                "message":"Email sent to Owais!",
                "response":true,
                "loading":false
          }

          setAppData(prev => ({
                ...prev,
                llmStatus: "normal",
                messages: [...prev.messages, newMessage,newResponse],
            }));

          setInputText("");

        }




    return(
        <div className="w-full flex flex-row justify-center fixed bottom-0">
            <div className="bg-[#2E2E2E] m-10  w-1/2 rounded-3xl">
                <input onChange={(e) => setInputText(e.target.value)} value={inputText}
                onKeyDown={(e)=>{if(e.key==="Enter" && appData.llmStatus=="normal"){sendMessage()}}}
                className="placeholder-gray-300 py-4 px-6 outline-none focus:outline-none text-white w-full" type="text" placeholder="Ask Owais Anything"/>
                <div className="w-full flex flex-row justify-start h-fit relative">
                    <MdOutlineMailOutline onClick={sendEmail} className=" left-0 m-5 text-2xl text-white"/>
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