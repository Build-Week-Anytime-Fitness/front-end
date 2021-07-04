import {
    FORM_ERRORS_CHANGE,
    FORM_VALUE_CHANGE,
    FORM_IS_VALID_CHANGE,
    INIT_FORM
} from '../state/actions/actionTypes';

export const initFormSchema=(schema,formValues)=>{
    return {type:INIT_FORM,payload:{schema,formValues}};
};
export const handleFormChange=(event)=>(dispatch,getState)=>{

    const {formValues,schema} = getState();
    const {name, value, checked, type} = event.target;
    const inputValue = type === 'checkbox' ? checked:value;
    const newFormValues = {...formValues, [name]: inputValue};

    // validate the entire new form
    schema.isValid(newFormValues)
    .then((isValid)=>{
        dispatch({type:FORM_IS_VALID_CHANGE,payload:isValid});
    });

    // get field specific error
    yup.reach(schema,name)
    .validate(value)
    .then(()=>{
        dispatch({type:FORM_VALUE_CHANGE,payload:{
            name,
            value,
            error:''
        }});
    })
    .catch((error)=>{
        dispatch({type:FORM_VALUE_CHANGE,payload:{
            name,
            value,
            error:error.errors[0]
        }});

    });

};

export const handleFormSubmit= async (event)=>{
    event.preventDefault();
    const {formValues} = getState();

    // validate the entire form
    schema.isValid(newFormValues)
    .then((isValid)=>{
        dispatch({type:FORM_IS_VALID_CHANGE,payload:isValid});
    });

    // get all field specific errors
    const formErrors = Object.keys(formValues).reduce((acc,name)=>{
        try{
            await yup.reach(schema,name).validate(formValues);
            acc[name] = '';
        }
        catch(error){
            acc[name] = error.errors[0];
        }
        return acc;
    } ,{});
    dispatch({type:FORM_ERRORS_CHANGE,payload:formErrors});

};