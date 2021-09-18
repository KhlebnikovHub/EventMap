import { APPROVE_REQUEST, SET_ERROR, SET_FRIENDS, SET_LOADING } from "../types/friends"



export const userFriendsReducer = (state = {}, action) => {
  const { type, payload, error } = action

  switch (type) {
      case SET_ERROR: {
          return { list: state.list, isLoading: true, error }
      }
      case SET_LOADING: {
          return { list: state.list, isLoading: false, error: null }
      }
      case SET_FRIENDS: {
        const { userFriends } = payload
        return {...state, list: userFriends }
    }
    case APPROVE_REQUEST: {
      const { newFriend } = payload
      console.log('XALUPA', newFriend);
      return {list: [...state.list, newFriend], isLoading: false, error: null}
    }
      default: {
          return state;
      }
  }
}
