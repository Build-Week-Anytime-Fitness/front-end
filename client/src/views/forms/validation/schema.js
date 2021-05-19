import * as yup from 'yup';
export const loginFormSchema = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().required().min(6)
});
// ***
// uncomment when working on the correct feature branches
// ***
// const signUpFormSchema = yup.object().shape({
//     userName:yup.string().required(),
//     email:yup.email().required(),
//     password:yup.min(8,'password must have at least 8 characters').required(),
//     firstName:yup.string().required(),
//     lastName:yup.string().required(),
//     birthday:yup.date().required()
// });
// const classFormSchema = yup.object().shape({
//     name:yup.string().required(),
//     type:yup.string().required(),
//     startTime:yup.string().required(),
//     duration:yup.number().positive().required(),
//     intensityLevel:yup.string().required(),
//     location:yup.string().required(),
//     maxClassSize:yup.number().positive().integer().required()
// });