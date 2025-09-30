import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";

function TextInputForm({ inputType, handleFormSubmit, handleTextInputChange, handleHintInputChange, handleShowHideClick, hintText }) {

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
            
            <div className="relative z-10 w-full max-w-md mx-auto p-4 sm:p-6 md:p-8 bg-black/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-blue-500/30 opacity-70">
                <h1
                    className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-500'
                >
                    [ HANGMAN v2 ]
                </h1>
                
                <form
                    onSubmit={handleFormSubmit}
                    className="w-full flex flex-col items-center gap-4 sm:gap-6"
                >
                    <div className="w-full">
                        <TextInput
                            type={inputType}
                            label="Enter a word or a phrase"
                            placeholder="Enter the secret word here..."
                            onChangeHandler={handleTextInputChange}
                        />
                    </div>
                    
                    <div className="w-full">
                        <TextInput
                            type="text"
                            label="Enter a Hint"
                            placeholder="e.g., A type of fruit, A famous movie..."
                            onChangeHandler={handleHintInputChange}
                            value={hintText}
                        />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 mt-2 text-center">
                        <div className="w-full sm:flex-1">
                            <Button
                                styleType="warning"
                                text={inputType === "password" ? "Show Word" : "Hide Word"}
                                onClickHandler={handleShowHideClick}
                                fullWidth
                            />
                        </div>

                        <div className="w-full sm:flex-1">
                            <Button
                                type="submit"
                                styleType="success"
                                text="Start Game"
                                fullWidth
                            />
                        </div>
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .animate-pulse {
                    animation: pulse 4s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
}

export default TextInputForm;