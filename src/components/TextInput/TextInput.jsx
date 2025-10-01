function TextInput({ type = "text", label, placeholder = "Enter your input here", onChangeHandler }) {

    return (
        <label
            className="flex flex-col rounded-md text-center items-center m-2"
        >
            <span className="text-blue-500">{label}</span>
            <input 
                type={type}
                className="w-full m-3 px-4 py-2 border border-gray-500 rounded-md"
                placeholder={placeholder}
                onChange={onChangeHandler}
            />
            
        </label>
        
    )
}

export default TextInput;