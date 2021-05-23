import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import { loginFormSchema } from "../validation/schema";
import { validateForm } from "../validation/validationHelpers";
import { displayErrors, handleChangeHelper, handleSubmitHelper } from "../formHelpers";
import { connect } from "react-redux";
import { checkUser } from "../../../state/actions/index";

const initialValues = {
  email: "lambda@lambda.com",
  password: "school",
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
    //handleSubmitHelper(event); //preventDefault only
    event.preventDefault()
    //dispatch CHECK_USER
    console.log(checkUser(formValues)); // api post in action
    checkUser(formValues)
    console.log(formValues)

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
      <button type="submit" onClick={() => console.log('button pressed')} disabled={!isValid}>
        Log In
      </button>
      {displayErrors(formErrors)}
      <h6><em>Need to start an account? <br/>
            <Link to="signup" style={{ marginBottom: "15vh", color: '#2522CA', textDecoration: 'none' }}>
                Signup Today {" "}
              </Link></em></h6>
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
