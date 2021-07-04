import {
    FETCHING_API_START,
    FETCHING_API_SUCCESS,
    FETCHING_API_FAILURE,
    CHECK_USER,
    CURRENT_USER,
    CHANGE_ACCOUNT_STATUS,
    INIT_ACCOUNT_STATUS
} from '../state/actions/actionTypes';
import { 
    LOGGED_OUT
} from './accountStatus';
const LOCAL_ACCOUNT_STATUS = "LOCAL_ACCOUNT_STATUS";

const userReducer=(state,action)=>{
    switch(action.type){
        case FETCHING_API_START:
            return { ...state, isLoading: true };
        case FETCHING_API_SUCCESS:
            return { ...state, isLoading: false };
        case FETCHING_API_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case CHECK_USER:
            //console.log("reducer fires: check user");
            return {
                ...state,
                user: { ...state.user, isInstructor: action.payload },
            };
        case CURRENT_USER:
            return state;
        case CHANGE_ACCOUNT_STATUS:
            const newAccountStatus = action.payload;
            localStorage.setItem(LOCAL_ACCOUNT_STATUS,newAccountStatus);
            return {
              ...state,
              accountStatus: newAccountStatus
            };
        case INIT_ACCOUNT_STATUS:
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
        default:
            return state;
    }
};
export default userReducer;