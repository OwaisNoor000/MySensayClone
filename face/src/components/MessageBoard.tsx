import { useContext, useState } from "react";
import Message from "./Message";
import Response from "./Response";
import { AppContext } from "../contexts/AppDataProvider";

export default function MessageBoard(){
        const {appData,setAppData} = useContext(AppContext);
        const [inputText, setInputText] = useState("");

    return(
        <div style={{height:"70vh",overflow:"scroll",marginTop:"100px",scrollbarWidth:"none"}} 
            className="flex flex-col items-center">
                <Message text="Just testing to see if this works"/>
                <Response text="Responding to the above text" waiting={true} />
                <Message text="Just testing to see if this works"/>
                <Response text="Responding to the above text" />
                {appData.messages.map((msg, index) =>
                msg.response ? (
                <Response key={index} text={msg.message} waiting={msg.loading} />
                ) : (
                <Message key={index} text={msg.message} />
                )
            )}
        </div>

    )
}