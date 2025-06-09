import { createContext, useState, type Dispatch, type ReactNode } from "react";

export type AppData = {
  llmStatus:string,
  messages:string[]
}

export interface AppContextInterface {
  appData:AppData,
  setAppData:Dispatch<React.SetStateAction<AppData>>;
}

// Default state
const defaultState = {
  appData:{
    llmStatus:"normal",
    messages:[]
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

