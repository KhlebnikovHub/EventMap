import axios from 'axios'
import { DELETE_FRIENDS_FROM_ALL_USERS, GET_ALL_USERS, SET_ALL_USERS, SET_ERROR, SET_LOADING } from '../types/allUsers'

//middleware
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/allUsers`, {withCredentials: true})
    const allUsers = response.data
    
    dispatch(setAllUsers(allUsers))
  } catch(error) {
    dispatch(setError(error))
  }
}

export const deleteFriendsFromAllUsers = (id, stateId) => async (dispatch) => {
  try {
    dispatch(setLoading())
    
    const response = await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/friends/${stateId}`,
      data: { id }
    }, {withCredentials: true})

    dispatch(setDeleteFriendFromAllUsers(id, stateId))
  } catch(error) {
    dispatch(setError(error))
  }
}

//actionCreater
export const setDeleteFriendFromAllUsers = (id, stateId) => ({
  type: DELETE_FRIENDS_FROM_ALL_USERS,
  payload: { id, stateId }
})

export const setAllUsers = (allUsers) => ({
  type: SET_ALL_USERS,
  payload: {allUsers}
})

export const setLoading = () => ({
  type: SET_LOADING
})

export const setError = (error) => ({
  type: SET_ERROR,
  error
})
