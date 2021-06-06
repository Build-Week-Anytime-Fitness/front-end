import {
    FETCHING_API_START,
    ALL_CLASSES,
    GET_FILTERED_CLASSES,
    FETCHING_API_SUCCESS,
    FETCHING_API_FAILURE
} from '../actions/index';
import axiosWithAuth from "../../utils/axiosWithAuth";
// action
export const getDataAction = (props) => (dispatch) => {

    // console.log("getData API call fires is loading True", props);
    dispatch({ type: FETCHING_API_START, isLoading: "true" });
    setTimeout(
      axiosWithAuth()
        .get("/classes")
        .then((res) => {
          dispatch({ type: ALL_CLASSES, payload: res.data });
          dispatch({ type: GET_FILTERED_CLASSES, payload: res.data })   
          dispatch({
            type: FETCHING_API_SUCCESS,
            isLoading: "false",
            payload: res.data,
          });
        })
        .catch((error) => {
          dispatch({ type: FETCHING_API_FAILURE, payload: error });
          console.log("getData API request failed", error);
        }),
      4000
    );
  };
// reducers
export const fetchingAPIStartReducer=(state,action)=>{
    return { ...state, isLoading: true };
}; 
export const fetchingAPISuccessReducer=(state,action)=>{
    return { ...state, isLoading: false };
};
export const fetchingAPIFailureReducer=(state,action)=>{
    return { ...state, isLoading: false, error: action.payload };
};
export const allClassesReducer=(state,action)=>{
    const classes = action.payload;
    if(classes){
        const IdAsKeysClasses = Object.keys(classes).reduce((acc,key)=>{
            const id = classes[key].id;
            acc[id] = classes[key];
            return acc;
        },{});
        return { ...state, classes: IdAsKeysClasses };
    }
    else{
        return state;
    }
};