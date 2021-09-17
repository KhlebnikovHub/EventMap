import axios from 'axios'
import { GET_ALL_USERS, SET_ALL_USERS, SET_ERROR, SET_LOADING } from '../types/allUsers'

//middleware
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/allUsers`)
    const allUsers = response.data
    
    dispatch(setAllUsers(allUsers))
  } catch(error) {
    dispatch(setError(error))
  }
}

//actionCreater
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
