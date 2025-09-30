import React from 'react'
import getButtonStyling from './getButtonStyleType';

function Button({
    text,
    onClickHandler,
    styleType = "primary",
    type = "button" }) {
    return (
        <>
            <button
                type={type}
                className={`size[20px] font-bold p-2 m-2 ${getButtonStyling(styleType)} w-40 text-black rounded-lg`}
                onClick={onClickHandler}
            >
                {text}
            </button>
        </>
    )
}

export default Button;
