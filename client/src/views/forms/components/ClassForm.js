import React, { useState, useEffect } from "react";
import {
  displayErrors,
} from "../formHelpers"; //bread crumbs in case we get lost
import { connect } from "react-redux";
import {getData,setEditMode} from "../../../state/actions/index";

import { deleteClass, postClass, updateClass } from "../../../classesState/classesActions";
import { stopSubmitting } from "../../../formState/formActions";

const initialValues = {
  class_name: "",
  class_type: "",
  class_date: "",
  start_time: "",
  duration: "",
  intensity: "",
  location: "",
  max_class_size: "",
  instructor_id: 0,
};

const API_POST = "API_POST";
const API_PUT = "API_PUT";
const API_DELETE = "API_DELETE";

const ClassForm = (props) => {
  const [apiMode, setApiMode] = useState(API_POST);
  const [formValues, setFormValues] = useState(initialValues);
  const {
    initForm, 
    isSubmitting, 
    handleFormSubmit,
    formErrors,
    classToEdit
  } = props;
  useEffect(()=>{
    // initialize form
    initForm();
  },[initForm]);

  useEffect(()=>{
    // fater handleFormSubmit has run,
    // if there is no error in form, formReducer will set isSubmitting to true
    // this change will trigger this useEffect to run and post the login to the backend
    // this is done by calling the postLogin action in the userActions.js
    // if successful, it will change the accountStatus to either STUDENT or INSTRUCTOR

    // if isSubmitting is true, the 'Enter' button will be disable to prevent multiple log ins.
    if(isSubmitting){
        if(apiMode === API_POST){
            postClass(formValues);
        }
        else if(apiMode === API_PUT){
            updateClass(formValues,classToEdit.id);
        }
    }
    if(apiMode === API_DELETE){
        deleteClass(classToEdit.id);
    }
  },[isSubmitting,formValues,classToEdit,apiMode]);

  const handleChange=(e)=>{
    const {name, value, checked, type} = e.target;
    const inputValue = type === 'checkbox' ? checked:value;
    setFormValues({...formValues,[name]:inputValue});
  };
  const handleAdd = (e)=>{
    e.preventDefault();
    handleFormSubmit(formValues);
    setApiMode(API_POST);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    handleFormSubmit(formValues);
    setApiMode(API_PUT);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    setApiMode(API_DELETE);
  };

  useEffect(() => {
    //console.log("props.classToEdit from useEffect", props.classToEdit);
    if (props.isEditMode && props.classToEdit) {
      setFormValues(props.classToEdit);
    } else if (!props.isEditMode && !props.classToEdit) {
      setFormValues(initialValues);
    }
  }, [props.isEditMode, props.classToEdit]);

  return (
    <form
      className={"d-flex flex-column justify-content-center form-style-two"}
      style={{
        textAlign: "center",
        backgroundColor: "#444",
        width: "100vw",
        opacity: "0.8",
        padding: '8vh 0'
      }}
      onSubmit={(e)=>e.preventDefault()}
    >
      <h2>{!props.isEditMode ? "Add a Class" : "Update or Delete"}</h2>
      <label>
        Class Name
        <input
          id="class-form-class-name"
          type="text"
          name="class_name"
          value={formValues.class_name}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Class Type
        <input
          id="class-form-class-type"
          type="text"
          name="class_type"
          value={formValues.class_type}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Class Date
        <input
          id="class-form-class-date"
          type="text"
          name="class_date"
          value={formValues.class_date}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Start Time
        <input
          id="class-form-start-time"
          type="time"
          name="start_time"
          value={formValues.start_time}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Intensity
        <select
          id="class-form-intensity"
          name="intensity"
          value={formValues.intensity}
          onChange={handleChange}
          style={{ margin: "2vh 3vw", fontSize: "1.25rem" }}
        >
          <option value="">--select--</option>
          {["low", "medium", "high"].map((val, i) => (
            <option value={val} key={i}>
              {val}
            </option>
          ))}
        </select>
      </label>
      <label>
        Duration
        <input
          id="class-form-duration"
          type="number"
          name="duration"
          value={formValues.duration}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Location
        <input
          id="class-form-location"
          type="text"
          name="location"
          value={formValues.location}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Max Class:
        <input
          id="class-form-max-class-size"
          type="number"
          name="max_class_size"
          value={formValues.max_class_size}
          onChange={handleChange}
        ></input>
      </label>
      {!props.isEditMode ? (
        <button
          id="class-form-submit"
          type="submit"
          disabled={!isSubmitting}
          onClick={handleAdd}
          style={{
            width: "250px",
            alignSelf: "center",
            margin: "5vh 0",
            borderRadius: "50px",
            fontSize: "1.5rem",
            border: "1px solid #222",
          }}
        >
          Add Class
        </button>
      ) : (
        <React.Fragment>
          <button
            id="class-form-update"
            type="submit"
            disabled={!isSubmitting}
            onClick={handleUpdate}
            style={{
              width: "250px",
              alignSelf: "center",
              margin: "5vh 0",
              borderRadius: "50px",
              fontSize: "1.5rem",
              border: "1px solid #222",
            }}
          >
            Update Class
          </button>
          <button
            id="class-form-delete"
            type="submit"
            disabled={!apiMode===API_DELETE}
            onClick={handleDelete}
            style={{
              width: "250px",
              alignSelf: "center",
              margin: "5vh 0",
              borderRadius: "50px",
              fontSize: "1.5rem",
              border: "1px solid #222",
              backgroundColor: "red",
              color: "white",
            }}
          >
            Delete Class
          </button>
        </React.Fragment>
      )}
      {displayErrors(formErrors)}
    </form>
  );
};

// const {
//   id,
//   initForm, 
//   accountStatus, 
//   isSubmitting, 
//   handleFormSubmit,
// } = props;

const mapStateToProps = (state) => {
  return {
    accountStatus: state.formState.accountStatus,
    isSubmitting: state.isSubmitting.isSubmitting,
    formErrors: state.formState.formErrors,
    classToEdit: state.classToEdit, // when user clicks edit button on class, Redux state saves indivClass object
    isEditMode: state.isEditMode,
    indivClass: state.indivClass,
    currentUser: state.currentUser,
    currentUserId: state.currentUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEditMode: (isEditMode) => dispatch(setEditMode(isEditMode)),
    getData: () => dispatch(getData()),
    stopSubmitting: ()=> dispatch(stopSubmitting())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassForm);
