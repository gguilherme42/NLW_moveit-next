import { createContext, ReactNode, useEffect, useState } from 'react';

import challenges from '../../Challenges.json';

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
};

export const ChallengesContext = createContext({} as IChallengesContextData);



export function ChallengesProvider({ children }: IChallengesProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission()
    }, []);

    function levelUp () {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

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
        </ChallengesContext.Provider>
    );
}

