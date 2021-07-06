import {
    FORM_ERRORS_CHANGE,
    FORM_VALUE_CHANGE,
    FORM_IS_VALID_CHANGE,
    INIT_FORM,
    FORM_IS_SUBMITTING_CHANGE
} from '../state/actions/actionTypes';

const formReducerCreator=(formName)=>{
    const initialState={
        name:formName,
        schema:{},
        formValues:{},
        isValid:true,
        formErrors:{},
        isSubmitting:false
    };
    const formReducer=(state=initialState,action)=>{
        // State refers to this local formReducer state not the global rootReducer state
        // This is different from mapStateToProps and mapDispatchToProps. They use the rootReducer state instead.
        if(action.name!==state.name){
            // make sure formName matches
            return state;
        }
        console.log(action.name!==state.formName,action.type!==INIT_FORM,'formName: ',state.name,'action: ',action,'starting state: ',state,'payload: ',action.payload);
        switch(action.type){
            case FORM_IS_SUBMITTING_CHANGE:{
                const isSubmitting = action.payload;
                console.log('FORM_IS_SUBMITTING_CHANGE',action.payload);
                return {
                    ...state,
                    isSubmitting
                }
            }
            case INIT_FORM:{
                const {schema,formValues} = action.payload;
                console.log('init form reducer is run',formName,action);
                return {
                    ...initialState,
                    schema,
                    formValues,
                    formErrors:Object.keys(formValues).reduce((acc,name)=>{
                        acc[name]='';
                        return acc
                    },{})
                };
            }
            case FORM_ERRORS_CHANGE:{
                const formErrors = action.payload;
                return {
                    ...state,
                    formErrors
                };
            }
            case FORM_VALUE_CHANGE:{
                const {name, value, checked, type} = action.payload;
                const inputValue = type === 'checkbox' ? checked:value;
                return {
                    ...state,
                    formValues:{
                        ...state.formValues,
                        [name]:inputValue,
                    },
                    formErrors:{
                        ...state.formErrors,
                        [name]:''
                    }
                };
            }
            case FORM_IS_VALID_CHANGE:{
                const isValid = action.payload;
                return {
                    ...state,
                    isValid
                };
            }

            default:{
                return state;
            }
        }
    };  
    return formReducer;
}
export default formReducerCreator;