import {
  FETCHING_API_START,
  FETCHING_API_SUCCESS,
  FETCHING_API_FAILURE,
  SEARCH_TERM,
  GET_FILTERED_CLASSES,
  ALL_CLASSES,
  ADD_CLASS,
  ADD_USER,
  CHECK_USER,
  CURRENT_USER,
  CLASS_TO_EDIT,
  EDIT_MODE,
  CLASS_TO_DELETE,
  CLASSES_TO_SIGN_UP,
  UNDO_SIGN_UP,
  PAY_FOR_CLASS,
  ADD_MY_CLASS,
  REMOVE_MY_CLASS
} from "../actions";
import {payForClassReducer} from "../interfaces/cartInterface";
import {
  addMyClassReducer, 
  removeMyClassReducer
} from "../interfaces/classInterface";
import {
  fetchingAPIStartReducer,
  fetchingAPISuccessReducer,
  fetchingAPIFailureReducer,
  allClassesReducer
} from "../interfaces/getDataInterface";
//const log = console.log;

//1. set initialState
const initialState = {
  isLoading: false,
  error: "",
  searchTerm: "",
  isEditMode: false,
  currentUser: {
    id: "",
  },
  classToEdit: {},
  classesToSignUp: {}, // dictionary of class ids that user had signed up for
  myClasses:{},
  user: {
    id: "",
    personName: "",
    email: "",
    isOverEighteen: false,
    password: "",
    isInstructor: false,
  },
  classes: [
    {
      className: "Yoga On The Beach",
      classType: "Yoga",
      classDate: "2021/10/30",
      startTime: "10:00am",
      duration: 1, // hours
      intensity: "low",
      location: "Public Beach",
      numberOfStudents: 8,
      maxClassSize: 10,
    },
    {
      className: "Strong Men",
      classType: "Weights",
      classDate: "2021/10/31",
      startTime: "9:00am",
      duration: 1, // hours
      intensity: "high",
      location: "Anywhere",
      numberOfStudents: 10,
      maxClassSize: 10,
    },
  ],
  filteredClasses: [
    {
      className: "No Classes",
      classType: "",
      classDate: "",
      startTime: "",
      duration: 0, // hours
      intensity: "",
      location: "",
      numberOfStudents: 0,
      maxClassSize: 10,
    },
  ],
};

// STATE NEEDED:  allClasses, filteredClasses, searchTerm
// STATE CHANGERS NEEDED:  setAllClasses, setFilteredClasses, setSearchTerm
// INITIAL STATE:  initialClassesValues (which gets assigned to setAllClasses and setFilteredClasses)

//2. create a features reducer that takes in initialState, sets it equal to state, and takes in an action
export const appReducer = (state = initialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case FETCHING_API_START: {
      return fetchingAPIStartReducer(state,action);
    }
    case FETCHING_API_SUCCESS: {
      return fetchingAPISuccessReducer(state,action);
    }
    case FETCHING_API_FAILURE: {
      return fetchingAPIFailureReducer(state,action);
    }
    case SEARCH_TERM: {
      //log("3. SEARCH TERM FROM REDUCER", action.payload);
      return { ...state, searchTerm: action.payload };
    }
    case GET_FILTERED_CLASSES: {
      //log(" GET_FILTERED_CLASSES in reducer: log payload: ", action.payload);
      return { ...state, filteredClasses: action.payload };
    }
    case ALL_CLASSES: {
      return allClassesReducer(state,action);
    }
    case CLASS_TO_EDIT: {
      // log("CLASS_TO_EDIT in reducer: log payload: ", action.payload);
      return { ...state, classToEdit: action.payload };
    }

    case EDIT_MODE: {
     // log("EDIT MODE FIRED FROM REDUCER", action.payload);
      return { ...state, isEditMode: action.payload };
    }

    case ADD_CLASS: {
      //console.log("reducer fires: add class ");
      return { ...state, classes: [...state.classes, action.payload] };
    }

    case CLASS_TO_DELETE: {
      //log("reducer fires: class to delete");
      return { ...state, classToDelete: action.payload };
    }

    case CLASSES_TO_SIGN_UP: {
      //log("CLASSES_TO_SIGN_UP in reducer: log payload: ", action.payload);
      const newClassId = action.payload.id;
      //log("newClassId: ", newClassId);
      return {
        ...state,
        classesToSignUp: { ...state.classesToSignUp, [newClassId]: true },
      };
    }

    case UNDO_SIGN_UP: {
      //log("UNDO_SIGN_UP in reducer: log payload: ", action.payload);
      const newClassId = action.payload.id;
      // tell the dict that the class is now false, user is NOT signed up for class
      return {
        ...state,
        classesToSignUp: { ...state.classesToSignUp, [newClassId]: false },
      };
    }

    case PAY_FOR_CLASS:{
      return payForClassReducer(state,action);
    }
   
    case ADD_MY_CLASS:{
      return addMyClassReducer(state,action);
    }

    case REMOVE_MY_CLASS:{
      return removeMyClassReducer(state,action);
    }
    // case ADD_CLASS: {
    //   console.log("reducer fires: add class ");
    //   return { ...state, classes: [...state.classes, action.payload] };
    // }


    case ADD_USER: {
      //console.log("reducer fires: add user");
      return { ...state, user: [...state.users, action.payload] };
    }

    case CHECK_USER: {
      //console.log("reducer fires: check user");
      return {
        ...state,
        user: { ...state.user, isInstructor: action.payload },
      };
    }

    case CURRENT_USER: {
      //console.log("reducer fires: current user, log payload: ", action.payload);
      return { ...state, currentUser: { id: action.payload } };
    }

    default:
      console.log("Error: unknown action type in App Reducer", action.type);
      return state;
  }
};
