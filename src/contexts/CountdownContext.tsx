import { createContext, ReactNode } from "react";


interface ICountdownContextData {
    
}

interface ICountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as ICountdownContextData);


export function CountdownProvider({ children }: ICountdownProviderProps) {
    
    
    return (
        <CountdownContext.Provider value={{}}>
            {children}
        </CountdownContext.Provider>
    );
}
