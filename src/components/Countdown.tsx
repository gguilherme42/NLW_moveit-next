import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimout: NodeJS.Timeout;

export function Countdown() {
    const [time, setTime] = useState(25 * 60); /*conversão de 25 min para segundos*/ 
    const [isActive, setIsAcitve] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


    function startCountdown() {
        setIsAcitve(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimout);
        /*Deve-se parar o timeout, pois mesmo após setar para false o isActive, ainda é 'executado' o countdown. Cancelando sua execução. */
        setIsAcitve(false);
        setTime(25 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }
    }, [isActive, time])


    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            {isActive?
                (<button type="button" 
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}>
                    Abandonar ciclo                        
                </button>)
                :
                (<button type="button" className={styles.countdownButton}
                onClick={startCountdown}>
                    Iniciar um ciclo
                </button>)
            }
            
        </div>
    );
}