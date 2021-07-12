import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { loginFormSchema } from "../validation/schema";
import { displayErrors } from "../formHelpers";
import { connect } from "react-redux";
import { postLogIn } from "../../../userState/userActions";
import { INSTRUCTOR, STUDENT } from "../../../state/reducers/accountStatus";
import {  handleFormSubmit, initForm, stopSubmitting } from "../../../formState/formActions";
import { LOG_IN_FORM } from "../../../formState/formNames";
const initialValues = {
  email: "",
  password: "",
};

const LogInForm = (props) => {
  const history = useHistory();
  const {
    initForm, 
    accountStatus, 
    postLogIn, 
    isSubmitting, 
    handleFormSubmit,
  } = props;
  const [formValues, setFormValues] = useState(initialValues);
  useEffect(()=>{
    // initialize form
    initForm();
  },[initForm])

  useEffect(()=>{
    // if the api call is successful, the accountStatus will be updated
    // a change in accountStatus will trigger this useEffect
    // redirect based on the accountStatus
    if(accountStatus===STUDENT){
      history.push('/classes');
    }
    else if(accountStatus===INSTRUCTOR){
      history.push('/instructors')
    }
    else{
      stopSubmitting()
    }
  },[accountStatus, history]);

  useEffect(()=>{
    // fater handleFormSubmit has run,
    // if there is no error in form, formReducer will set isSubmitting to true
    // this change will trigger this useEffect to run and post the login to the backend
    // this is done by calling the postLogin action in the userActions.js
    // if successful, it will change the accountStatus to either STUDENT or INSTRUCTOR

    // if isSubmitting is true, the 'Enter' button will be disable to prevent multiple log ins.
    if(isSubmitting){
      // post the login
      console.log('isSubmitting')
      postLogIn(formValues)
    }
  },[isSubmitting,formValues,postLogIn]);
  const handleChange=(e)=>{
    const {name, value, checked, type} = e.target;
    const inputValue = type === 'checkbox' ? checked:value;
    setFormValues({...formValues,[name]:inputValue});
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    handleFormSubmit(formValues);
  };
  return (
    <div className={"parallax-wrapper5"} style={{marginTop: '60vh'}}>
    <div className={"content1"}>
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
              value={formValues.email} //this input is uncontrolled
              onChange={handleChange}
            ></input>
          </label>
          <label>
            Password
            <input
              id="login-form-password-input"
              type="password"
              name="password"
              defaultValue={formValues.password} //this input is uncontrolled
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
            disabled={isSubmitting}
            style={{width: '250px', alignSelf: 'center', padding: '1vh 3vw', borderRadius: '50px', marginBottom: '3vh'}}
          >
            {props.isSubmitting? '...submitting': 'Enter'}
          </button>
          {displayErrors(props.formErrors)}
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
    </div>
</div>
  
  );
};

const mapStateToProps = (state) => {
  return {
    accountStatus: state.userState.accountStatus,
    isSubmitting: state.logInFormState.isSubmitting,
    formValues: state.logInFormState.formValues,
    formErrors: state.logInFormState.formErrors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postLogIn: (formValues) => dispatch(postLogIn(formValues)),
    initForm: () => dispatch(initForm(loginFormSchema,initialValues,LOG_IN_FORM)),
    handleFormSubmit: (formValues)=>dispatch(handleFormSubmit(formValues,LOG_IN_FORM)),
    stopSubmitting: ()=> dispatch(stopSubmitting(LOG_IN_FORM))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
