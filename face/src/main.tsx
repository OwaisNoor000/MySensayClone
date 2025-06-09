import './style.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as React from 'react';
import Main from "./pages/Main";
import ReactDOM from 'react-dom/client';
import AppDataProvider from './contexts/AppDataProvider';
import InputBar from './components/InputBar';
import Header from './components/Header';
import Message from './components/Message';
import Response from './components/Response';


function App() {
  
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
  )
}


ReactDOM.createRoot(document.getElementById('app')!).render(
      <React.StrictMode>
        <AppDataProvider>
          <App />
        </AppDataProvider>
      </React.StrictMode>
);
