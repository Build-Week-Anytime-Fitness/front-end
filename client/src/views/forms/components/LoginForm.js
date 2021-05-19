import React, {useState, useEffect} from 'react';
import {loginFormSchema} from '../validation/schema';
import {validateForm,validateField} from '../validation/validationHelpers';
function LoginForm(props){
    // state variables
    const [isValid,setIsValid] = useState(true);
    // props variables
    const {formValues,setFormValues,formErrors,setFormErrors} = props;
    // useEffect
    useEffect(()=>{
        // validateForm whenever the component is mounted
        validateForm(loginFormSchema,formValues,setIsValid); //check if form is valid using schema.validate
    },[]);
    // function declarations
    const handleChange=(event)=>{
        const {name,value} = event.target;
        validateField(loginFormSchema,name,value,formErrors,setFormErrors); //validate changed field using yup.reach
        validateForm(loginFormSchema,formValues,setIsValid);
        setFormValues({...formValues,[name]:value});
    };
    return(
        <div>
            <label>
                email
                <input type='text' name='email' value={formValues.email} onChange={handleChange}></input>
            </label>
            <label>
                password
                <input type='text' name='password' value={formValues.password} onChange={handleChange}></input>
            </label>
            <button disabled={!isValid}>Log In</button>
        </div>
    );
}
export default LoginForm;