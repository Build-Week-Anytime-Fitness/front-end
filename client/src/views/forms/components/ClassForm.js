import React, {useState, useEffect} from 'react';
import {classFormSchema} from '../validation/schema';
import {validateForm,validateField} from '../validation/validationHelpers';
function ClassForm(props){
    // state variables
    const [isValid,setIsValid] = useState(true);
    // props variables
    const {formValues,setFormValues,formErrors,setFormErrors,handleSubmit} = props;
    // useEffect
    useEffect(()=>{
        // validateForm whenever the component is mounted
        validateForm(classFormSchema,formValues,setIsValid); //check if form is valid using schema.validate
    },[]);
    // function declarations
    const handleChange=(event)=>{
        const {name,value,checked,type} = event.target;
        const inputValue = type==='checkbox'?checked:value;
        const newFormValues = {...formValues,[name]:inputValue};
        validateField(classFormSchema,name,inputValue,formErrors,setFormErrors); //validate changed field using yup.reach
        validateForm(classFormSchema,newFormValues,setIsValid);
        setFormValues(newFormValues);
    };
    const handleSubmitEvent=(event)=>{
        event.preventDefault();
        handleSubmit();
    };
    return(
        <form onSubmit={handleSubmitEvent}>
            <label>
                Class Name
                <input type='text' name='className' value={formValues.className} onChange={handleChange}></input>
            </label>
            <label>
                Class Type
                <input type='text' name='classType' value={formValues.classType} onChange={handleChange}></input>
            </label>
            <label>
                Class Date
                <select name='classDate' value={formValues.classDate} onChange={handleChange}>
                    <option value=''>--select--</option>
                    {
                        ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day,i)=><option value={day} key={i}>{day}</option>)
                    }
                </select>
            </label>
            <label>
                Start Time
                <input type='time' name='startTime' checked={formValues.startTime} onChange={handleChange}></input>
            </label>
            <label>
                Intensity
                <select name='intensity' value={formValues.intensity} onChange={handleChange}>
                    <option value=''>--select--</option>
                    {
                        ['Low','Medium','High'].map((val,i)=><option value={val} key={i}>{val}</option>)
                    }
                </select>
            </label>
            <label>
                Duration 
                <input type='number' name='duration' checked={formValues.duration} onChange={handleChange}></input>
            </label>
            <label>
                Location 
                <input type='text' name='location' checked={formValues.location} onChange={handleChange}></input>
            </label>
            <label>
                Maximum Class Size
                <input type='number' name='maxClassSize' checked={formValues.maxClassSize} onChange={handleChange}></input>
            </label>
            <button type='submit' disabled={!isValid}>Add/Edit Class</button>
            {
                Object.keys(formErrors).map((key,i)=>formErrors[key]===''?'':<div key={i}>{formErrors[key]}</div>)
            }
        </form>
    );
}
export default ClassForm;