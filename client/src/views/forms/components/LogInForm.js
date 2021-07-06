import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { loginFormSchema } from "../validation/schema";
import { displayErrors } from "../formHelpers";
import { connect } from "react-redux";
import { postLogIn } from "../../../userState/userActions";
import { INSTRUCTOR, STUDENT } from "../../../state/reducers/accountStatus";
import { handleFormChange, handleFormSubmit, initForm, stopSubmitting } from "../../../formState/formActions";
const initialValues = {
  email: "",
  password: "",
};

const LogInForm = (props) => {
  const history = useHistory();
  const {
    initForm, 
    accountStatus, 
    isValid,
    postLogIn, 
    isSubmitting, 
    formValues,
    handleFormSubmit,
    handleFormChange
  } = props;
  useEffect(()=>{
    // initialize form
    initForm();
  },[initForm])

  useEffect(()=>{
    // redirect after log in
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
    // the handleFormSubmit has run and isSubmitting changed to true
    if(isSubmitting){
      // post the login
      postLogIn(formValues)
    }
  },[isSubmitting,formValues,postLogIn]);

  return (
    <div className={"parallax-wrapper5"} style={{marginTop: '60vh'}}>
    <div className={"content1"}>
  <form className={"d-flex flex-column login-style"} onSubmit={handleFormSubmit}>
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
              onChange={handleFormChange}
            ></input>
          </label>
          <label>
            Password
            <input
              id="login-form-password-input"
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleFormChange}
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
            disabled={!isValid || props.isSubmitting}
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
    isValid: state.logInFormState.isValid
  };
};
const LOG_IN_FORM = "LOG_IN_FORM"; //this is the form name
const mapDispatchToProps = (dispatch) => {
  return {
    postLogIn: (formValues) => dispatch(postLogIn(formValues)),
    initForm: () => dispatch(initForm(loginFormSchema,initialValues,LOG_IN_FORM)),
    handleFormChange: (event)=> dispatch(handleFormChange(event.target,LOG_IN_FORM)),
    handleFormSubmit: (event)=> {
      event.preventDefault();
      dispatch(handleFormSubmit(LOG_IN_FORM));
    },
    stopSubmitting: ()=> dispatch(stopSubmitting(LOG_IN_FORM))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
