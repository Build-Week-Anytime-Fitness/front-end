import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { loginFormSchema } from "../validation/schema";
import { displayErrors } from "../formHelpers";
import { connect } from "react-redux";
import { postLogIn } from "../../../userState/userActions";
import { INSTRUCTOR, STUDENT } from "../../../state/reducers/accountStatus";
import { handleFormChange, handleFormSubmit, initForm } from "../../../formState/formActions";
const initialValues = {
  email: "",
  password: "",
};

const LogInForm = (props) => {
  const history = useHistory();
  
  useEffect(()=>{
    // initialize form
    props.initForm(loginFormSchema,initialValues);
  },[])

  useEffect(()=>{
    // redirect after log in
    if(props.accountStatus===STUDENT){
      history.push('/classes');
    }
    else if(props.acc===INSTRUCTOR){
      history.push('/instructors')
    }
    else{
      // if log in failed, reinitialize form with the current form values
      // form does not have errors at this stage
      props.initForm(loginFormSchema,props.formValues);
    }
  },[props.accountStatus]);

  useEffect(()=>{
    // the handleFormSubmit has run and isSubmitting changed to true
    if(props.isSubmitting){
      // post the login
      props.postLogIn(props.formValues)
    }
  },[props.isSubmitting]);

  return (
    <div className={"parallax-wrapper5"} style={{marginTop: '60vh'}}>
    <div className={"content1"}>
  <form className={"d-flex flex-column login-style"} onSubmit={props.handleFormSubmit}>
      <div className={"d-flex flex-column justify-content-center input-style"}>
        <h2 style={{ color: "white" }}>Login</h2>
        <div className={"d-flex flex-row flex-wrap justify-content-center"}>
          <label>
            Email
            <input
              id="login-form-email-input"
              type="text"
              name="email"
              value={props.formValues.email}
              onChange={props.handleFormChange}
            ></input>
          </label>
          <label>
            Password
            <input
              id="login-form-password-input"
              type="password"
              name="password"
              value={formValues.password}
              onChange={props.handleFormChange}
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

const mapDispatchToProps = (dispatch) => {
  return {
    postLogIn: (formValues) => dispatch(postLogIn(formValues)),
    initForm: (schema,formValues) => dispatch(initForm(schema,formValues)),
    handleFormChange: (event)=> dispatch(handleFormChange(event)),
    handleFormSubmit: (event)=> dispatch(handleFormSubmit(event))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
