import { SET_ERROR, SET_FRIENDS, SET_LOADING } from "../types/friends"



export const userFriendsReducer = (state = {}, action) => {
  const { type, payload, error } = action

  switch (type) {
      case SET_ERROR: {
          return { list: state.list, isLoading: false, error }
      }
      case SET_LOADING: {
          return { list: state.list, isLoading: true, error: null }
      }
      case SET_FRIENDS: {
        const { userFriends } = payload
        return {...state, list: userFriends }
    }
      default: {
          return state;
      }
  }
}
