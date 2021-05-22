import axios from 'axios';
import axiosWithAuth from '../../utils/axiosWithAuth';

export const FETCHING_API_START = "FETCHING_API_LOADING";
export const FETCHING_API_SUCCESS = "FETCHING_API_SUCCESS";
export const FETCHING_API_FAILURE = "FETCHING_API_FAIL";
export const SEARCH_TERM = 'SEARCH_TERM';
export const GET_FILTERED_CLASSES = 'GET_FILTERED_CLASSES';
export const ALL_CLASSES = 'ALL_CLASSES';
export const ADD_CLASS = 'ADD_CLASS';
export const ADD_USER = 'ADD_USER';
export const CHECK_USER = 'CHECK_USER';
export const FORM_VALUES = 'FORM_VALUES';

//NOTE: add userState


//state related to api call

export const getData = (props) => (dispatch) => {
  console.log("7. props from  getData /actions", props)

    console.log('API call is going')
    dispatch({ type: FETCHING_API_START });
        axios
        .get("/friends")
        .then((res) => {
          dispatch({ type: FETCHING_API_SUCCESS, payload: res.data.results })
        })
        .catch((error) => {
          dispatch({ type: FETCHING_API_FAILURE, payload: error})
          console.log("This API request failed", error);
        });
}


//state related to classes
export const searchTerm = (searchTerm) => {
  console.log('5. new searchTerm from classes.js', searchTerm)
  return { type: SEARCH_TERM, payload: searchTerm}
}

export const getFilteredClasses = (filteredClasses) => {
    console.log('6. new filteredClasses from classes.js', filteredClasses)
    return { type: GET_FILTERED_CLASSES, payload: filteredClasses}
}

export const allClasses = (allClasses) => {
    console.log('7. new allClasses from classes.js', allClasses)
    return { type: ALL_CLASSES, payload: allClasses}
}

// export const addClass = (addClass) => {
//   console.log('8. new allClasses from classes.js', addClass)
//     return { type: ADD_CLASS, payload: addClass}
// }

// export const addUser = (addUser) => {
//   console.log('9. new allUser from classes.js', addUser)
//     return { type: ADD_USER, payload: addUser}
// }



//state related to forms
export const checkUser = (props) => (dispatch) => { //this action takes dispatch so that it can branch to two different reducers
  console.log("props from checkUser /actions", props)
    let currentUser = {}
    console.log('API call is going')
    dispatch({ type: FETCHING_API_START });
      // attempt code 3 times
      axiosWithAuth()
    // location might be here
      .post("/login", props.formValues)
      // or here
      .then(res => {
        console.log("res.data: ", res.data) // get back token, email, isInstructor value, success message
        localStorage.setItem('authToken', res.data.payload )
        dispatch({ type: FETCHING_API_SUCCESS, payload: res.data.results }) // might not be .results.  

        //also need to get user back from backend set userState to current user.  We might not get current user.  Why do we have a currentUser?
        currentUser = res.data.user
        dispatch({ type: CHECK_USER, payload: currentUser})

      })
      .catch(error => {
        dispatch({ type: FETCHING_API_FAILURE, payload: error})
        console.log('ERR_1: This error is from Login', error)
      })
    };

    export const formValues = (formValues) => {
      console.log('10. new formValues from classes.js', formValues)
      return { type: FORM_VALUES, payload: formValues}
    }


//add current user state


