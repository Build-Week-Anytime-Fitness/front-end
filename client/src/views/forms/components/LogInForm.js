import React, {useState, useEffect} from 'react';
import {loginFormSchema} from '../validation/schema';
import {validateForm,validateField} from '../validation/validationHelpers';
const initialValues = {
    email:'',
    password:''
};
function LogInForm(){
    // state variables
    const [isValid,setIsValid] = useState(true);
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState(Object.keys(initialValues).reduce((acc,key)=>{acc[key]='';return acc;},{}));
    // useEffect
    useEffect(()=>{
        // validateForm whenever the component is mounted
        validateForm(loginFormSchema,formValues,setIsValid); //check if form is valid using schema.validate
    },[]);
    // function declarations
    const handleChange=(event)=>{
        const {name,value,checked,type} = event.target;
        const inputValue = type==='checkbox'?checked:value;
        const newFormValues = {...formValues,[name]:inputValue};
        validateField(loginFormSchema,name,inputValue,formErrors,setFormErrors); //validate changed field using yup.reach
        validateForm(loginFormSchema,newFormValues,setIsValid);
        setFormValues(newFormValues);
    };
    const handleSubmit=(event)=>{
        event.preventDefault();
        // redux refactoring
    };
    return(
        <form onSubmit={handleSubmit}>
            <label>
                Email
                <input type='text' name='email' value={formValues.email} onChange={handleChange}></input>
            </label>
            <label>
                Password
                <input type='text' name='password' value={formValues.password} onChange={handleChange}></input>
            </label>
            <button type='submit' disabled={!isValid}>Log In</button>
            {
                Object.keys(formErrors).map((key,i)=>formErrors[key]===''?'':<div key={i}>{formErrors[key]}</div>)
            }
        </form>
    );
}
export default LogInForm;