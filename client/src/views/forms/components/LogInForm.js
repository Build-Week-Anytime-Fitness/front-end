import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { loginFormSchema } from "../validation/schema";
import { validateForm } from "../validation/validationHelpers";
import { displayErrors, handleChangeHelper } from "../formHelpers";
import { connect, useDispatch } from "react-redux";
import { checkUser } from "../../../state/actions/index";
import axiosWithAuth from "../../../utils/axiosWithAuth";
import {
  FETCHING_API_START,
  FETCHING_API_SUCCESS,
  FETCHING_API_FAILURE,
  CURRENT_USER,
} from "../../../state/actions/index";

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
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    // validateForm whenever the component is mounted
    validateForm(loginFormSchema, formValues, setIsValid); //check if form is valid using schema.validate
  }, [formValues]);

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
    event.preventDefault();
    //console.log("FormValues is captured: ", formValues);
    dispatch({ type: FETCHING_API_START, isLoading: true });
    axiosWithAuth()
      .post("/login", formValues)
      .then((res) => {
        //console.log("response: ", res); // see sample POST login res below
        localStorage.setItem("authToken", res.data.token); // 200
        alert(res.data.message);
        dispatch({
          type: FETCHING_API_SUCCESS,
          isLoading: false,
          payload: res.data.message,
        });

        // res gives currentUserId, assign to currentUser obj in reducer. Payload = currentUserId
        let currentUserId = res.data.id;
        localStorage.setItem("id", res.data.id);
        dispatch({ type: CURRENT_USER, payload: currentUserId });
        res.data.is_instructor !== true
          ? history.push("./classes")
          : history.push("/instructors");
      })
      .catch((error) => {
        dispatch({ type: FETCHING_API_FAILURE, payload: error });
        console.log("ERR_1: This error is from Login", error);
      });
  };

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
        <div
          className={"d-flex flex-column justify-content-center"}
          style={{ marginTop: "5vh" }}
        >
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
    myCheckUser: (formValues) => dispatch(checkUser(formValues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
