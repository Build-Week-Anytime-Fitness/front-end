import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { signUpFormSchema } from "../validation/schema";
import { validateForm } from "../validation/validationHelpers";
import { connect } from "react-redux";
import { addUser } from "../../../state/actions/index";
import {
  displayErrors,
  handleChangeHelper,
  handleSubmitHelper,
} from "../formHelpers"; //bread crumbs if we get lost

const initialValues = {
  name: "",
  email: "",
  password: "",
  isOverEighteen: false,
  is_instructor: false,
};

const initialErrorValues = Object.keys(initialValues).reduce((acc, key) => {
  acc[key] = "";
  return acc;
}, {});

function SignUpForm(props) {
  const history = useHistory();
  // state variables
  const [isValid, setIsValid] = useState(true);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrorValues);
  // useEffect
  useEffect(() => {
    // validateForm whenever the component is mounted
    validateForm(signUpFormSchema, formValues, setIsValid); //check if form is valid using schema.validate
  }, [formValues]);
  // function declarations
  const handleChange = (event) => {
    handleChangeHelper({
      event,
      schema: signUpFormSchema,
      formValues,
      setFormValues,
      formErrors,
      setFormErrors,
      setIsValid,
    });
  };
  const handleSubmit = (event) => {
    handleSubmitHelper(event);
    // console.log(
    //   "received form values in handle submit signup form",
    //   formValues
    // );
    props.addNewUser(formValues);
    history.push("/login");
  };
  return (
    <form
      className={
        "d-flex flex-column flex-wrap justify-content-center form-style"
      }
      style={{padding: '0 10vw'}}
      onSubmit={handleSubmit}
    >
      <div className={"d-flex flex-column justify-content-center input-style"}>
        <h2 style={{ color: "white" }}>Sign Up</h2>
        <label>
          Name:{" "}
          <input
            id="sign-up-form-name"
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Email:{" "}
          <input
            id="sign-up-form-email"
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          ></input>
        </label>
        <label style={{ fontSize: "0.9rem" }}>
          Password:
          <input
            id="sign-up-form-password"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Are you older than 18?
          <input
            id="sign-up-form-18-plus"
            type="checkbox"
            name="isOverEighteen"
            checked={formValues.isOverEighteen}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Are you an instructor?
          <input
            id="sign-up-form-instructor"
            type="checkbox"
            name="is_instructor"
            checked={formValues.is_instructor}
            onChange={handleChange}
          ></input>
        </label>
        <button id="sign-up-form-submit" type="submit" disabled={!isValid}>
          Sign Up
        </button>
        {displayErrors(formErrors)}{" "}
        <h5 style={{ marginTop: "3vh" }}>
          <em>
            Already have an account? <br />
          </em>
        </h5>{" "}
        <Link
          to="login"
          style={{
            marginBottom: "5vh",
            color: "#aaa",
            textDecoration: "none",
            fontSize: "1.5rem",
          }}
        >
          Login{" "}
        </Link>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewUser: (formValues) => dispatch(addUser(formValues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
