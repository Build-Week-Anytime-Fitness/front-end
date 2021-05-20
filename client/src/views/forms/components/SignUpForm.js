import React, {useState, useEffect} from 'react';
import {signUpFormSchema} from '../validation/schema';
import {validateForm,validateField} from '../validation/validationHelpers';
function LogInForm(props){
    // state variables
    const [isValid,setIsValid] = useState(true);
    // props variables
    const {formValues,setFormValues,formErrors,setFormErrors} = props;
    // useEffect
    useEffect(()=>{
        // validateForm whenever the component is mounted
        validateForm(signUpFormSchema,formValues,setIsValid); //check if form is valid using schema.validate
    },[]);
    // function declarations
    const handleChange=(event)=>{
        const {name,value,checked,type} = event.target;
        const inputValue = type==='checkbox'?checked:value;
        validateField(signUpFormSchema,name,inputValue,formErrors,setFormErrors); //validate changed field using yup.reach
        validateForm(signUpFormSchema,formValues,setIsValid);
        setFormValues({...formValues,[name]:inputValue});
    };
    return(
        <div>
            <label>
                Name
                <input type='text' name='personName' value={formValues.personName} onChange={handleChange}></input>
            </label>
            <label>
                Email
                <input type='text' name='email' value={formValues.email} onChange={handleChange}></input>
            </label>
            <label>
                password
                <input type='password' name='password' value={formValues.password} onChange={handleChange}></input>
            </label>
            <label>
                Are you older than 18?
                <input type='checkbox' name='isOverEighteen' value={formValues.isOverEighteen} onChange={handleChange}></input>
            </label>
            <label>
                Are you an instructor?
                <input type='checkbox' name='isInstructor' value={formValues.isInstructor} onChange={handleChange}></input>
            </label>
            <button disabled={!isValid}>Log In</button>
            {
                Object.keys(formErrors).map((key)=>formErrors[key]===''?'':<div>{formErrors[key]}</div>)
            }
        </div>
    );
}
export default LogInForm;