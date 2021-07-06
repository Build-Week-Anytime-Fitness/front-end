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
// export const handleFormChange=({name, value, checked, type},formName)=>(dispatch,getState)=>{


//     dispatch({
//         type:FORM_VALUE_CHANGE,payload:{
//             name, value, checked, type
//         },
//         name:formName
//     });

    // // validate the entire new form
    // schema.isValid(newFormValues)
    // .then((isValid)=>{
    //     dispatch({type:FORM_IS_VALID_CHANGE,payload:isValid,name:formName});
    // });

    // // get field specific error
    // yup.reach(schema,name)
    // .validate(value)
    // .then(()=>{
    //         dispatch({
    //             type:FORM_VALUE_CHANGE,payload:{
    //                 name,
    //                 value,
    //                 error:''
    //             },
    //             name:formName
    //         });
    // })
    // .catch((error)=>{
    //     dispatch({
    //         type:FORM_VALUE_CHANGE,payload:{
    //             name,
    //             value,
    //             error:error.errors[0]
    //         },
    //         name:formName
    //     });
    // });

// };
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

    // get all field specific errors
    // const formErrors = await Object.keys(formValues).reduce(async (acc,name)=>{
    //     try{
    //         console.log('before',acc)
    //         await yup.reach(schema,name).validate(formValues[name]);
    //         acc[name] = '';
    //         console.log('after',acc)
    //     }
    //     catch(error){
    //         acc[name] = error.errors[0];
    //     }
    //     return acc;
    // } ,{});
    // console.log('form errors',formErrors)
    
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