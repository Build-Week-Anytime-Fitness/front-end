import React, {useState, useEffect} from 'react';
import {signUpFormSchema} from '../validation/schema';
import {validateForm,validateField} from '../validation/validationHelpers';
function LogInForm(props){
    // state variables
    const [isValid,setIsValid] = useState(true);
    // props variables
    const {formValues,setFormValues,formErrors,setFormErrors,handleSubmit} = props;
    // useEffect
    useEffect(()=>{
        // validateForm whenever the component is mounted
        validateForm(signUpFormSchema,formValues,setIsValid); //check if form is valid using schema.validate
    },[]);
    // function declarations
    const handleChange=(event)=>{
        const {name,value,checked,type} = event.target;
        console.log(checked);
        const inputValue = type==='checkbox'?checked:value;
        validateField(signUpFormSchema,name,inputValue,formErrors,setFormErrors); //validate changed field using yup.reach
        validateForm(signUpFormSchema,formValues,setIsValid);
        setFormValues({...formValues,[name]:inputValue});
    };
    const handleSubmitEvent=(event)=>{
        event.preventDefault();
        handleSubmit();
    };
    return(
        <form onSubmit={handleSubmitEvent}>
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
                <input type='checkbox' name='isOverEighteen' checked={formValues.isOverEighteen} onChange={handleChange}></input>
            </label>
            <label>
                Are you an instructor?
                <input type='checkbox' name='isInstructor' checked={formValues.isInstructor} onChange={handleChange}></input>
            </label>
            <button type='submit' disabled={!isValid}>Log In</button>
            {
                Object.keys(formErrors).map((key)=>formErrors[key]===''?'':<div>{formErrors[key]}</div>)
            }
        </form>
    );
}
export default LogInForm;