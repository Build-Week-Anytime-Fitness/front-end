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
import { LOGGED_OUT } from '../userState/accountStatus';
const initialState = {
    accountStatus:LOGGED_OUT,
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
const classesReducer=(state=initialState,action)=>{
    switch(action.type){
        case PAY_FOR_CLASS:{
            const indivClass = action.payload;
            const updatedClasses = {...state.myClasses,[indivClass.id]:{isPaid:true}};
            console.log("reducer fires: pay for class");
            return { ...state, myClasses: updatedClasses };
        }
        case SEARCH_TERM: {
            //log("3. SEARCH TERM FROM REDUCER", action.payload);
            return { ...state, searchTerm: action.payload };
        }
        case GET_FILTERED_CLASSES:{
            //log(" GET_FILTERED_CLASSES in reducer: log payload: ", action.payload);
            return { ...state, filteredClasses: action.payload };
        }
        case ALL_CLASSES:{
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
        }
        case CLASS_TO_EDIT:{
            // log("CLASS_TO_EDIT in reducer: log payload: ", action.payload);
            return { ...state, classToEdit: action.payload };
        }
        case CLASS_TO_DELETE:{
            //log("reducer fires: class to delete");
            return { ...state, classToDelete: action.payload };
        }
        case CLASSES_TO_SIGN_UP:{

            //log("CLASSES_TO_SIGN_UP in reducer: log payload: ", action.payload);
            const newClassId = action.payload.id;
            //log("newClassId: ", newClassId);
            return {
                ...state,
                classesToSignUp: { ...state.classesToSignUp, [newClassId]: true },
            };
        }
        case UNDO_SIGN_UP:{

            //log("UNDO_SIGN_UP in reducer: log payload: ", action.payload);
            const newClassId = action.payload.id;
            // tell the dict that the class is now false, user is NOT signed up for class
            return {
                ...state,
                classesToSignUp: { ...state.classesToSignUp, [newClassId]: false },
            };
        }
        case ADD_MY_CLASS:{
            const newClassId = action.payload.id;
            return {
              ...state,
              myClasses: { ...state.myClasses, [newClassId]: false },
            };
        }
        case REMOVE_MY_CLASS:{
            const newClassId = action.payload.id;
            const newMyClasses = Object.keys(state.myClasses).filter((key)=>key!==newClassId).map((key)=>state.myClasses[key]);
            return {
              ...state,
              myClasses: {...state.myClasses,[newClassId]:newMyClasses}
            };
        }
        default:{
            return state;
        }
    }
}
export default classesReducer;