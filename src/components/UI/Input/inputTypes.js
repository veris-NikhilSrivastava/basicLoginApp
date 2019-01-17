import React from "react";

export const inputTypes={
    email:{
        inputType:'email',
        value:'',
        classes:'inputs form-control',
        name:'email'

},
    accCreationEmail:{
        inputType:'email',
        value:'',
        classes:'form-control accCreationInput',
        inputRef:React.createRef(),
        name:'accEmail'
    },
    accCreationPass:{
        inputType:'password',
        value:'',
        name:'accPass',
        classes:'form-control accCreationInput'
    },
    password:{
        inputType:'password',
        value:'',
        name:'password',
        classes:'form-control'
    },
    username:{
        inputType:'text',
        value:'',
        name:'username',
        classes:'form-control accCreationInput'
    }
};