import { SET_ALL_USERS, SET_ERROR, SET_LOADING } from "../types/allUsers"


export const allUsersReducer = (state = {}, action) => {
  const { type, payload, error } = action
  // const {response, idOfDevice} = payload
  // console.log("CHANGE PAYL:OAD",payload);

  switch (type) {
      case SET_ERROR: {
          return { list: state.list, isLoading: false, error }
      }
      case SET_LOADING: {
          return { list: state.list, isLoading: true, error: null }
      }
      case SET_ALL_USERS: {
        const { allUsers } = payload
        return {...state, list: allUsers }
    }
      default: {
          return state;
      }
  }
}
