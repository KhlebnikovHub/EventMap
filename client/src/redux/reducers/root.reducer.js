import { combineReducers } from "redux";
import { allUsersReducer } from "./allUsers.reducer";
import currentUserReducer from "./currentUser.reducer";
import { userFriendsReducer } from "./friends.reducer";
import { oneUserReducer } from "./oneUser.reducer";
import { allPlacesReducer } from "./places.reducer";


export const rootReducer = combineReducers({
  allUsers: allUsersReducer,
  oneUser: oneUserReducer,
  currentuser: currentUserReducer,
  userFriends: userFriendsReducer,
  allPlaces: allPlacesReducer,
})
