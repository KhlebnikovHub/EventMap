import { GET_ALL_PLACES, SET_RANDOM_PLACES, GET_RANDOM_PLACES, SET_PLACE, ADD_PLACE, SET_ALL_PLACES, SET_ERROR, SET_LOADING } from '../types/randomPlaces'


//middleware
export const getRandomPlaces = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/random/randomPlaces/`, { credentials: 'include' })
    const randomPlaces = await response.json();
    console.log("RANDOMPLACES", randomPlaces);
    
    dispatch(setRandomPlaces(randomPlaces))
  } catch(error) {
    dispatch(setError(error))
  }
}


//actionCreater
export const setRandomPlaces = (randomPlaces) => ({
  type: SET_RANDOM_PLACES,
  payload: { randomPlaces }
})

export const setLoading = () => ({
  type: SET_LOADING
})

export const setError = (error) => ({
  type: SET_ERROR,
  error
})
