import * as yup from 'yup';
const invalidEmail = 'Invalid email';
const isRequired=(name)=>`${name} is a required field`;
export const loginFormSchema = yup.object().shape({
    email:yup.string().email(invalidEmail).required(isRequired('Email')),
    password:yup.string().required(isRequired('Password'))
});
export const signUpFormSchema = yup.object().shape({
    name:yup.string().required(isRequired('Name')),
    email:yup.string().email(invalidEmail).required(isRequired('Email')),
    isOverEighteen:yup.boolean().oneOf([true],'You have to be older than 18'),
    password:yup.string().min(8,'Password must have at least 8 characters').required(isRequired('Password')),
    is_instructor:yup.boolean()
});
export const classFormSchema = yup.object().shape({
    class_name:yup.string().min(2,'Class name should have at least 2 characters').required(isRequired('Class name')),
    class_type:yup.string().required(isRequired('Class type')),
    class_date:yup.string().required(isRequired('Class date')),
    start_time:yup.string().required(isRequired('Start time')),
    duration:yup.number().moreThan(0.5,'Duration must be at leat 0.5 hour').required(isRequired('Duration')),
    intensity:yup.string().required(isRequired('Intensity')).oneOf(['low','medium','high'],'You must select an intensity'),
    location:yup.string().min(2,'Location must have at least 2 characters').required(isRequired('Location')),
    max_class_size:yup.number().moreThan(4,'Class size must be at least 5').integer().required(isRequired('CLass size'))
});