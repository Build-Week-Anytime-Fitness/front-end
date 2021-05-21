import * as yup from 'yup';
export const loginFormSchema = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().required().min(6)
});
export const signUpFormSchema = yup.object().shape({
    personName:yup.string().required(),
    email:yup.string().email('Invalid email').required(),
    isOverEighteen:yup.boolean().oneOf([true],'You have to be older than 18'),
    password:yup.string().min(8,'Password must have at least 8 characters').required(),
    isInstructor:yup.boolean()
});
export const classFormSchema = yup.object().shape({
    className:yup.string().min(2).required(),
    classType:yup.string().required(),
    classDate:yup.string().required(),
    startTime:yup.string().required(),
    duration:yup.number().moreThan(0.5).required(),
    intensity:yup.string().required().oneOf(['low','medium','high']),
    location:yup.string().required(),
    maxClassSize:yup.number().moreThan(5).integer().required()
});