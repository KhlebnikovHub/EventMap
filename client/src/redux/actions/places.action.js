import { GET_ALL_PLACES, SET_ALL_PLACES, SET_ERROR, SET_LOADING } from '../types/places'


//middleware
export const getAllPlaces = (user_id) => async (dispatch) => {
  try {
    dispatch(setLoading())
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/place/allPlaces/${user_id}/`)
    const allPlaces = await response.json();
    console.log("ALLPLACES", allPlaces);
    
    dispatch(setAllPlaces(allPlaces))
  } catch(error) {
    dispatch(setError(error))
  }
}

//actionCreater
export const setAllPlaces = (allPlaces) => ({
  type: SET_ALL_PLACES,
  payload: {allPlaces}
})

export const setLoading = () => ({
  type: SET_LOADING
})

export const setError = (error) => ({
  type: SET_ERROR,
  error
})
