import axiosWithAuth from "../../utils/axiosWithAuth";
import { connect } from 'react-redux';
import { payForClass, undoSignUp } from '../../state/actions/index';
/*
**********************************************************
Will need to remove these because they should have been imported from action/index.js.
Since action/index.js is also importing this file, this would introduce circular dependency.
One solution is to put all the redux type constants in a separate file and import them that way.
For now, I am redeclaring these here.

**********************************************************
*/
const FETCHING_API_START = "FETCHING_API_LOADING";
const FETCHING_API_SUCCESS = "FETCHING_API_SUCCESS";
const FETCHING_API_FAILURE = "FETCHING_API_FAIL";
// *******************************************************

// export redux types
export const PAY_FOR_CLASS = 'PAY_FOR_CLASS';
// props attributes
export const connectToStore = (component) => {
    const mapStateToProps = (state) =>{
        return{
            classes:state.classes,
            user:state.user
        };
    };
    const mapDispatchToProps = (dispatch) =>{
        return{
            payForClass: (indivClass)=>dispatch(payForClass(indivClass)),
            undoSignUp: (indivClass)=>dispatch(undoSignUp(indivClass))
        };
    };
    return connect(mapStateToProps,mapDispatchToProps)(component);
};

// action
export const payForClassAction = (indivClass) => (dispatch) =>{
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

//  reducer 
// PAY_FOR_CLASS
export const payForClassReducer = (state, action) =>{
    const updatedIndivClass = {...action.payload, isPaid:true};
    const updatedMyClasses = {...state.myClasses,[updatedIndivClass.id]:updatedIndivClass};
    console.log("reducer fires: pay for class");
    return { ...state, myClasses: updatedMyClasses };
}

// helper functions