import { createContext, useState,useRef, type Dispatch, type ReactNode } from "react";

export type Message = {
  message:string,
  response:boolean,
  loading:boolean
}

export type AppData = {
  llmStatus:string,
  messages:Message[],
}

export interface AppContextInterface {
  appData:AppData,
  setAppData:Dispatch<React.SetStateAction<AppData>>;
}

// Default state
const defaultState = {
  appData:{
    llmStatus:"normal",
    messages:[],
  },
  setAppData:(appData:AppData) => {}
} as AppContextInterface

export const AppContext = createContext(defaultState);

type AppDataProviderProps = {
    children:ReactNode
}

export default function AppDataProvider({children}:AppDataProviderProps){
    const [appData,setAppData] = useState<AppData>(
        {llmStatus:"normal",messages:[]}
    );
    
    return(
        <AppContext.Provider value={{appData,setAppData}}>
            {children}
        </AppContext.Provider>
    );
}

