import { createContext, ReactNode, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import challenges from '../../Challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface IChallenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
};


interface IChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number; 
    activeChallenge: IChallenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    completedChallenge: () => void;
    resetChallenge: () => void;
};

interface IChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
};

export const ChallengesContext = createContext({} as IChallengesContextData);



export function ChallengesProvider({ children, 
    ...rest }: IChallengesProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1); // Se o level não existir, então, 1.
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0); 
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission()
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    
    }, [level, currentExperience, challengesCompleted]);

    function levelUp () {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 👌', {
                body: `Valendo ${challenge.amount}xp!`
            });
        }

    }


    function completedChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;
        if (finalExperience >= experienceToNextLevel) {
            levelUp();
            finalExperience = finalExperience - experienceToNextLevel;
        } 
        
        setCurrentExperience(finalExperience)
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1)
        
        
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    return (
        <ChallengesContext.Provider 
        value={{level, 
                currentExperience, 
                experienceToNextLevel,
                challengesCompleted, 
                activeChallenge,
                levelUp,
                startNewChallenge,
                completedChallenge,
                resetChallenge}}>
            
            {children}

            <LevelUpModal />

        </ChallengesContext.Provider>
    );
}

