import {
    FETCHING_API_START,
    FETCHING_API_SUCCESS,
    FETCHING_API_FAILURE,
    CHECK_USER,
    CURRENT_USER,
    CHANGE_ACCOUNT_STATUS,
    INIT_ACCOUNT_STATUS,
    USER_LOGGED_IN,
    USER_SIGNED_UP
} from '../state/actions/actionTypes';
import { 
    INSTRUCTOR,
    LOGGED_OUT, SIGNED_UP, STUDENT
} from './accountStatus';
const LOCAL_ACCOUNT_STATUS = "LOCAL_ACCOUNT_STATUS";
const initialState = {
    accountStatus: LOGGED_OUT
};
const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCHING_API_START:{
            return { ...state, isLoading: true };
        }
        case FETCHING_API_SUCCESS:{
            return { ...state, isLoading: false };
        }
        case FETCHING_API_FAILURE:{
            return { ...state, isLoading: false, error: action.payload };
        }
        case CHECK_USER:{
            //console.log("reducer fires: check user");
            return {
                ...state,
                user: { ...state.user, isInstructor: action.payload },
            };
        }
        case CURRENT_USER:{
            return { ...state, currentUser: { id: action.payload } };
        }
        case CHANGE_ACCOUNT_STATUS:{
            const newAccountStatus = action.payload;
            localStorage.setItem(LOCAL_ACCOUNT_STATUS,newAccountStatus);
            return {
              ...state,
              accountStatus: newAccountStatus
            };
        }
        case INIT_ACCOUNT_STATUS:{
            const accountStatus = localStorage.getItem(LOCAL_ACCOUNT_STATUS);
            if(!accountStatus){
              return{
                ...state,
                accountStatus:LOGGED_OUT
              }
            }
            else{
              return {
                ...state,
                accountStatus
              }
            }
        }
        case USER_LOGGED_IN:{
            return{
                ...state,
                currentUser:{id:action.payload.currentUserId},
                isInstructor:action.payload.isInstructor,
                accountStatus:action.payload.isInstructor?INSTRUCTOR:STUDENT
            }
        }
        case USER_SIGNED_UP:{
            return{
                ...state,
                currentUser:{id:action.payload.currentUserId},
                isInstructor:action.payload.isInstructor,
                accountStatus:SIGNED_UP
            }
        }
        default:{
            return state;
        }
    }
};
export default userReducer;