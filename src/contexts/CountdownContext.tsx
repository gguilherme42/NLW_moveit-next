import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { ChallengesContext } from '../contexts/ChallengesContext';


interface ICountdownContextData {
    minutes: number;
    seconds: number;
    isActive: boolean;
    hasFinished: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface ICountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as ICountdownContextData);

let countdownTimout: NodeJS.Timeout;

export function CountdownProvider({ children }: ICountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);


    const [time, setTime] = useState(0.05 * 60); /*conversão de 25 min para segundos*/ 
    const [isActive, setIsAcitve] = useState(false);
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsAcitve(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimout);
        /*Deve-se parar o timeout, pois mesmo após setar para false o isActive, ainda é 'executado' o countdown. Cancelando sua execução. */
        setIsAcitve(false);
        setHasFinished(false);
        setTime(0.05 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            console.log('Finalizou!');
            setHasFinished(true);
            setIsAcitve(false);
            startNewChallenge();
        }
    }, [isActive, time])
    
    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            isActive,
            hasFinished,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    );
}
