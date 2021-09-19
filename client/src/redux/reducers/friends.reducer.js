import { ADD_TO_REQUEST, APPROVE_REQUEST, DELETE_FROM_FRIENDS, SET_ERROR, SET_FRIENDS, SET_LOADING } from "../types/friends"
import { requestListReducer } from "./request.reducer"



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
      return {list: [...state.list, newFriend], isLoading: false, error: null}
    }
    case DELETE_FROM_FRIENDS: {
      const { id, stateId } = payload
      return {list:  state.list.filter(el => el.id !== id)}
  }
      default: {
          return state;
      }
  }
}
