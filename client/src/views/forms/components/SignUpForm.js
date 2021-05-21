import React, {useState, useEffect} from 'react';
import {signUpFormSchema} from '../validation/schema';
import {validateForm,validateField} from '../validation/validationHelpers';
const initialValues = {
    personName:'',
    email:'',
    isOverEighteen:false,
    password:'',
    isInstructor:false
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
        validateForm(signUpFormSchema,formValues,setIsValid); //check if form is valid using schema.validate
    },[]);
    // function declarations
    const handleChange=(event)=>{
        const {name,value,checked,type} = event.target;
        const inputValue = type==='checkbox'?checked:value;
        const newFormValues = {...formValues,[name]:inputValue};
        validateField(signUpFormSchema,name,inputValue,formErrors,setFormErrors); //validate changed field using yup.reach
        validateForm(signUpFormSchema,newFormValues,setIsValid);
        setFormValues(newFormValues);
    };
    const handleSubmit=(event)=>{
        event.preventDefault();
        // redux refactoring
    };
    return(
        <form onSubmit={handleSubmit}>
            <label>
                Name
                <input type='text' name='personName' value={formValues.personName} onChange={handleChange}></input>
            </label>
            <label>
                Email
                <input type='text' name='email' value={formValues.email} onChange={handleChange}></input>
            </label>
            <label>
                Password
                <input type='password' name='password' value={formValues.password} onChange={handleChange}></input>
            </label>
            <label>
                Are you older than 18?
                <input type='checkbox' name='isOverEighteen' checked={formValues.isOverEighteen} onChange={handleChange}></input>
            </label>
            <label>
                Are you an instructor?
                <input type='checkbox' name='isInstructor' checked={formValues.isInstructor} onChange={handleChange}></input>
            </label>
            <button type='submit' disabled={!isValid}>Sign Up</button>
            {
                Object.keys(formErrors).map((key,i)=>formErrors[key]===''?'':<div key={i}>{formErrors[key]}</div>)
            }
        </form>
    );
}
export default LogInForm;