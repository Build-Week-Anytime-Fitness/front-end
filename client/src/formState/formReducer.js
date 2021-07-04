import {
    FORM_ERRORS_CHANGE,
    FORM_VALUE_CHANGE,
    FORM_IS_VALID_CHANGE
} from '../state/actions/actionTypes';

const initialState={
    schema,
    formValues,
    isValid,
    formErrors
};

const formReducer=(state=initialState,action)=>{
    switch(action.type){
        case FORM_ERRORS_CHANGE:
            const formErrors = action.payload;
            return {
                ...state,
                formErrors
            };
        case FORM_VALUE_CHANGE:
            const {name,value,error} = action.payload;
            return {
                ...state,
                formValues:{
                    ...state.formValues,
                    [name]:value,
                },
                formErrors:{
                    ...state.formErrors,
                    [name]:error
                }
            };
        case FORM_IS_VALID_CHANGE:
            const isValid = action.payload;
            return {
                ...state,
                isValid
            };
        default:
            return state;
    }
};  
export default formReducer;