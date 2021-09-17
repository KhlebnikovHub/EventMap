import { combineReducers } from "redux";
import currentUserReducer from "./currentUser.reducer";


const rootReducer = combineReducers({
  currentuser: currentUserReducer,
})

export default rootReducer;
