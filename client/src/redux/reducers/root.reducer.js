import { combineReducers } from "redux";
import currentUserReducer from "./currentUser.reducer";
import { allUsersReducer } from "./allUsers.reducer";
import { oneUserReducer } from "./oneUser.reducer";


export const rootReducer = combineReducers({
  allUsers: allUsersReducer,
  oneUser: oneUserReducer,
  currentuser: currentUserReducer,
})

