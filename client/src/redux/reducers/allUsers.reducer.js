import { DELETE_FRIENDS_FROM_ALL_USERS, SET_ALL_USERS, SET_ERROR, SET_LOADING } from "../types/allUsers"
import { ADD_TO_REQUEST } from "../types/friends"


export const allUsersReducer = (state = {}, action) => {
  const { type, payload, error } = action
  // const {response, idOfDevice} = payload


  switch (type) {
      case SET_ERROR: {
          return { list: state.list, isLoading: false, error }
      }
      case SET_LOADING: {
          return { list: state.list, isLoading: true, error: null }
      }
      case SET_ALL_USERS: {
        const { allUsers } = payload
        return {...state, list: allUsers, isLoading: false }
    }
    case ADD_TO_REQUEST: {
      const { newRequest, id } = payload
      state.list.forEach(el => el.id === id ? el.Requests.push(newRequest) : el)
      return {list: state.list, isLoading: false, error: null}
    }
    case DELETE_FRIENDS_FROM_ALL_USERS: {
      const { id, stateId } = payload
      state.list.forEach(el => {
        if(el.id === id) {
          const foundIndex = el.Friends.findIndex(elem => elem.friend_id === id && elem.user_id === stateId)
          el.Friends.splice(foundIndex, 1);
        }
      })
      return {list: state?.list, isLoading: false, error: null}
    }
      default: {
          return state;
      }
  }
}
