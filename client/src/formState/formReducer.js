import {
    HANDLE_FORM_CHANGE,
    HANDLE_FORM_SUBMIT,
} from '../state/actions/actionTypes';
const formReducer=(state,action)=>{
    switch(action.type){
        case HANDLE_FORM_CHANGE:
            // payload: errors, isValid
            // update: errors, isValid
            return state;
        case HANDLE_FORM_SUBMIT:
            // payload: errors, isValid
            // update: isSubmitted, clear form values?
            return state;
        default:
            return state;
    }
};  
export default formReducer;