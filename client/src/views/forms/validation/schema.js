import * as yup from 'yup';
export const loginFormSchema = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().required().min(6)
});
// ***
// uncomment when working on the correct feature branches
// ***
export const signUpFormSchema = yup.object().shape({
    personName:yup.string().required(),
    email:yup.string().email('Invalid email').required(),
    isOverEighteen:yup.boolean().oneOf([true],'You have to be older than 18'),
    password:yup.string().min(8,'Password must have at least 8 characters').required(),
    isInstructor:yup.boolean()
});
// const classFormSchema = yup.object().shape({
//     name:yup.string().required(),
//     type:yup.string().required(),
//     startTime:yup.string().required(),
//     duration:yup.number().positive().required(),
//     intensityLevel:yup.string().required(),
//     location:yup.string().required(),
//     maxClassSize:yup.number().positive().integer().required()
// });