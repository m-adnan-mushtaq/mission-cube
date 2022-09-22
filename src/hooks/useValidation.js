import { useState } from "react";

//hook for validate input

const validityInfo={
    name:{
        required:true,
        min:3,
        pattern:/^[A-Za-z\s]*$/
    },
    password:{
        required:true,
        min:6
    },
    email:{
        required:true,
        pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
}
export default function useValidation() {
    const [input, setInput] = useState('')
    const [isValid, setIsValid] = useState('')
    const inputChangeHanlder = e => {
        const {name,value} = e.target
        setInput(value)
        let isInputValid=validityChecker(name,value)
        setIsValid(isInputValid)
    }


    //check validity  info
    function validityChecker(type,val) {
        val=val.trim()
        let targetType=validityInfo[type]
        let isvalid=true
        if(targetType.required) {
            isvalid=val.length && isvalid
        }
        if(targetType.pattern){
            isvalid=targetType.pattern.test(val) && isvalid
        }
        if(targetType.min){
            isvalid=val.length >= targetType.min && isvalid
        }
        return isvalid
    }

    return [input, isValid, inputChangeHanlder]

}