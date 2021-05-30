import { connect } from 'react-redux';
import axiosWithAuth from '../../utils/axiosWithAuth';
import { 
    payForClass, 
    undoSignUp,
    FETCHING_API_START,
    FETCHING_API_SUCCESS,
    FETCHING_API_FAILURE,
    PAY_FOR_CLASS
} from '../../state/actions/index';

// props attributes
export const connectToStore = (component) => {
    const mapStateToProps = (state) =>{
        return{
            classesPaid:state.classesPaid,
            classesToSignUp: state.classesToSignUp,
            user:state.user
        };
    };
    const mapDispatchToProps = (dispatch) =>{
        return{
            payForClass: (indivClass)=>dispatch(payForClass(indivClass)),
            undoSignUp: (indivClass)=>dispatch(undoSignUp(indivClass)),
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
export const payForClassReducer = (state,action) => {
    const indivClass = action.payload;
    const updatedClasses = {...state.classesPaid,[indivClass.id]:indivClass};
    console.log("reducer fires: pay for class");
    return { ...state, classesPaid: updatedClasses };
};