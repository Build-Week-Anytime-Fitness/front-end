import React, {useState, useEffect} from 'react';
import {loginFormSchema} from '../validation/schema';
import {validateForm} from '../validation/validationHelpers';
import {displayErrors,handleChangeHelper,handleSubmitHelper} from '../formHelpers';
const initialValues = {
    email:'',
    password:''
};
const initialErrorValues = Object.keys(initialValues).reduce((acc,key)=>{acc[key]='';return acc;},{});
function LogInForm(){
    // state variables
    const [isValid,setIsValid] = useState(true);
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState(initialErrorValues);
    // useEffect
    useEffect(()=>{
        // validateForm whenever the component is mounted
        validateForm(loginFormSchema,formValues,setIsValid); //check if form is valid using schema.validate
    },[]);
    // function declarations
    const handleChange=(event)=>{
        handleChangeHelper({
            event,
            schema:loginFormSchema,
            formValues,
            setFormValues,
            formErrors,
            setFormErrors,
            setIsValid
        });
    };
    const handleSubmit=(event)=>{
        handleSubmitHelper(event);
    };
    return(
        <form onSubmit={handleSubmit}>
            <label>
                Email
                <input type='text' name='email' value={formValues.email} onChange={handleChange}></input>
            </label>
            <label>
                Password
                <input type='password' name='password' value={formValues.password} onChange={handleChange}></input>
            </label>
            <button type='submit' disabled={!isValid}>Log In</button>
            {displayErrors(formErrors)}
        </form>
    );
}
export default LogInForm;