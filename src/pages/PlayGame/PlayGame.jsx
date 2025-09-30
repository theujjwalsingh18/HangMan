import React from 'react';
import MaskedText from "../../components/MaskedText/MaskedText";
import LetterButtons from "../../components/LetterButton/LetterButton";
import HangMan from "../../components/HangMan/HangMan";
import Confetti from 'react-confetti';

function PlayGame({
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
    handleFullscreenToggle,
    handleLetterClick,
    navStart,
}) {
    
    const titleText = isGameWon ? 'YOU SAVED HIM!' : isGameLost ? 'GAME OVER' : 'GUESS THE WORD';
    const titleGradient = isGameWon ? 'bg-gradient-to-r from-yellow-400 to-green-600' : 
                          isGameLost ? 'bg-gradient-to-r from-red-400 to-red-600' : 
                          'bg-gradient-to-r from-cyan-400 to-blue-600';

    const maskedTextUsedLetters = isGameLost ? wordSelected.toUpperCase().split('') : usedLetters;

    return (
        <div className="min-h-screen flex flex-col justify-start sm:justify-center p-4 bg-black relative overflow-hidden">

            {windowDimension.width < 768 && !isFullscreen && (
                <div
                    onClick={handleFullscreenToggle}
                    className="fixed top-0 left-0 w-full bg-cyan-900/90 text-white p-2 text-center text-sm z-[1001] cursor-pointer shadow-lg hover:bg-cyan-800 transition-colors"
                >
                    👋 Tap here for a better **Fullscreen** mobile experience!
                </div>
            )}

            {isGameWon && (
                <Confetti
                    width={windowDimension.width}
                    height={windowDimension.height}
                    recycle={true}
                    numberOfPieces={500}
                    zindex={1000}
                />
            )}
            
            <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `linear-gradient(#00ffea 1px, transparent 1px), linear-gradient(90deg, #00ffea 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className={`relative z-10 w-full max-w-6xl mx-auto px-4 py-4 md:py-4 ${shakeClass} ${windowDimension.width < 768 && !isFullscreen ? 'mt-8' : ''}`}>
                <div className="text-center mb-6 md:mb-10">
                    <div className="relative">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-2 relative">
                            <span className={`text-transparent bg-clip-text ${titleGradient}`}>
                                {titleText}
                            </span>
                            <span className="absolute top-0 left-0 w-full text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600 animate-glitch opacity-70">
                                {titleText}
                            </span>
                        </h1>
                        <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full shadow-lg shadow-cyan-400/50 mt-3"></div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-sm mx-auto mb-8 md:mb-6">
                    <div className={`text-center p-3 sm:p-4 bg-black/40 backdrop-blur-lg rounded-xl border ${isGameWon ? 'border-green-500/30' : isGameLost ? 'border-red-500/30' : 'border-cyan-500/30'} transition-all duration-300`}>
                        <div className={`text-2xl ${isGameWon ? 'text-green-400' : isGameLost ? 'text-red-400' : 'text-cyan-400'} font-mono font-bold`}>{MAX_STEPS - step}</div>
                        <div className="text-xs sm:text-sm text-gray-400">LIVES</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/30">
                        <div className="text-2xl text-purple-400 font-mono font-bold">{usedLetters.length}</div>
                        <div className="text-xs sm:text-sm text-gray-400">USED</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-black/40 backdrop-blur-lg rounded-xl border border-red-500/30">
                        <div className="text-2xl text-red-400 font-mono font-bold">{wordSelected.length}</div>
                        <div className="text-xs sm:text-sm text-gray-400">LETTERS</div>
                    </div>
                </div>

                <div className="w-full flex flex-col lg:flex-row gap-8 md:gap-12 items-center lg:items-start justify-center mb-10">
                    <div className="w-full max-w-sm flex justify-center order-1 lg:w-2/5">
                        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-4 sm:p-6 w-full max-w-[320px] aspect-square flex items-center justify-center border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 transition-all duration-500">
                            <HangMan step={step} gameStatus={isGameLost ? 'lost' : isGameWon ? 'won' : 'playing'} />
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center gap-8 order-2 lg:w-3/5">
                        <div className="w-full flex flex-col items-center -mt-2">
                            <p className="text-center text-sm sm:text-base text-green-400 font-mono uppercase tracking-widest px-2">
                                Hint: <span className="text-yellow-400">{hintText}</span>
                            </p>
                        </div>
                        <div className="w-full text-center min-h-[60px] sm:min-h-[80px] flex items-center justify-center px-2">
                            <MaskedText text={wordSelected} usedLetters={maskedTextUsedLetters} />
                        </div>
                        <div className="px-1 w-full max-w-xl">
                            <LetterButtons
                                text={wordSelected}
                                usedLetters={usedLetters}
                                onLetterClick={handleLetterClick}
                                isDisabled={isGameOver}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center pt-4 pb-4">
                    <button
                        onClick={navStart}
                        className="inline-block relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                        <div className="relative px-8 sm:px-10 py-3.5 bg-black rounded-lg leading-none flex items-center justify-center space-x-3 border border-cyan-500/50 cursor-pointer min-w-[220px] sm:min-w-[250px] transition-all duration-300 transform group-hover:scale-[1.02]">
                            <span className="text-cyan-100 group-hover:text-cyan-50 font-bold text-base sm:text-lg tracking-widest">
                                [ NEW GAME ]
                            </span>
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover:animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes glitch {
                    0% { transform: translate(0); }
                    20% { transform: translate(-3px, 3px); }
                    40% { transform: translate(-3px, -3px); }
                    60% { transform: translate(3px, 3px); }
                    80% { transform: translate(3px, -3px); }
                    100% { transform: translate(0); }
                }
                .animate-glitch {
                    animation: glitch 0.5s ease-in-out infinite;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .group-hover\\:animate-spin-slow {
                    animation: spin-slow 2s linear infinite;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                    transform: translate3d(0, 0, 0); 
                    backface-visibility: hidden;
                    perspective: 1000px;
                }
            `}</style>
        </div>
    );
}

export default PlayGame;