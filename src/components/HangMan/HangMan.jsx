import React from 'react'
import Level1 from '../../assets/images/1.svg'
import Level2 from '../../assets/images/2.svg'
import Level3 from '../../assets/images/3.svg'
import Level4 from '../../assets/images/4.svg'
import Level5 from '../../assets/images/5.svg'
import Level6 from '../../assets/images/6.svg'
import Level7 from '../../assets/images/7.svg'
import Level8 from '../../assets/images/8.svg'
import Win from "../../assets/images/win.svg"

const GAME_STATUS = {
    PLAYING: 'playing',
    WON: 'won',
    LOST: 'lost',
};

function HangMan({ step, gameStatus }) {
    const images = [Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8];
    let imageSource = null;

    if (gameStatus === GAME_STATUS.WON) {
        imageSource = Win;
    } else if (gameStatus === GAME_STATUS.LOST || step >= images.length) {
        imageSource = images[images.length - 1];
    } else {
        imageSource = images[step];
    }

    return (
        <div
            className='w-[300px] h-[250px]'
        >
            <img
                src={imageSource}
                alt={
                    gameStatus === GAME_STATUS.WON
                        ? "You Win!"
                        : gameStatus === GAME_STATUS.LOST
                            ? "Game Over"
                            : `Hangman Step ${step}`
                }
                className={'rounded-lg'}
            />
        </div>
    )
}

export default HangMan