import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signUpFormSchema } from "../validation/schema";
import { validateForm } from "../validation/validationHelpers";
import {
  displayErrors,
  handleChangeHelper,
  handleSubmitHelper,
} from "../formHelpers"; //bread crumbs if we get lost
const initialValues = {
  personName: "",
  email: "",
  isOverEighteen: false,
  password: "",
  isInstructor: false,
};
const initialErrorValues = Object.keys(initialValues).reduce((acc, key) => {
  acc[key] = "";
  return acc;
}, {});
function LogInForm() {
  // state variables
  //need to rename formValues to signUpFormValues
  const [isValid, setIsValid] = useState(true);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrorValues);
  // useEffect
  useEffect(() => {
    // validateForm whenever the component is mounted
    validateForm(signUpFormSchema, formValues, setIsValid); //check if form is valid using schema.validate
  }, []);
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
  };
  return (
    <form
      className={
        "d-flex flex-column flex-wrap justify-content-center form-style"
      }
      onSubmit={handleSubmit}
    >
      <div className={"d-flex flex-column justify-content-center input-style"}>
        <label>
          Name:{" "}
          <input
          id='sign-up-form-name'
            type="text"
            name="personName"
            value={formValues.personName}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Email:{" "}
          <input
          id='sign-up-form-email'
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          ></input>
        </label>
        <label style={{ fontSize: "0.9rem" }}>
          Password:
          <input
          id='sign-up-form-password'
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Are you older than 18?
          <input
          id='sign-up-form-18-plus'
            type="checkbox"
            name="isOverEighteen"
            checked={formValues.isOverEighteen}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Are you an instructor?
          <input
          id='sign-up-form-instructor'
            type="checkbox"
            name="isInstructor"
            checked={formValues.isInstructor}
            onChange={handleChange}
          ></input>
        </label>
        <button id='sign-up-form-submit' type="submit" disabled={!isValid}>
          Sign Up
        </button>
        {displayErrors(formErrors)}{" "}
        <h6 style={{marginTop: '3vh'}}>
          <em>
            Already have an account? <br />
          </em>
        </h6>{" "}
        <Link
          to="login"
          style={{
            marginBottom: "5vh",
            color: "#aaa",
            textDecoration: "none",
          }}
        >
          Login{" "}
        </Link>
      </div>
    </form>
  );
}
export default LogInForm;
