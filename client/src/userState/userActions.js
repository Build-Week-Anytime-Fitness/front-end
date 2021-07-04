import {
    FETCHING_API_START,
    FETCHING_API_SUCCESS,
    FETCHING_API_FAILURE,
    CHECK_USER,
    CURRENT_USER,
    CHANGE_ACCOUNT_STATUS,
    INIT_ACCOUNT_STATUS
} from '../state/actions/actionTypes';

export const addUser = (addUser) => (dispatch) => {
    // console.log("9. new allUser from classes.js", addUser);
    dispatch({ type: FETCHING_API_START });
    
    axiosWithAuth()
      .post("/register", addUser)
      // or here
      .then((res) => {
        //console.log("ADD_USER response: ", res); // see sample POST login res below
        console.log("message: ", res.data.message);
        alert(res.data.message)
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
    //this action takes dispatch so that it can branch to 1+ reducer
    dispatch({ type: FETCHING_API_START, isLoading: true });
  
    axiosWithAuth()
      .post("/login", formValues)
      // or here
      .then((res) => {
        // console.log("response: ", res) // see sample POST login res below
        localStorage.setItem("authToken", res.data.token); // 200
        localStorage.setItem("id", res.data.id);
        alert(res.data.message);
       //console.log("message: ", res.data.message);
       dispatch({
         type: FETCHING_API_SUCCESS,
         isLoading: false,
         payload: res.data.message,
        });
  
        // res gives is_instructor, assign to user obj in reducer. Payload = isInstructor
        let isInstructor = res.data.is_instructor;
        dispatch({ type: CHECK_USER, payload: isInstructor });
  
        // res gives currentUserId, assign to currentUser obj in reducer. Payload = currentUserId
        let currentUserId = res.data.id;
        //console.log("user ID: ", res.data.id);
        localStorage.setItem("id", res.data.id)
        dispatch({ type: CURRENT_USER, payload: currentUserId });
      })
      .catch((error) => {
        dispatch({ type: FETCHING_API_FAILURE, payload: error });
        console.log("ERR_1: This error is from Login", error);
      });
  };
  export const changeAccountStatus = (newAccountStatus)=>{
    //the account types are student, instructor, logged out
    //they are located in accountStatus.js in the reducer file
    return {type: CHANGE_ACCOUNT_STATUS, payload:newAccountStatus};
  };
  export const initAccountStatus = ()=>{
    return {type:INIT_ACCOUNT_STATUS};
  };