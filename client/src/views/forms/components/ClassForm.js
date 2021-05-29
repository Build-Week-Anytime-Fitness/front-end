import React, { useState, useEffect } from "react";
import { classFormSchema } from "../validation/schema";
import { validateForm } from "../validation/validationHelpers";
import {
  displayErrors,
  handleChangeHelper,
  handleSubmitHelper,
} from "../formHelpers"; //bread crumbs in case we get lost
import axiosWithAuth from "../../../utils/axiosWithAuth";
import { connect, useDispatch } from "react-redux";
import {
  getData,
  FETCHING_API_START,
  FETCHING_API_SUCCESS,
  FETCHING_API_FAILURE,
  setEditMode,
} from "../../../state/actions/index.js";

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

const initialErrorValues = Object.keys(initialValues).reduce((acc, key) => {
  acc[key] = "";
  return acc;
}, {});

const ClassForm = (props) => {
  // state variables
  const [isValid, setIsValid] = useState(true);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrorValues);
  const dispatch = useDispatch();

  let localId = localStorage.getItem("id");
  formValues.instructor_id = Number(localId);

  // useEffect
  useEffect(() => {
    // validateForm whenever the component is mounted
    validateForm(classFormSchema, formValues, setIsValid); //check if form is valid using schema.validate
  }, [formValues]);

  useEffect(() => {
    //console.log("props.classToEdit from useEffect", props.classToEdit);
    if (props.isEditMode && props.classToEdit) {
      setFormValues(props.classToEdit);
    } else if (!props.isEditMode && !props.classToEdit) {
      setFormValues(initialValues);
    }
  }, [props.isEditMode, props.classToEdit]);

  useEffect(() => {});

  // function declarations
  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });

    handleChangeHelper({
      event,
      schema: classFormSchema,
      formValues,
      setFormValues,
      formErrors,
      setFormErrors,
      setIsValid,
    });
  };

  const handleSubmit = (event) => {
    handleSubmitHelper(event);

    const currUser = localStorage.getItem("id");
    formValues.instructor_id = Number(currUser);
    //console.log("Add class submit fired from ClassForm", formValues);
    dispatch({ type: FETCHING_API_START, isLoading: true });
    axiosWithAuth()
      .post("/classes", formValues)
      // or here
      .then((res) => {
        //console.log("response: ", res); // see sample POST login res below
        //console.log("message: ", res.data.message);
        setFormValues(initialValues);
        dispatch({
          type: FETCHING_API_SUCCESS,
          isLoading: false,
          payload: res.data.message,
        });
        setFormValues(initialValues);
        window.location.reload();
      })
      .catch((error) => {
        dispatch({ type: FETCHING_API_FAILURE, payload: error });
        console.log("ERR_1: This error is from Login", { error });
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const currUser = localStorage.getItem("id");
    formValues.instructor_id = Number(currUser);
    dispatch({ type: FETCHING_API_START, isLoading: true });
    axiosWithAuth()
      .put(`/classes/${props.classToEdit.id}`, formValues)
      // or here
      .then((res) => {
        //console.log("response: ", res); // see sample POST login res below
        //console.log("message: ", res.data.message);
        dispatch({
          type: FETCHING_API_SUCCESS,
          isLoading: false,
          payload: res.data.message,
        });
        setFormValues(initialValues);
        alert(res.data.message);
        props.mySetEditMode(false);
        window.location.reload();
      })
      .catch((error) => {
        dispatch({ type: FETCHING_API_FAILURE, payload: error });
        //const message = error.response.data.message
        // alert(message)
        console.log("ERR_1: This error is from Login", { error });
      });
  };

  const handleDelete = (e) => {
    //e.preventDefault();
    console.log(
      "Delete a class fired from classForm DATA: ",
      props.classToEdit.id
    );
    dispatch({ type: FETCHING_API_START, isLoading: true });
    axiosWithAuth()
      .delete(`/classes/${props.classToEdit.id}`)
      // or here
      .then((res) => {
        //console.log("response: ", res); // see sample POST login res below
        //console.log("message: ", res.data.message);
        dispatch({
          type: FETCHING_API_SUCCESS,
          isLoading: false,
          payload: res.data.message,
        });
        alert(res.data.message);
        setFormValues(initialValues);
        props.mySetEditMode(false);
      })
      .catch((error) => {
        dispatch({ type: FETCHING_API_FAILURE, payload: error });
        console.log("ERR_1: This error is from Login", { error });
      });
  };

  return (
    <form
      className={"d-flex flex-column justify-content-center form-style-two"}
      style={{ textAlign: "center" }}
      onSubmit={handleSubmit}
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
          disabled={!isValid}
          onClick={handleSubmit}
        >
          Add Class
        </button>
      ) : (
        <React.Fragment>
          <button
            id="class-form-update"
            type="submit"
            disabled={!isValid}
            onClick={handleUpdate}
          >
            Update Class
          </button>
          <button
            id="class-form-delete"
            type="submit"
            disabled={!isValid}
            onClick={handleDelete}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete Class
          </button>
        </React.Fragment>
      )}
      {displayErrors(formErrors)}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    classToEdit: state.classToEdit, // when user clicks edit button on class, Redux state saves indivClass object
    isEditMode: state.isEditMode,
    indivClass: state.indivClass,
    currentUser: state.currentUser,
    currentUserId: state.currentUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // myCheckUser: (formValues) => dispatch(checkUser(formValues)), // SAMPLE CODE
    mySetEditMode: (isEditMode) => dispatch(setEditMode(isEditMode)),
    myGetData: () => dispatch(getData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassForm);
