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
} from "../actions";

const log = console.log;

//1. set initialState
const initialState = {
  loading: false,
  error: "",
  searchTerm: "",
  currentUser: {
    id: "",
  },
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
      //log("FETCH RUNNING THROUGH REDUCER");
      return { ...state, loading: true };
    }
    case FETCHING_API_SUCCESS: {
        console.log("200 success")
      //log("FETCH SUCCESS THROUGH REDUCER");
      return { ...state, loading: false };
    }
    case FETCHING_API_FAILURE: {
      //log("FETCH FAIL FROM REDUCER");
      return { ...state, loading: false, error: action.payload };
    }
    case SEARCH_TERM: {
      //log("3. SEARCH TERM FROM REDUCER", action.payload);
      return { ...state, searchTerm: action.payload };
    }
    case GET_FILTERED_CLASSES: {
      log(" GET_FILTERED CLASSES from reducer", action.payload);
      return { ...state, filteredClasses: action.payload };
    }
    case ALL_CLASSES: {
      log("ALL CLASSES from reducer", action.payload);
      return { ...state, allClasses: action.payload };
    }
    // case ADD_CLASS: {
    //   console.log("reducer fires: add class ");
    //   return { ...state, classes: [...state.classes, action.payload] };
    // }
    // case ADD_USER: {
    //   console.log("reducer fires: add users ");
    //   return { ...state, users: [...state.users, action.payload] };
    // }
  
    case CHECK_USER: {
      console.log("reducer fires: check user");
      // return { ...state, currentUser: action.payload };
      return {...state, user: {...state.user, isInstructor: action.payload}}
    }

    case CURRENT_USER: {
      console.log("reducer fires: current user");
      return { ...state, currentUser: {id: action.payload}};

      // return {...state, user: {...state.user, isInstructor: action.payload}}
    }

    default:
      console.log("Error: unknown action type in App Reducer", action.type);
      return state;
  }
};

// need to code out current user state
