import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { loginFormSchema } from "../validation/schema";
import { validateForm } from "../validation/validationHelpers";
import {
  displayErrors,
  handleChangeHelper,
  handleSubmitHelper,
} from "../formHelpers";
import { connect } from "react-redux";
import { checkUser } from "../../../state/actions/index";

const initialValues = {
  email: "",
  password: "",
};

const initialErrorValues = Object.keys(initialValues).reduce((acc, key) => {
  acc[key] = "";
  return acc;
}, {});

const LogInForm = (props) => {
  const history = useHistory();
  // local state variables
  const [isValid, setIsValid] = useState(true); //local state not needed by redux. product checker
  const [formErrors, setFormErrors] = useState(initialErrorValues);

  //redux state
  const [formValues, setFormValues] = useState(initialValues);
  // console.log('form values from login form', formValues)

  // useEffect
  useEffect(() => {
    // validateForm whenever the component is mounted
    validateForm(loginFormSchema, formValues, setIsValid); //check if form is valid using schema.validate
  }, []);

  // function declarations
  const handleChange = (event) => {
    handleChangeHelper({
      event,
      schema: loginFormSchema,
      formValues,
      setFormValues,
      formErrors,
      setFormErrors,
      setIsValid,
    });
  };

  const handleSubmit = (event) => {
    //handleSubmitHelper(event); //preventDefault only
    event.preventDefault();
    // console.log("Check User dispatch should fire in LoginForm"); // api post in action
    // console.log("FormValues is captured: ", formValues);
    props.myCheckUser(formValues);

   //check state for instructor... user.isInstructor which gets pulled below from Redux state
    if (props.user.isInstructor === true) {
      history.push("/instructors");
    } else if (props.user.isInstructor === false) {
      history.push("./classes");
    }
  };

//   useEffect(() => {
    
//     // check state for instructor... user.isInstructor which gets pulled below from Redux state
//     console.group('useEffect started', props)
//     if (props.isLoading) {
//       console.log("first condition")
//       return;
//     }

//     if (props.user.isInstructor === true) {
//       console.log("move to instructor")
//      history.push('/instructors')
//    } else if (props.user.isInstructor === false) {
//      console.log('move to classes')
//      history.push('./classes')
//    }
//  }, [props.user] )

  return (
    <form className={"d-flex flex-column login-style"} onSubmit={handleSubmit}>
      <div className={"d-flex flex-column justify-content-center input-style"}>
        <h2 style={{ color: "white" }}>Login</h2>
        <div className={"d-flex flex-row flex-wrap justify-content-center"}>
          <label>
            Email
            <input
              id="login-form-email-input"
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            Password
            <input
              id="login-form-password-input"
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={"d-flex flex-column justify-content-center"} style={{marginTop: '5vh'}}>
        <button
          id="login-form-submit"
          type="submit"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Enter
        </button>
        {displayErrors(formErrors)}
        <h5>
          <em>
            Need to start an account? <br />
            <Link
              to="signup"
              style={{
                marginBottom: "15vh",
                color: "#AAA",
                textDecoration: "none",
              }}
            >
              Signup Today{" "}
            </Link>
          </em>
        </h5>
      </div>
      </div>
     
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    myCheckUser: (formValues, localState) => dispatch(checkUser(formValues, localState)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
