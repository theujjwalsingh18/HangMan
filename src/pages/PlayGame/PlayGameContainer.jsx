import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import PlayGame from "./PlayGame";

const MAX_STEPS = 7;
const GAME_STATUS = {
    PLAYING: 'playing',
    WON: 'won',
    LOST: 'lost',
};

const requestFullscreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};

function PlayGameContainer() {
    const [usedLetters, setUsedLetters] = useState([]);
    const [step, setStep] = useState(0);
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYING);
    const [shouldShake, setShouldShake] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(document.fullscreenElement != null);

    const location = useLocation();
    const navigate = useNavigate();
    const wordSelected = location.state?.wordSelected;
    const hintText = location.state?.hintText;

    const [windowDimension, setWindowDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    

    if (!wordSelected) {
        return <Navigate to="/start" replace />;
    }


    const maskedWordDisplay = useMemo(() => {
        return wordSelected.toUpperCase().split('').map(char => {
            if (!/^[A-Z]$/i.test(char)) return char;
            return usedLetters.includes(char) ? char : '_';
        }).join('');
    }, [wordSelected, usedLetters]);
    
    const handleFullscreenToggle = useCallback(() => {
        const rootElement = document.documentElement;
        if (!document.fullscreenElement) {
            requestFullscreen(rootElement);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }, []);

    const handleLetterClick = useCallback((letter) => {
        if (gameStatus !== GAME_STATUS.PLAYING) return;
        if (usedLetters.includes(letter)) return;

        if (!wordSelected.toUpperCase().includes(letter)) {
            setStep(prevStep => prevStep + 1);
        }
        setUsedLetters(prevUsedLetters => [...prevUsedLetters, letter]);
    }, [gameStatus, usedLetters, wordSelected]);

    const navStart = useCallback(() => {
        setShouldShake(false);
        navigate(`/`);
    }, [navigate]);

    useEffect(() => {
        const fullscreenChangeHandler = () => {
            setIsFullscreen(document.fullscreenElement != null);
        };
        document.addEventListener('fullscreenchange', fullscreenChangeHandler);
        return () => document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    }, []);

    useEffect(() => {
        if (gameStatus === GAME_STATUS.WON) {
            const winSound = new Audio("/sounds/yay.mp3");
            winSound.play();
        }
        if (gameStatus === GAME_STATUS.LOST) {
            const lossSound = new Audio("/sounds/loss.mp3");
            lossSound.play();
        }
    }, [gameStatus]);

    useEffect(() => {
        const handleResize = () => {
            setWindowDimension({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (wordSelected && gameStatus === GAME_STATUS.PLAYING) {
            const isWordGuessed = maskedWordDisplay.split('').every((char, index) => 
                !/^[A-Z]$/i.test(wordSelected[index]) || char !== '_'
            );

            if (isWordGuessed) {
                setGameStatus(GAME_STATUS.WON);
                setShouldShake(true);
            }
        }
    }, [maskedWordDisplay, gameStatus, wordSelected]);

    useEffect(() => {
        if (step >= MAX_STEPS && gameStatus === GAME_STATUS.PLAYING) {
            setGameStatus(GAME_STATUS.LOST);
            setShouldShake(true);
        }
    }, [step, gameStatus]);

    useEffect(() => {
        if (shouldShake) {
            const timer = setTimeout(() => {
                setShouldShake(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [shouldShake]);

    const isGameOver = gameStatus !== GAME_STATUS.PLAYING;
    const isGameWon = gameStatus === GAME_STATUS.WON;
    const isGameLost = gameStatus === GAME_STATUS.LOST;
    const shakeClass = shouldShake ? 'animate-shake' : '';

    const viewProps = {
        wordSelected,
        hintText,
        usedLetters,
        step,
        MAX_STEPS,
        isGameOver,
        isGameWon,
        isGameLost,
        shakeClass,
        windowDimension,
        isFullscreen,
        maskedWordDisplay,
        handleFullscreenToggle,
        handleLetterClick,
        navStart,
        GAME_STATUS
    };

    return <PlayGame {...viewProps} />;
}

export default PlayGameContainer;