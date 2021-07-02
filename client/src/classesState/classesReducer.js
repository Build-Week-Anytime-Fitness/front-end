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

const classesReducer=(state,action)=>{
    switch(action.type){
        case PAY_FOR_CLASS:
            const indivClass = action.payload;
            const updatedClasses = {...state.myClasses,[indivClass.id]:{isPaid:true}};
            console.log("reducer fires: pay for class");
            return { ...state, myClasses: updatedClasses };
        case SEARCH_TERM: 
            //log("3. SEARCH TERM FROM REDUCER", action.payload);
            return { ...state, searchTerm: action.payload };
        case GET_FILTERED_CLASSES:
            //log(" GET_FILTERED_CLASSES in reducer: log payload: ", action.payload);
            return { ...state, filteredClasses: action.payload };
        case ALL_CLASSES:
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
        case CLASS_TO_EDIT:
            // log("CLASS_TO_EDIT in reducer: log payload: ", action.payload);
            return { ...state, classToEdit: action.payload };
        case CLASS_TO_DELETE:
            //log("reducer fires: class to delete");
            return { ...state, classToDelete: action.payload };
        case CLASSES_TO_SIGN_UP:
            //log("CLASSES_TO_SIGN_UP in reducer: log payload: ", action.payload);
            const newClassId = action.payload.id;
            //log("newClassId: ", newClassId);
            return {
                ...state,
                classesToSignUp: { ...state.classesToSignUp, [newClassId]: true },
            };
        case UNDO_SIGN_UP:
            //log("UNDO_SIGN_UP in reducer: log payload: ", action.payload);
            const newClassId = action.payload.id;
            // tell the dict that the class is now false, user is NOT signed up for class
            return {
                ...state,
                classesToSignUp: { ...state.classesToSignUp, [newClassId]: false },
            };
        case ADD_MY_CLASS:
            const newClassId = action.payload.id;
            return {
              ...state,
              myClasses: { ...state.myClasses, [newClassId]: false },
            };
        case REMOVE_MY_CLASS:
            const newClassId = action.payload.id;
            const newMyClasses = Object.keys(state.myClasses).filter((key)=>key!==newClassId).map((key)=>state.myClasses[key]);
            return {
              ...state,
              myClasses: {...state.myClasses,[newClassId]:newMyClasses}
            };
        default:
            return state;
    }
}
export default classesReducer;