import {
    FORM_ERRORS_CHANGE,
    FORM_VALUE_CHANGE,
    FORM_IS_VALID_CHANGE,
    INIT_FORM
} from '../state/actions/actionTypes';

const initialState={
    schema:{},
    formValues:{},
    isValid:true,
    formErrors:{}
};

const formReducer=(state=initialState,action)=>{
    switch(action.type){
        case INIT_FORM:
            const {schema,formValues} = action.payload;
            return {
                ...state,
                schema,
                formValues,
                formErrors:Object.keys(formValues).reduce((acc,name)=>{
                    acc[name]='';
                    return acc
                },{})
            };
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