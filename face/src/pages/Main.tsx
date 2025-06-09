import Header from "../components/Header";
import InputBar from "../components/InputBar"
import Message from "../components/Message"
import Response from "../components/Response"

export default function Main(){
    return(
        <div >
            <Header/>
            <div style={{height:"70vh",overflow:"scroll",marginTop:"100px",scrollbarWidth:"none"}} 
            className="flex flex-col items-center">
                <Message text="Just testing to see if this works"/>
                <Response text="Responding to the above text" />
                <Message text="Just testing to see if this works"/>
                <Response text="Responding to the above text" />
            </div>
            <InputBar disableBtn={true}/>
        </div>
    );
}