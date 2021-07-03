import {
    ADD_MY_CLASS,
    REMOVE_MY_CLASS,
} from '../actions/actionTypes';
import {
  classToEdit,
  classesToSignUp,
  undoSignUp,
  addMyClass,
  removeMyClass
} from '../actions/index';
import {connect} from 'react-redux';
export const connectToStore = (component) => {
    const mapStateToProps = (state) => {
        return {
          classToEdit: state.classToEdit,
          currentUser: state.currentUser,
          classesToSignUp: state.classesToSignUp,
          isEditMode: state.isEditMode,
        };
      };
      
    const mapDispatchToProps = (dispatch) => {
        return {
          myClassToEdit: (indivClass) => dispatch(classToEdit(indivClass)),
          myClassesToSignUp: (indivClass) => dispatch(classesToSignUp(indivClass)),
          myUndoSignUp: (indivClass) => dispatch(undoSignUp(indivClass)),
          addMyClass: (indivClass) => dispatch(addMyClass(indivClass)),
          removeMyClass: (indivClass) => dispatch(removeMyClass(indivClass)),
        };
      };
    return connect(mapStateToProps,mapDispatchToProps)(component);
};

// addMyClass###
// action
export const addMyClassAction = (indivClass) => {
    return { type: ADD_MY_CLASS, payload: indivClass };
  };
// reducer
export const addMyClassReducer = (state,action) => {
    const newClassId = action.payload.id;
    return {
      ...state,
      myClasses: { ...state.myClasses, [newClassId]: false },
    };
  };
//   ###

// removeMyClass###
// action
export const removeMyClassAction = (indivClass) => {
  return {type: REMOVE_MY_CLASS, payload: indivClass};
};
// reducer
export const removeMyClassReducer = (state, action) => {
  const newClassId = action.payload.id;
  const newMyClasses = Object.keys(state.myClasses).filter((key)=>key!==newClassId).map((key)=>state.myClasses[key]);
  return {
    ...state,
    myClasses: {...state.myClasses,[newClassId]:newMyClasses}
  };
};
// ###