import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [showModal, setShowModal] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [isSinglePlayerLoading, setIsSinglePlayerLoading] = useState(false);
    const [word, setWord] = useState("");
    const [hintText, setHintText] = useState("");
    const [fetchError, setFetchError] = useState(null);
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_KEY;

    async function fetchWords() {
        setIsFetching(true);
        setFetchError(null);
        try {
            const res = await fetch(baseURL)
            if (!res.ok) {
                throw new Error(`Failed to fetch words (Status: ${res.status})`);
            }
            const data = await res.json();
            if (!data || data.length === 0) {
                 throw new Error("Server returned empty data or an invalid format.");
            }

            const randomIdx = Math.floor(Math.random() * data.length)
            const fetchedWord = data[randomIdx].wordValue;
            const fetchedHint = data[randomIdx].wordHint;

            setWord(fetchedWord);
            setHintText(fetchedHint);

            if (isSinglePlayerLoading) {
                navigate(`/play`, { state: { wordSelected: fetchedWord, hintText: fetchedHint } });
                setIsSinglePlayerLoading(false);
            }
        } catch (error) {
            console.error("Error fetching words:", error);
            const errorMessage = error.message || "A network error occurred.";
            if (isSinglePlayerLoading) {
                setIsSinglePlayerLoading(false);
                setFetchError(errorMessage);
            }
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        fetchWords();
    }, []);

    const handleStartClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleSinglePlayer = () => {
        if (word && hintText) {
            navigate(`/play`, { state: { wordSelected: word, hintText: hintText } });
        } else {
            setShowModal(false);
            setIsSinglePlayerLoading(true);
            if (!isFetching && fetchError) {
                setIsSinglePlayerLoading(false);
            }
        }
    };

    const handleMultiplayer = () => {
        navigate('/start');
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleDismissError = () => {
        setFetchError(null);
    };
    
    if (fetchError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black relative overflow-hidden text-center">
                <div className="fixed inset-0 bg-gradient-to-br from-red-900 via-black to-red-900"></div>
                <div className="relative z-10 p-8 sm:p-12 bg-gray-900/70 backdrop-blur-md rounded-2xl border border-red-500/50 shadow-2xl">
                    <h2 className="mt-4 text-xl sm:text-2xl font-bold text-red-400">
                        ERROR FETCHING WORD!
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-300">
                        {fetchError}
                    </p>
                    <p className="mt-4 text-xs text-red-300">
                        Please check your network or try again.
                    </p>
                    <button
                        onClick={handleDismissError}
                        className="mt-6 inline-block px-4 py-2 bg-red-600 rounded-lg text-white font-bold hover:bg-red-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }
    
    if (isSinglePlayerLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black relative overflow-hidden text-center">
                <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900"></div>
                <div className="relative z-10 p-8 sm:p-12 bg-gray-900/70 backdrop-blur-md rounded-2xl border border-cyan-500/50 shadow-2xl">
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-400 mx-auto animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <h2 className="mt-4 text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                        LOADING WORD...
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-400">Preparing your challenge. Please wait.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-black relative overflow-hidden">
            <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `linear-gradient(#00ffea 1px, transparent 1px), linear-gradient(90deg, #00ffea 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}></div>

            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
                <div className="text-center">
                    <div className="relative mb-4 md:mb-6">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-2 md:mb-4 relative">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                                HANGMAN
                            </span>
                            <span className="absolute top-0 left-0 w-full text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600 animate-glitch">
                                HANGMAN
                            </span>
                        </h1>
                        <div className="w-24 md:w-32 h-1 md:h-2 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full shadow-lg shadow-cyan-400/50"></div>
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 font-light tracking-wide px-2">
                        GUESS WRONG, MEET YOUR FATE
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12 max-w-md mx-auto">
                        <div className="text-center p-3 sm:p-4 bg-black/40 backdrop-blur-lg rounded-lg border border-cyan-500/30">
                            <div className="text-2xl sm:text-3xl text-cyan-400 font-mono">26</div>
                            <div className="text-xs sm:text-sm text-gray-400">LETTERS</div>
                        </div>
                        <div className="text-center p-3 sm:p-4 bg-black/40 backdrop-blur-lg rounded-lg border border-purple-500/30">
                            <div className="text-2xl sm:text-3xl text-purple-400 font-mono">7</div>
                            <div className="text-xs sm:text-sm text-gray-400">TRIES</div>
                        </div>
                        <div className="text-center p-3 sm:p-4 bg-black/40 backdrop-blur-lg rounded-lg border border-red-500/30">
                            <div className="text-2xl sm:text-3xl text-red-400 font-mono">∞</div>
                            <div className="text-xs sm:text-sm text-gray-400">WORDS</div>
                        </div>
                    </div>

                    <button
                        onClick={handleStartClick}
                        className="inline-block relative group mb-4 md:mb-6"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                        <div className="relative px-6 sm:px-8 md:px-12 py-3 sm:py-4 bg-black rounded-lg leading-none flex items-center justify-center space-x-2 sm:space-x-4 border border-cyan-500/50 cursor-pointer min-w-[200px]">
                            <span className="text-cyan-100 group-hover:text-cyan-50 font-bold text-lg sm:text-xl tracking-wider whitespace-nowrap">
                                [ START GAME ]
                            </span>
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </button>

                    <div className="mt-8 md:mt-12 p-4 sm:p-6 bg-black/30 backdrop-blur-lg rounded-xl border border-gray-800 max-w-md mx-auto">
                        <div className="text-xs sm:text-sm text-gray-400 mb-3">WORD PREVIEW</div>
                        <div className="flex justify-center space-x-2 sm:space-x-3 mb-3 md:mb-4">
                            {['H', '_', 'N', 'G', '_', 'A', 'N'].map((letter, i) => (
                                <div key={i} className={`w-6 h-8 sm:w-8 sm:h-10 flex items-center justify-center font-mono font-bold text-base sm:text-lg border-b-2 ${letter === '_' ? 'text-red-400 border-red-500' : 'text-green-400 border-green-500'}`}>
                                    {letter}
                                </div>
                            ))}
                        </div>
                        <div className="text-xs text-gray-500">Guess the missing letters!</div>
                    </div>
                </div>
            </div>

            <footer className="fixed bottom-4 left-0 right-0 text-center z-10">
                <p className="text-gray-600 text-xs sm:text-sm font-mono">
                    &lt;code with 💀 and ❤️ /&gt;
                </p>
            </footer>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
                    <div className="relative bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-4 overflow-hidden">
                        <div className="relative p-4 sm:p-6 border-b border-cyan-500/20">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                            <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center">
                                SELECT GAME MODE
                            </h2>
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-cyan-400 transition-colors"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Single Player Card */}
                        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                            <div
                                onClick={handleSinglePlayer}
                                className="group p-4 sm:p-6 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                            >
                                <div className="text-center">
                                    {isFetching && !isSinglePlayerLoading ? (
                                        <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 text-cyan-400 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-cyan-500/20 rounded-full flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="266.667" height="266.667" viewBox="0 0 200 200">
                                            <path d="M106.5 33.9C92.8 37.4 83.7 48.6 83.6 62c0 3.6.6 8.1 1.4 10 2.2 5.5 6.8 11.8 9.8 13.4 2.5 1.4 2.6 1.5.7 2.1-9 3.2-13.2 6.6-11.9 9.9 1.1 2.9 4.3 2.8 10.7-.4 28.3-13.9 60.4 7.2 59.6 39.2-.2 9.5 1.7 12.6 6 9.9 2.1-1.3 3-9.7 2-18.1-1.8-15.6-13.2-31.6-27.3-38.5l-5.6-2.7 3.8-3.7c11.4-11.1 11.5-29.8.2-41.1-6.5-6.5-18.5-10.2-26.5-8.1m15.3 10C129 47.6 133 54.1 133 62.2c-.1 12.2-8.5 20.8-20.5 20.8S92 74.5 92 62.5c0-8.5 3.9-14.8 11.5-18.8 4.3-2.3 13.7-2.2 18.3.2m-14.5 44.2c-.5.5-2.6 1.1-4.8 1.4l-4.1.7v-6.9l4.8 2.1c2.6 1.1 4.5 2.3 4.1 2.7m18.7-2.7c0 .8.3 2.2.7 3.2.6 1.5.2 1.6-3.7 1-6.3-1-6.9-1.8-2.4-3.7 4.9-2.2 5.4-2.2 5.4-.5" />
                                            <path d="M47.5 114.2c-15.1 5.3-22.3 23.2-15.6 38.3 2.5 5.6 9.7 11.9 16.1 14 9.3 3.1 22.1.3 28.2-6.2 3-3.2 7.7-3.1 10.9.3 4.6 5 9.7 6.9 18.4 6.9 6.7 0 8.8-.5 13.1-2.7 10.1-5.3 15-14.7 14.2-26.9-.8-10.5-6.4-18.5-16.3-23-3.6-1.7-7.1-1.9-35-1.8-19.1 0-32.2.5-34 1.1m69.2 10.4c10.2 8.1 10.9 22.7 1.4 30.7-3.1 2.6-8.7 4.7-12.5 4.7-4.3 0-10.3-2.7-13.8-6.2-3.7-3.7-4.1-3.8-10.7-3.8s-7 .1-10.8 3.9c-7.1 7.2-16.9 7.9-25.6 1.9-5.4-3.8-8.5-13.2-6.6-20.2 1.5-5.6 5-9.9 10.1-12.5 4.2-2.1 5.3-2.1 34.5-1.9l30.1.3z" />
                                            <path d="M105.2 131.9c-2.1 1.3-1 4.6 1.6 4.9 2.7.4 4-2.2 2.2-4.3-1.4-1.7-2-1.8-3.8-.6M53.3 136c-.3 1.1-1.2 2-1.9 2-3 0-2.6 3.1.7 6.5 1.9 1.9 3.9 3.5 4.4 3.5.6 0 2.5-1.5 4.3-3.4 3.2-3.3 3.6-6.6.7-6.6-.8 0-1.7-.9-2-2-.4-1.3-1.5-2-3.2-2-1.6 0-2.7.7-3 2m45.9 1.9c-2.1 1.3-1 4.6 1.6 4.9 2.7.4 4-2.2 2.2-4.3-1.4-1.7-2-1.8-3.8-.6m11.2.6c-.8 2.1.2 4.5 1.9 4.5.8 0 2-.7 2.7-1.5 1-1.2 1-1.8 0-3-.7-.8-1.9-1.5-2.7-1.5-.7 0-1.6.7-1.9 1.5m-6 6c-.8 2.1.2 4.5 1.9 4.5.8 0 2-.7 2.7-1.5 1-1.2 1-1.8 0-3-.7-.8-1.9-1.5-2.7-1.5-.7 0-1.6.7-1.9 1.5" />
                                            </svg>
                                        </div>
                                    )}

                                    <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-1 sm:mb-2">
                                        {isFetching && !isSinglePlayerLoading ? "Waiting for Word..." : "Single Player"}
                                    </h3>
                                    <p className="text-gray-300 text-xs sm:text-sm">
                                        Play against the computer. Test your vocabulary skills alone.
                                    </p>
                                </div>
                            </div>

                            {/* Multiplayer Card */}
                            <div
                                onClick={handleMultiplayer}
                                className="group p-4 sm:p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl cursor-pointer transition-all duration-300 hover:border-purple-400 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                            >
                                <div className="text-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 300 300">
                                            <path d="M122 63.1c-18.7 8.5-19.8 33.6-1.9 43.3 15.1 8.3 33.6-1.2 35.6-18.3.9-7.9-1.2-13.7-7.1-19.6-7.7-7.6-17.4-9.6-26.6-5.4m20.5 5.4c4.8 2.8 9.5 10.7 9.5 15.9 0 12.1-8.6 20.6-20.8 20.6-8.1 0-14.3-3.9-17.7-11.3-3.9-8.3-2.8-15.3 3.3-21.9 6.8-7.2 16.9-8.5 25.7-3.3m43 6.2c-19.9 6.9-21.9 34.8-3.1 44.5 15.1 7.7 33.3-2.1 35.3-19 2-17.4-15.5-31.2-32.2-25.5m17.4 5.3c12.8 6.5 14.7 23.1 3.8 32.7-8.6 7.5-20.8 6.6-28.5-2.1-6.5-7.4-6.7-18.3-.5-25.6 5.8-6.9 17.1-9.2 25.2-5m-86.6 37c-5.7 1.3-12.3 6-15.3 10.7s-4.5 10.2-5.6 21l-.7 6.3h3.7c2 0 5.9.9 8.8 2 4.5 1.7 7.7 2 20.6 2 11.4 0 15.4-.3 15.6-1.3.2-.6.9-4.5 1.5-8.5 1.3-8.6 4.7-15.7 10.2-21.7l4-4.3-4.5-2.7c-2.4-1.4-5.9-3-7.8-3.5-3.8-1.2-25.8-1.2-30.5 0m28.6 4.1c7.3 1.5 7.6 2.5 3.1 9.2-3.6 5.3-5.3 9.8-7.7 19.7l-.9 3.5-13.9.3c-11.1.2-15.2-.1-19.9-1.4l-5.9-1.8.6-7.2c.9-12.1 6.3-19.3 16.5-22 5.8-1.6 21.4-1.8 28.1-.3m28.6 10.3c-2.7 1.3-6.2 3.6-7.7 5.2-2.9 3.1-6.2 10.1-7.1 14.9l-.5 3 6.1.1c12.2.1 21.8 8.7 26.6 23.6 1.2 3.7 1.4 3.8 6 3.8 8.3 0 29.5-3 31.8-4.6 2.7-1.7 2.8-2.9.7-17.6-2.4-17.2-6-23.7-15.9-28.4-4.6-2.2-6.3-2.4-20-2.4s-15.4.2-20 2.4m38 3.5c8.8 4.1 11.8 9.7 14.1 26.1 1.7 12.4 1.4 13.4-3.9 14.4-6.8 1.2-23.1 2.6-24.9 2-1-.3-3.2-3.3-4.8-6.6-6-12-12.4-17.6-22.8-19.8-5.6-1.3-6.2-2.2-3.8-6.8 2-3.7 6.4-7.8 10.6-9.6 5.5-2.4 30.2-2.2 35.5.3m-126 33.9c-4.1 2.5-7.5 9.3-12.5 24.7-3.6 11.1-4.3 14.3-4.4 22-.1 10.6 1.9 17.1 6.5 21 8.7 7.2 23.3-1.6 31.7-19.3l3.4-7.2h35.3l3.4 7.1c3.9 8.1 11.7 17.1 17.2 20 5 2.5 10.9 2.5 14.2-.1 4.8-3.8 7.1-10.3 7-20.4-.1-7.7-.8-11.1-4.3-22.1-5.2-16.7-8.4-23.2-12.4-25.6-4.1-2.5-11.1-2.5-17.8.1-4.6 1.8-7.7 2-24.8 2s-20.2-.2-24.8-2c-6.6-2.5-13.7-2.6-17.7-.2m17 4.2c5 1.7 8.4 2 25.4 2 16.7 0 20.5-.3 25.9-2 7.6-2.4 10.4-2.5 14.2-.5 3.7 1.9 5.3 4.9 10.3 20 3.4 10.2 4.1 13.6 4.4 22.5.5 11.6-.9 16.1-5.9 18.9-6.2 3.6-17.2-4.5-23.8-17.3-5.4-10.6-5.4-10.6-25-10.6-19.7 0-19.8 0-25.6 11.1-6.7 12.8-17.1 20.3-23.2 16.8-9.7-5.4-8.9-25.1 2-51.7 4.6-11.2 9.4-13.3 21.3-9.2" />
                                            <path d="M153.5 177.6c-1.9 1.9-3.7 3.9-4.2 4.4-.4.5-2.3 2.2-4.2 3.8-2.3 1.9-3.3 3.7-3.3 5.6 0 2.8 3.3 7.2 6.1 8.1.9.3 2.3 1.8 3.3 3.4.9 1.6 2.8 3.7 4.2 4.6 2.2 1.5 3.1 1.5 5.6.5 1.6-.7 3.9-2.8 5.1-4.6 1.1-1.9 2.4-3.4 2.9-3.4 1.8 0 7-6.3 7-8.5 0-2.5-3.9-7.5-5.9-7.5-.6 0-2.2-1.7-3.6-3.9-2.4-3.5-6-6.1-8.6-6.1-.6 0-2.6 1.6-4.4 3.6m8.3 1.6c.7.7 1.2 2.1 1.2 3.3s-.5 2.6-1.2 3.3c-2.7 2.7-7.8.7-7.8-2.9 0-3.9 5.2-6.3 7.8-3.7m-9 9c.7.7 1.2 2.1 1.2 3.3s-.5 2.6-1.2 3.3-2.1 1.2-3.3 1.2-2.6-.5-3.3-1.2-1.2-2.1-1.2-3.3.5-2.6 1.2-3.3 2.1-1.2 3.3-1.2 2.6.5 3.3 1.2m18 0c.7.7 1.2 2.1 1.2 3.3s-.5 2.6-1.2 3.3-2.1 1.2-3.3 1.2-2.6-.5-3.3-1.2-1.2-2.1-1.2-3.3.5-2.6 1.2-3.3 2.1-1.2 3.3-1.2 2.6.5 3.3 1.2m-9 9c1.7 1.7 1.5 5.3-.3 6.8-3.8 3.1-9.6-2.7-6.5-6.5 1.5-1.8 5.1-2 6.8-.3m-72.3-14.9c-8.6 8.4-8.6 9.8-.1 18.3 7.2 7.2 9.9 8 13.7 3.8 2.5-2.7 4.6-4.8 7.9-7.7 1.3-1.1 2-3 2-5.2 0-2.3-.7-4.1-2-5.3-3.3-2.8-5.4-4.9-7.9-7.6-3.7-4.1-6.3-3.4-13.6 3.7M102 184c0 4 0 4 4 4 3.9 0 4 .1 4 3.5s-.1 3.5-4 3.5c-4 0-4 0-4 4v4h-8.3l.7-4 .6-4h-4.5c-4.5 0-4.5 0-4.5-3.5s0-3.5 4.5-3.5H95l-.6-4-.7-4h8.3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-purple-400 mb-1 sm:mb-2">Multiplayer</h3>
                                    <p className="text-gray-300 text-xs sm:text-sm">Play with friends. Take turns guessing words together.</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 sm:p-4 border-t border-cyan-500/20 bg-black/50">
                            <p className="text-center text-gray-400 text-xs sm:text-sm">
                                Choose your adventure wisely!
                            </p>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
                @keyframes glitch {
                    0% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                    100% { transform: translate(0); }
                }
                .animate-glitch {
                    animation: glitch 0.5s ease-in-out infinite;
                }
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </div>
    );
}

export default Home;