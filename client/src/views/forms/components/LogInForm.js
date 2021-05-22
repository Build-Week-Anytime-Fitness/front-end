import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom'
import { loginFormSchema } from "../validation/schema";
import { validateForm } from "../validation/validationHelpers";
import { displayErrors, handleChangeHelper, handleSubmitHelper } from "../formHelpers";
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
    const history = useHistory()
  // local state variables
  const [isValid, setIsValid] = useState(true); //local state not needed by redux. product checker
  const [formErrors, setFormErrors] = useState(initialErrorValues);

  //redux state
  const [formValues, setFormValues] = useState(initialValues);
  console.log('form values from login form', formValues)

  // useEffect
  useEffect(() => {
    // validateForm whenever the component is mounted
    validateForm(loginFormSchema, formValues, setIsValid); //check if form is valid using schema.validate
  }, []);

  // function declarations
  const handleChange=(event)=>{
    handleChangeHelper({
        event,
        schema:loginFormSchema,
        formValues,
        setFormValues,
        formErrors,
        setFormErrors,
        setIsValid
    });
};

  const handleSubmit = (event) => {
    handleSubmitHelper(event); //preventDefault only
    
    //dispatch CHECK_USER
    checkUser(props.formValues); // api post in action

    // check state for instructor... user.isInstructor which gets pulled below from Redux state
    if (props.user.isInstructor === true) {
      history.push('/instructors')
    } else if (props.user.isInstructor === false) {
      history.push('./classes')
    }

    // console.log(props.formValues)

  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="text"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={formValues.password}
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
    //formValues: state.formValues, //credentials
    currentUser: state.currentUser,
    user: state.user,
  };
};

const mapDispatchToProps= (dispatch) => {
  return {
    checkUser: dispatch(checkUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
