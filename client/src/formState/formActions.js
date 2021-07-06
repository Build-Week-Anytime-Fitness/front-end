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
export const handleFormSubmit=(formValues,formName)=>async (dispatch,getState)=>{
    const state = getState();
    const {schema} = state[Object.keys(state).find((key)=>formName===state[key].name)];
    // validate the entire form
    schema.isValid(formValues)
    .then((isValid)=>{
        dispatch({type:FORM_IS_VALID_CHANGE,payload:isValid,name:formName});
        if(isValid){
            dispatch({type:FORM_IS_SUBMITTING_CHANGE,payload:true,name:formName});
        }
        else{
        }
    });

    // forloop to get the validate the fields sequentially
    const formErrors = {};
    for(let name in formValues){
        try{
            await yup.reach(schema,name).validate(formValues[name]);
            formErrors[name] = '';
        }
        catch(error){
            formErrors[name] = error.errors[0];
        }
    }
    dispatch({type:FORM_ERRORS_CHANGE,payload:formErrors,name:formName});


};
export const stopSubmitting=(formName)=>{
    return {type:FORM_IS_SUBMITTING_CHANGE,payload:false,name:formName};
}