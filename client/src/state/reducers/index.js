import {
    FETCHING_API_START,
    FETCHING_API_SUCCESS,
    FETCHING_API_FAILURE,
    SEARCH_TERM,
    FILTERED_VALUE,
    ALL_CLASSES,
  } from "../actions";
  
const log = console.log;
  
  //1. set initialState
  const initialState = {
    loading: false,
    error: "",
    searchTerm: "",
  };
  
  //2. create a features reducer that takes in initialState, sets it equal to state, and takes in an action
  export const appReducer = (state = initialState, action) => {
    //3. initialize switch statement
    switch (action.type) {
      case FETCHING_API_START: {
        //log("FETCH RUNNING THROUGH REDUCER");
        return { ...state, loading: true };
      }
      case FETCHING_API_SUCCESS: {
        //log("FETCH SUCCESS THROUGH REDUCER");
        return { ...state, loading: false, friends: action.payload };
      }
      case FETCHING_API_FAILURE: {
        //log("FETCH FAIL FROM REDUCER");
        return { ...state, loading: false, error: action.payload };
      }
      case SEARCH_TERM: {
        //log("3. SEARCH TERM FROM REDUCER", action.payload);
        return { ...state, searchTerm: action.payload };
      }
      case FILTERED_VALUE: {
          log(" FILTERED VALUE from reducer", action.payload)
          return { ...state, filteredValue: action.payload}
      }
      case ALL_CLASSES: {
          log("ALL CLASSES from reducer", action.payload)
          return { ...state, allClasses: action.payload}
      }
      default:  
      return state;
    }
  };
  