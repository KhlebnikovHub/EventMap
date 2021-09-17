import { combineReducers } from "redux";
import { allUsersReducer } from "./allUsers.reducer";
import currentUserReducer from "./currentUser.reducer";
import { oneUserReducer } from "./oneUser.reducer";


export const rootReducer = combineReducers({
  allUsers: allUsersReducer,
  oneUser: oneUserReducer,
  currentuser: currentUserReducer,
})
