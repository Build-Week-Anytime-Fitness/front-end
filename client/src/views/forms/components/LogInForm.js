import React, { useState, useEffect } from "react";
import { loginFormSchema } from "../validation/schema";
import { validateForm, validateField } from "../validation/validationHelpers";
import { displayErrors, handleSubmitHelper } from "../formHelpers";
import { connect } from "react-redux";
import { checkUser } from "../../../state/actions/index";

const initialValues = {
  email: "test@email.com",
  password: "testing",
};

const initialErrorValues = Object.keys(initialValues).reduce((acc, key) => {
  acc[key] = "";
  return acc;
}, {});

const LogInForm = (props) => {
  // local state variables
  const [isValid, setIsValid] = useState(true); //local state not needed by redux. product checker
  const [formErrors, setFormErrors] = useState(initialErrorValues);

  //redux state
  //const [formValues, setFormValues] = useState(initialValues);
  console.log('form values from login form', props.formValues)

  // useEffect
  useEffect((props) => {
    // validateForm whenever the component is mounted
    validateForm(loginFormSchema, props.formValues, setIsValid); //check if form is valid using schema.validate
  }, []);

  //refactored handleChangeHelper
  const handleChangeHelper = ({
    event,
    schema,
    formValues,
    setFormValues,
    formErrors,
    setFormErrors,
    setIsValid,
  }) => {
    const { name, value, checked, type } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    const newFormValues = { ...formValues, [name]: inputValue };
    validateField(schema, name, inputValue, formErrors, setFormErrors); //validate changed field using yup.reach
    validateForm(schema, newFormValues, setIsValid);
    setFormValues(newFormValues);
    console.log("formValues", formValues, "newFormValues", newFormValues)
  };

  // function declarations
  const handleChange = (event) => {
    handleChangeHelper({
      event,
     // schema: loginFormSchema,
      //formValues,
    //   setFormValues,
      formErrors,
      setFormErrors,
      setIsValid,
    });
  };

  const handleSubmit = (event) => {
    handleSubmitHelper(event); //preventDefault only
    //dispatch CHECK_USER
    checkUser(props.formValues)
    console.log(props.formValues)
    //post submit which will be handled by redux dispatch which needs a new case in action and reducer of checkUser to verify credentials and receive JWT
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="text"
          name="email"
          value={props.formValues.email}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={props.formValues.password}
          onChange={handleChange}
        ></input>
      </label>
      <button type="submit" disabled={!isValid}>
        Log In
      </button>
      {displayErrors(formErrors)}
    </form>
  );
};

// state needed formValues,
// reducer/ action function checkUser

const mapStateToProps = (state) => {
  return {
    formValues: state.formValues, //credentials
    currentUser: state.currentUser
  };
};

const mapDispatchToProps= (dispatch) => {
  return {
    checkUser: dispatch(checkUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
