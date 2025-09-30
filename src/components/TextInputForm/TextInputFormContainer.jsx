import { useState } from "react";
import TextInputForm from "./TextInputForm";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";

function TextInputFormContainer() {

    const [inputType, setInputType] = useState("password");
    const [value, setValue] = useState("");
    const [hintText, setHintText] = useState("");
    const { errorToast, warningToast } = useToast();

    const handleHintInputChange = (event) => {
        setHintText(event.target.value);
    };

    const navigate = useNavigate();

    function handleFormSubmit(event) {
        event.preventDefault();

        const secretWord = value.trim();
        const hint = hintText.trim();
        const charRegex = /^[a-zA-Z\s]+$/;

        if (!secretWord) {
            warningToast("Please enter the secret word or phrase to start the game.");
            return;
        }

        if (!charRegex.test(secretWord)) {
            errorToast("The secret word/phrase can only contain letters and spaces.");
            return;
        }
        if (!hint) {
            warningToast("A hint is required for this version of the game.")
            return;
        }

        if (!charRegex.test(hint)) {
            warningToast("The hint can only contain letters and spaces.");
            return;
        }
        // console.log("Form submitted. Word:", secretWord, "Hint:", hint);

        navigate(`/play`, { state: { wordSelected: secretWord, hintText: hint } });
    }

    function handleTextInputChange(event) {
        setValue(event.target.value);
    }

    function handleShowHideClick() {
        if (inputType === "password") {
            setInputType("text")
        } else {
            setInputType("password");
        }
    }

    return (
        <>
            <TextInputForm
                inputType={inputType}
                handleFormSubmit={handleFormSubmit}
                handleTextInputChange={handleTextInputChange}
                handleHintInputChange={handleHintInputChange}
                handleShowHideClick={handleShowHideClick}
                hintText={hintText}
            />
        </>
    );
}

export default TextInputFormContainer;