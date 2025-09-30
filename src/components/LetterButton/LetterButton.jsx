
// const ALPHABETS = new Array(26).fill('').map((e, index) => String.fromCharCode(65 + index));
// // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// function LetterButtons({ text, usedLetters, onLetterClick }) {
//     const originalCharacters = new Set(text.toUpperCase().split(''));
//     const selectedLetters = new Set(usedLetters.join('').toUpperCase().split(''));

//     const buttonStyle = function(letter) {
//         if (selectedLetters.has(letter)) {
//             return `${originalCharacters.has(letter) ? 'bg-green-600  border-green-700' : 'border-[#000] border-4 bg-red-600' }  `
//         } else {
//             return 'bg-blue-600 border-blue-700 hover:bg-blue-700'
//         }
//     }

//     const handleClick = function(event) {
//         const character = event.target.value;
//         onLetterClick?.(character);
//     }

//     const buttons = ALPHABETS.map(letter => {
//         return (
//             <button
//                 key={`button-${letter}`}
//                 value={letter}
//                 disabled={selectedLetters.has(letter)}
//                 onClick={handleClick}
//                 className={`h-12 w-12 m-1 rounded-md focus:outline-none text-white ${buttonStyle(letter)}`}
//             >
//                 {letter}
//             </button>
//         );
//     })

//     return (
//         <>
//             {buttons}
//         </>
//     )
// }

// export default LetterButtons;

// import React from 'react';

// const KEYBOARD_ROWS = [
//     'QWERTYUIOP'.split(''),
//     'ASDFGHJKL'.split(''),
//     'ZXCVBNM'.split('')
// ];

// function LetterButtons({ text, usedLetters, onLetterClick }) {
//     const originalCharacters = new Set(text.toUpperCase().split(''));
//     const selectedLetters = new Set(usedLetters.join('').toUpperCase().split(''));

//     const buttonStyle = function(letter) {
//         if (selectedLetters.has(letter)) {
//             if (originalCharacters.has(letter)) {
//                 return {
//                     className: 'bg-green-600 border-green-700',
//                     showCross: false
//                 };
//             } else {
//                 return {
//                     className: 'bg-red-600 border-red-700 border-4 border-[#000]',
//                     showCross: true
//                 };
//             }
//         } else {
//             return {
//                 className: 'bg-blue-600 border-blue-700 hover:bg-blue-700',
//                 showCross: false
//             };
//         }
//     }

//     const handleClick = function(event) {
//         const character = event.target.value;
//         onLetterClick?.(character);
//     }

//     const renderRow = (row, rowIndex) => {
//         return (
//             <div key={`row-${rowIndex}`} className="flex justify-center">
//                 {row.map(letter => {
//                     const { className: dynamicClass, showCross } = buttonStyle(letter);
//                     return (
//                         <button
//                             key={`button-${letter}`}
//                             value={letter}
//                             disabled={selectedLetters.has(letter)}
//                             onClick={handleClick}
//                             className={`h-12 w-12 m-1 rounded-md focus:outline-none text-white font-bold text-lg border-b-4
//                                         relative flex items-center justify-center
//                                         ${dynamicClass}
//                                         ${selectedLetters.has(letter) ? 'cursor-default' : 'cursor-pointer'}`
//                                       }
//                         >
//                             {letter}
//                             {showCross && (
//                                 <div
//                                     className="absolute inset-0 flex items-center justify-center"
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-full w-full opacity-50"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                         strokeWidth="3"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </div>
//                             )}
//                         </button>
//                     );
//                 })}
//             </div>
//         );
//     }

//     return (
//         <div className="flex flex-col items-center p-2">
//             {KEYBOARD_ROWS.map(renderRow)}
//         </div>
//     )
// }

// export default LetterButtons;

import React from 'react';

const KEYBOARD_ROWS = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    'ZXCVBNM'.split('')
];

function LetterButtons({ text, usedLetters, onLetterClick }) {
    const originalCharacters = new Set(text.toUpperCase().split(''));
    const selectedLetters = new Set(usedLetters.join('').toUpperCase().split(''));

    const buttonStyle = function(letter) {
        if (selectedLetters.has(letter)) {
            if (originalCharacters.has(letter)) {
                return {
                    className: 'bg-gradient-to-br from-green-500 to-green-600 border-green-500 text-white shadow-lg shadow-green-500/25',
                    showCross: false
                };
            } else {
                return {
                    className: 'bg-gradient-to-br from-red-500 to-red-600 border-red-500 text-white shadow-lg shadow-red-500/25',
                    showCross: true
                };
            }
        } else {
            return {
                className: 'bg-gradient-to-br from-cyan-600 to-blue-600 border-cyan-500 text-white hover:from-cyan-500 hover:to-blue-500 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20',
                showCross: false
            };
        }
    }

    const handleClick = function(event) {
        const character = event.target.value;
        onLetterClick?.(character);
    }

    const renderRow = (row, rowIndex) => {
        return (
            <div key={`row-${rowIndex}`} className="flex justify-center gap-1 mb-2 last:mb-0 px-1">
                {row.map(letter => {
                    const { className: dynamicClass, showCross } = buttonStyle(letter);
                    return (
                        <button
                            key={`button-${letter}`}
                            value={letter}
                            disabled={selectedLetters.has(letter)}
                            onClick={handleClick}
                            className={`h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-lg focus:outline-none font-bold text-sm sm:text-lg border-b-4 
                                        relative flex items-center justify-center transition-all duration-200 font-mono
                                        ${dynamicClass} 
                                        ${selectedLetters.has(letter) ? 'cursor-default opacity-80' : 'cursor-pointer shadow-lg hover:shadow-cyan-500/30'}`}
                        >
                            {letter}
                            {showCross && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 opacity-80"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        fill="none"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-full">
            {KEYBOARD_ROWS.map(renderRow)}
        </div>
    )
}

export default LetterButtons;