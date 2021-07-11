import {
    FETCHING_API_START,
    FETCHING_API_SUCCESS,
    FETCHING_API_FAILURE,
    CHECK_USER,
    CURRENT_USER,
    CHANGE_ACCOUNT_STATUS,
    INIT_ACCOUNT_STATUS,
    USER_LOGGED_IN,
    USER_SIGNED_UP
} from '../state/actions/actionTypes';
import axiosWithAuth from '../utils/axiosWithAuth';
import { INSTRUCTOR, SIGNED_UP, STUDENT } from './accountStatus';
const LOCAL_ACCOUNT_STATUS = "LOCAL_ACCOUNT_STATUS";
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
  export const postLogIn=(formValues)=>(dispatch)=>{
    // explicitly define attributes needed
    const {email,password} = formValues;
    dispatch({ type: FETCHING_API_START, isLoading: true });
    axiosWithAuth()
      .post("/login", {email,password})
      .then((res) => {
        //console.log("response: ", res); // see sample POST login res below
        localStorage.setItem("authToken", res.data.token); // 200
        alert(res.data.message);
        dispatch({
          type: FETCHING_API_SUCCESS,
          isLoading: false,
          payload: res.data.message,
        });

        // res gives currentUserId, assign to currentUser obj in reducer. Payload = currentUserId
        localStorage.setItem("id", res.data.id);
        localStorage.setItem(LOCAL_ACCOUNT_STATUS,res.data.isInstructor?INSTRUCTOR:STUDENT);
        dispatch({type:USER_LOGGED_IN,payload:{
          currentUserId:res.data.id,
          isInstructor:res.data.is_instructor
        }});
      })
      .catch((error) => {
        dispatch({ type: FETCHING_API_FAILURE, payload: error });
        console.log("ERR_1: This error is from Login", error);
      });
  };
  export const postSignUp=(formValues)=>(dispatch)=>{
      // explicitly define attributes needed
      const {name,email,password,isOverEighteen,is_instructor} = formValues;
      dispatch({ type: FETCHING_API_START });
      axiosWithAuth()
        .post("/register", {name,email,password,isOverEighteen,is_instructor})
        // or here
        .then((res) => {
          localStorage.setItem(LOCAL_ACCOUNT_STATUS,SIGNED_UP);
          alert(res.data.message)
          dispatch({ type: FETCHING_API_SUCCESS, payload: res.data.message });
          dispatch({type:USER_SIGNED_UP,payload:{
            currentUserId:res.data.id,
            isInstructor:res.data.is_instructor,
          }});
        })
        .catch((error) => {
          dispatch({ type: FETCHING_API_FAILURE, payload: error });
          console.log("ERR_1: This error is from Login", error);
        });
  };
  export const initAccountStatus = ()=>{
    const status = localStorage.getItem(LOCAL_ACCOUNT_STATUS);
    return {type:INIT_ACCOUNT_STATUS, payload:status};
  };