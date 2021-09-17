import axios from 'axios'
import { SET_ERROR, SET_LOADING, SET_ONE_USER } from '../types/oneUser'

//middleware
export const getOneUser = (id) => async (dispatch) => {
  try {
    dispatch(setLoading())
    
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/oneUser/${id}`)
    const oneUser = response.data
    
    dispatch(setOneUser(oneUser))
  } catch(error) {
    dispatch(setError(error))
  }
}

//actionCreater
export const setOneUser = (oneUser) => ({
  type: SET_ONE_USER,
  payload: {oneUser}
})

export const setLoading = () => ({
  type: SET_LOADING
})

export const setError = (error) => ({
  type: SET_ERROR,
  error
})
