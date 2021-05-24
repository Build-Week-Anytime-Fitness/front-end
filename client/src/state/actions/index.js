//import axios from 'axios';
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
export const CURRENT_USER = 'CURRENT_USER';


//state related to api call
export const getData = (props) => (dispatch) => {
  console.log("7. props from  getData /actions", props)

    console.log('getData API call fires')
    dispatch({ type: FETCHING_API_START });
        axiosWithAuth()
        .get("https://amazing-fitness-app.herokuapp.com/api/classes")
        .then((res) => {
          console.log("response after API get /classes: ", res)
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
export const checkUser = (formValues) => (dispatch) =>   { //this action takes dispatch so that it can branch to 1+ reducers
  console.log('checkUser API call fires')
  console.log("props from checkUser /actions", formValues)

    dispatch({ type: FETCHING_API_START });
      // attempt code 3 times
      axiosWithAuth()
    // location might be here
      .post("/login", formValues)
      // or here
      .then(res => {
        console.log("response: ", res) // see sample POST login res below
        localStorage.setItem('authToken', res.data.token )
        console.log("token", res.data.token)
        dispatch({ type: FETCHING_API_SUCCESS, payload: res.data.results }) // might not be .results.  
    
        // res gives currentUserId, assign to currentUser obj in reducer. Payload = currentUserId
        let currentUserId = res.data.id  
        dispatch({ type: CHECK_USER, payload: currentUserId})

      })
      .catch(error => {
        dispatch({ type: FETCHING_API_FAILURE, payload: error})
        console.log('ERR_1: This error is from Login', error)
      })
    };



/* Sample data response for POST login

{"message":"welcome, The Hulk","id":3,"email":"th@marvel.org","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJlbWFpbCI6InRoQG1hcnZlbC5vcmciLCJpc19pbnN0cnVjdG9yIjpmYWxzZSwiaWF0IjoxNjIxODE3Mjg5LCJleHAiOjE2MjE5MDM2ODl9.8Pwy9pcCv5XX0G6NgZYEZ_msd66ghaxBwn_G7nGKweg","is_instructor":false}

*/
