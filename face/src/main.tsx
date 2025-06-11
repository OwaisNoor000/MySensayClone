import './style.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as React from 'react';
import Main from "./pages/Main";
import ReactDOM from 'react-dom/client';
import AppDataProvider, { AppContext } from './contexts/AppDataProvider';
import InputBar from './components/InputBar';
import Header from './components/Header';
import Message from './components/Message';
import Response from './components/Response';
import MessageBoard from './components/MessageBoard';
import { useEffect, useState } from 'react';


function App() {

  return(
        <div >
            <Header/>
            <MessageBoard/>
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
