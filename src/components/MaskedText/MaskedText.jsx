import React from 'react'
import { getAllCharacters } from './MaskedTextUtils'

function MaskedText({ text, usedLetters }) {
    const maskedString = getAllCharacters(text, usedLetters).split('');
    
    return (
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 p-2 min-h-[60px] sm:min-h-[80px] items-center w-full">
            {maskedString.map((letter, idx) => {
                const isLetter = letter !== '_' && letter !== ' ';
                const isSpace = letter === ' ';
                
                if (isSpace) {
                    return <div key={idx} className="w-2 sm:w-4 md:w-6"></div>;
                }
                
                return (
                    <div
                        key={idx}
                        className={`flex items-center justify-center 
                            ${isLetter 
                                ? 'text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-cyan-400 to-blue-400 bg-clip-text text-transparent font-mono' 
                                : 'text-2xl sm:text-3xl md:text-4xl font-bold text-red-400 font-mono'
                            } 
                            w-6 h-8 sm:w-8 sm:h-10 md:w-10 md:h-12 border-b-4 ${isLetter ? 'border-cyan-500' : 'border-red-500'}
                            transition-all duration-300 transform ${isLetter ? 'scale-110' : 'scale-100'}
                            shadow-lg ${isLetter ? 'shadow-cyan-500/20' : 'shadow-red-500/20'}`}
                    >
                        {letter}
                    </div>
                );
            })}
        </div>
    )
}

export default MaskedText;