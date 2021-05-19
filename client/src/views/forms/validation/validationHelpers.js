import * as yup from 'yup';
export const validateForm=(schema,formValues,setIsValid)=>{
    schema.isValid(formValues)
    .then((valid)=>setIsValid(valid));
};
// yup reach validation function
export const validateField=(schema,name,value,formErrors,setFormErrors)=>{
    yup.reach(schema,name)
    .validate(value)
    .then(()=>setFormErrors({...formErrors,[name]:''}))
    .catch((error)=>setFormErrors({...formErrors,[name]:error.errors[0]}));
};