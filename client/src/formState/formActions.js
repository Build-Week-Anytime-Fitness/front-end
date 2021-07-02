import {
    HANDLE_FORM_CHANGE,
    HANDLE_FORM_SUBMIT,
} from '../state/actions/actionTypes';
export const handleFormChange=()=>{
    // async call to yup
    // payload:
    return{type:HANDLE_FORM_CHANGE};
};

export const handleFormSubmit=()=>{
    // async call to yup
    // payload: 
    return{type:HANDLE_FORM_SUBMIT};
};