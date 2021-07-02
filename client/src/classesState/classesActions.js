import{
    PAY_FOR_CLASS,
    SEARCH_TERM,
    GET_FILTERED_CLASSES,
    ALL_CLASSES,
    CLASS_TO_EDIT,
    CLASS_TO_DELETE,
    CLASSES_TO_SIGN_UP,
    UNDO_SIGN_UP,
    ADD_MY_CLASS,
    REMOVE_MY_CLASS
} from '../state/actions/actionTypes';
export const payForClass = (indivClass) => (dispatch) =>{
    // after checking out and paying for the classes
    // the classes will be posted to the backend
    dispatch({ type: FETCHING_API_START });
    axiosWithAuth()
    .post("/clientclasses", indivClass.id) 
    .then((res) => {
      console.log("SIGN_UP_FOR_CLASS response: ", res); 
      alert(res.data.message);
      console.log("PAY_FOR_CLASS action fires: log props: ", indivClass);
      dispatch({ type: FETCHING_API_SUCCESS, payload: res.data.message });
      dispatch({ type: PAY_FOR_CLASS, payload: indivClass });
    })
    .catch((error) => {
      dispatch({ type: FETCHING_API_FAILURE, payload: error });
      console.log("ERR_1: This error is from SIGN_UP_FOR_CLASS", error);
    });
  };

export const getData = (props) => (dispatch) => {
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
export const searchTerm = (searchTerm) => {
    return { type: SEARCH_TERM, payload: searchTerm };
};
export const addMyClassAction = (indivClass) => {
    return { type: ADD_MY_CLASS, payload: indivClass };
};
export const removeMyClassAction = (indivClass) => {
    return {type: REMOVE_MY_CLASS, payload: indivClass};
};
export const allClasses = (allClasses) => {
    // console.log("7. new allClasses from classes.js", allClasses);
    return { type: ALL_CLASSES, payload: allClasses };
};
export const classToEdit = (indivClass) => {
    //console.log("CLASS_TO_EDIT action fires: log props: ", indivClass);
    return { type: CLASS_TO_EDIT, payload: indivClass };
};
export const setEditMode = (isEditMode) => {
    //console.log("EDIT_MODE ACTION FIRES IS EDIT MODE", isEditMode);
    return { type: EDIT_MODE, payload: isEditMode };
};
export const deleteClass = (indivClass) => {
    //console.log("CLASS_TO_DELETE action fires: props: ", indivClass);
    return { type: CLASS_TO_DELETE, payload: indivClass };
};
export const classesToSignUp = (indivClass) => {
    //console.log("CLASSES_TO_SIGN_UP action fires: log props: ", indivClass);
    return { type: CLASSES_TO_SIGN_UP, payload: indivClass };
};
export const undoSignUp = (indivClass) => {
    //console.log("UNDO_SIGN_UP action fires: log props: ", indivClass);
    return { type: UNDO_SIGN_UP, payload: indivClass };
};
export const addClass = (addClass) => {
    //console.log("8. new allClasses from classes.js", addClass);
    return { type: ADD_CLASS, payload: addClass };
};