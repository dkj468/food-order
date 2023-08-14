import { useState } from "react";


const useInput = (validator, classes) => {
    const [value, setValue] = useState('');
    const [IsValid, setIsValid] = useState(true);

    const changeHandler = (event) => {
        if (validator(event.target.value)){
            setIsValid(true)
        } else {
            setIsValid(false);
        }
        setValue(event.target.value);
    }

    const blurHandler = (event) => {
        if (validator(event.target.value)){
            setIsValid(true)
        } else {
            setIsValid(false);
        }
        setValue(event.target.value);
    }
    const inputClass = IsValid ? classes.control : `${classes.control} ${classes.invalid}`;
    return {value, IsValid, changeHandler, blurHandler, inputClass};
};

export default useInput;