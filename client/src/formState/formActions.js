import {
    FORM_ERRORS_CHANGE,
    FORM_VALUE_CHANGE,
    FORM_IS_VALID_CHANGE,
    INIT_FORM,
    FORM_IS_SUBMITTING_CHANGE,
} from '../state/actions/actionTypes';
import * as yup from 'yup';
export const initForm=(schema,formValues,formName)=>{
    return {type:INIT_FORM,payload:{schema,formValues},name:formName};
};
export const handleFormChange=(target,formName)=>(dispatch,getState)=>{

    const {formValues,schema} = getState();
    const {name, value, checked, type} = target;
    const inputValue = type === 'checkbox' ? checked:value;
    const newFormValues = {...formValues, [name]: inputValue};

    // validate the entire new form
    schema.isValid(newFormValues)
    .then((isValid)=>{
        dispatch({type:FORM_IS_VALID_CHANGE,payload:isValid,name:formName});
    });

    // get field specific error
    yup.reach(schema,name)
    .validate(value)
    .then(()=>{
            dispatch({
                type:FORM_VALUE_CHANGE,payload:{
                    name,
                    value,
                    error:''
                },
                name:formName
            });
    })
    .catch((error)=>{
        dispatch({
            type:FORM_VALUE_CHANGE,payload:{
                name,
                value,
                error:error.errors[0]
            },
            name:formName
        });
    });

};
export const handleFormSubmit=(formName)=>async (dispatch,getState)=>{
    const {formValues,schema} = getState();

    // validate the entire form
    schema.isValid(formValues)
    .then((isValid)=>{
        dispatch({type:FORM_IS_VALID_CHANGE,payload:isValid,name:formName});
        if(isValid){
            dispatch({type:FORM_IS_SUBMITTING_CHANGE,payload:true,name:formName});
        }
    });

    // get all field specific errors
    const formErrors = await Object.keys(formValues).reduce(async (acc,name)=>{
        try{
            await yup.reach(schema,name).validate(formValues);
            acc[name] = '';
        }
        catch(error){
            acc[name] = error.errors[0];
        }
        return acc;
    } ,{});
    dispatch({type:FORM_ERRORS_CHANGE,payload:formErrors,name:formName});
};
export const stopSubmitting=(formName)=>{
    return {type:FORM_IS_SUBMITTING_CHANGE,payload:false,name:formName};
}