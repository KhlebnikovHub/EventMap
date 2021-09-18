import axios from 'axios'
import { SET_ERROR, SET_FRIENDS, SET_LOADING } from '../types/friends'

//middleware
export const getAllFriends = (id) => async (dispatch) => {
  try {
    dispatch(setLoading())
    
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/friends/${id}`)
    const userFriends = response.data
    dispatch(setAllUsers(userFriends))
  } catch(error) {
    dispatch(setError(error))
  }
}

export const addToFriend = ({id, stateId}) => async (dispatch) => {
  try {
    dispatch(setLoading())
    
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/friends/${id}`, stateId)
    const newRequest = response.data
      console.log("DRUZYASHKI", newRequest);
    dispatch(setAllUsers(newRequest))
  } catch(error) {
    dispatch(setError(error))
  }
}



//actionCreater
export const setAllUsers = (userFriends) => ({
  type: SET_FRIENDS,
  payload: { userFriends }
})

export const setAddToFriend = (newRequest) => ({
  type: SET_FRIENDS,
  payload: { newRequest }
})

export const setLoading = () => ({
  type: SET_LOADING
})

export const setError = (error) => ({
  type: SET_ERROR,
  error
})