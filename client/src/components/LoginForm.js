import React, {useState, useEffect} from 'react';
import {loginFormSchema} from '../validation/schema';
import {validateForm,validateField} from '../validation/validationHelpers';
function LoginForm(props){
    // state variables
    const [isValid,setIsValid] = useState(true);
    // props variables
    const {formValues,setFormValue,formErrors,setFormErrors} = props;
    // useEffect
    useEffect(()=>{
        // validateForm whenever the component is mounted
        validateForm({loginFormSchema,formValues,setIsValid}); //check if form is valid using schema.validate
    },[]);
    // function declarations
    const handleChange=(event)=>{
        const {name,value} = event.target;
        validateField({loginFormSchema,name,value,formErrors,setFormErrors}); //validate changed field using yup.reach
        validateForm({loginFormSchema,formValues,setIsValid});
        setFormValue(name,value);
    };
    return(
        <div>
            <label>
                name
                <input type='text' value={formValues.name} onChange={handleChange}></input>
            </label>
            <label>
                email
                <input type='text' value={formValues.email} onChange={handleChange}></input>
            </label>
            <button disabled={!isValid}>Log In</button>
        </div>
    );
}
export default LoginForm;