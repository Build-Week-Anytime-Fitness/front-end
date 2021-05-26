//import axios from 'axios';
import axiosWithAuth from "../../utils/axiosWithAuth";

export const FETCHING_API_START = "FETCHING_API_LOADING";
export const FETCHING_API_SUCCESS = "FETCHING_API_SUCCESS";
export const FETCHING_API_FAILURE = "FETCHING_API_FAIL";
export const SEARCH_TERM = "SEARCH_TERM";
export const GET_FILTERED_CLASSES = "GET_FILTERED_CLASSES";
export const ALL_CLASSES = "ALL_CLASSES";
export const ADD_CLASS = "ADD_CLASS";
export const ADD_USER = "ADD_USER";
export const CHECK_USER = "CHECK_USER";
export const CURRENT_USER = "CURRENT_USER";
export const CLASS_TO_EDIT = "CLASS_TO_EDIT";
export const EDIT_MODE = "EDIT_MODE"
export const CLASS_TO_DELETE = "CLASS_TO_DELETE";
export const UPDATE_CLASSES_START = "UPDATE_CLASSES_START"
export const UPDATE_CLASSES_SUCCESS = "UPDATE_CLASSES_SUCCESS"
export const DELETE_CLASSES_START = "DELETE_CLASSES_START"
export const DELETE_CLASSES_SUCCESS = "DELETE_CLASSES_SUCCESS"
export const CLASSES_TO_SIGN_UP = "CLASS_TO_SIGN_UP";
export const UNDO_SIGN_UP = "UNDO_SIGN_UP";

//state related to getClasses API call
export const getData = (props) => (dispatch) => {
  //  console.log("7. props from  getData /actions", props)
  //props.isLoading = true

  // console.log("getData API call fires is loading True", props);
  dispatch({ type: FETCHING_API_START, isLoading: "true" });
  setTimeout(
  axiosWithAuth()
    .get("/classes")
    .then((res) => {
      dispatch({ type: ALL_CLASSES, payload: res.data });
      dispatch({ type: GET_FILTERED_CLASSES, payload: res.data });
      dispatch({
        type: FETCHING_API_SUCCESS,
        isLoading: "false",
        payload: res.data.results,
      });
      // console.log("getData API success is loading false ", props);
      //props.isLoading = false
    })
    .catch((error) => {
      dispatch({ type: FETCHING_API_FAILURE, payload: error });
      console.log("getData API request failed", error);
    }), 4000)
};


//state related to classes
export const searchTerm = (searchTerm) => {
  return { type: SEARCH_TERM, payload: searchTerm };
};

export const getFilteredClasses = (filteredClasses) => {
  // console.log("6. new filteredClasses from classes.js", filteredClasses);
  // console.log("GET_FILTERED_CLASSES action fires: log props: ", filteredClasses)
  return { type: GET_FILTERED_CLASSES, payload: filteredClasses };
};

export const allClasses = (allClasses) => {
  // console.log("7. new allClasses from classes.js", allClasses);
  return { type: ALL_CLASSES, payload: allClasses };
};

export const classToEdit = (indivClass) => {
  console.log("CLASS_TO_EDIT action fires: log props: ", indivClass)
  return { type: CLASS_TO_EDIT, payload: indivClass };
};

export const setEditMode = (isEditMode) => {
  console.log("EDIT_MODE ACTION FIRES IS EDIT MODE", isEditMode)
  return { type: EDIT_MODE, payload: isEditMode}
}

export const deleteClass = (indivClass) => {
  console.log("CLASS_TO_DELETE action fires: props: ", indivClass);
  return { type: CLASS_TO_DELETE, payload: indivClass }
}

export const classesToSignUp = (indivClass) => {
  console.log("CLASSES_TO_SIGN_UP action fires: log props: ", indivClass);
  return { type: CLASSES_TO_SIGN_UP, payload: indivClass };
};

export const undoSignUp = (indivClass) => {
  console.log("UNDO_SIGN_UP action fires: log props: ", indivClass);
  return { type: UNDO_SIGN_UP, payload: indivClass };
};


export const addClass = (addClass) => {
  console.log('8. new allClasses from classes.js', addClass)
    return { type: ADD_CLASS, payload: addClass}
}


export const addUser = (addUser) => (dispatch) => {
  // console.log("9. new allUser from classes.js", addUser);
  dispatch({ type: FETCHING_API_START });

  axiosWithAuth()

    .post("/register", addUser) 
    // or here
    .then((res) => {
      console.log("ADD_USER response: ", res); // see sample POST login res below
      // localStorage.setItem('authToken', res.data.token ) // 200
      console.log("message: ", res.data.message);
      dispatch({ type: FETCHING_API_SUCCESS, payload: res.data.message });

      // res gives is_instructor, assign to user obj in reducer. Payload = isInstructor
      let isInstructor = res.data.is_instructor;
      dispatch({ type: CHECK_USER, payload: isInstructor });

      // res gives currentUserId, assign to currentUser obj in reducer. Payload = currentUserId
      let currentUserId = res.data.id;
      dispatch({ type: CURRENT_USER, payload: currentUserId });
    })
    .catch((error) => {
      dispatch({ type: FETCHING_API_FAILURE, payload: error });
      console.log("ERR_1: This error is from Login", error);
    });
};

// {class_id: 3}

//state related to forms
export const checkUser = (formValues) => (dispatch) => {
  //this action takes dispatch so that it can branch to 1+ reducers
  // console.log("checkUser API call fires");
     console.log("checkUser Action: props", formValues);

  dispatch({ type: FETCHING_API_START, isLoading: true });

  axiosWithAuth()

    .post("/login", formValues)
    // or here
    .then((res) => {
      // console.log("response: ", res) // see sample POST login res below
      localStorage.setItem("authToken", res.data.token); // 200
      console.log("message: ", res.data.message);
      dispatch({ type: FETCHING_API_SUCCESS, isLoading: false, payload: res.data.message });

      // res gives is_instructor, assign to user obj in reducer. Payload = isInstructor
      let isInstructor = res.data.is_instructor;
      dispatch({ type: CHECK_USER, payload: isInstructor });

      // res gives currentUserId, assign to currentUser obj in reducer. Payload = currentUserId
      let currentUserId = res.data.id;
      console.log("user ID: ", res.data.id)
      dispatch({ type: CURRENT_USER, payload: currentUserId });
    })
    .catch((error) => {
      dispatch({ type: FETCHING_API_FAILURE, payload: error });
      console.log("ERR_1: This error is from Login", error);
    });
};

/* Sample data response for POST login

{"message":"welcome, The Hulk","id":3,"email":"th@marvel.org","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJlbWFpbCI6InRoQG1hcnZlbC5vcmciLCJpc19pbnN0cnVjdG9yIjpmYWxzZSwiaWF0IjoxNjIxODE3Mjg5LCJleHAiOjE2MjE5MDM2ODl9.8Pwy9pcCv5XX0G6NgZYEZ_msd66ghaxBwn_G7nGKweg","is_instructor":false}

*/
