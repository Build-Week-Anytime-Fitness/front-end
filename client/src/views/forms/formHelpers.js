import {validateForm, validateField} from './validation/validationHelpers';

export const displayErrors=(formErrors)=>{
    return Object.keys(formErrors).map((key, i) => formErrors[key] === '' ? '' : <div key={i}> {formErrors[key]} </div>);
};

export const handleChangeHelper=({event, schema, formValues, setFormValues, formErrors, setFormErrors, setIsValid})=>{
    const {name, value, checked, type} = event.target;
    const inputValue = type === 'checkbox' ? checked:value;
    const newFormValues = {...formValues, [name]: inputValue};
    validateField(schema,name, inputValue, formErrors, setFormErrors); //validate changed field using yup.reach
    validateForm(schema, newFormValues, setIsValid);
    setFormValues(newFormValues);
};



export const handleSubmitHelper = (event) => {
    event.preventDefault();
    // redux refactoring
};
