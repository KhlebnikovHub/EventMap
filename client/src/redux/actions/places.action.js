import { GET_ALL_PLACES, SET_PLACE, ADD_PLACE, SET_ALL_PLACES, SET_ERROR, SET_LOADING } from '../types/places'


//middleware
export const getAllPlaces = (user_id) => async (dispatch) => {
  try {
    dispatch(setLoading())
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/place/allPlaces/${user_id}/`, { credentials: 'include' })
    const allPlaces = await response.json();
    console.log("ALLPLACES", allPlaces);
    
    dispatch(setAllPlaces(allPlaces))
  } catch(error) {
    dispatch(setError(error))
  }
}

export const addPlace = (data) => async (dispatch) => {
  try {
    dispatch(setLoading())
    
    const responseData = await fetch(`${process.env.REACT_APP_API_URL}/event/newEvent`, {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json;charset=utf-8' },
      // body: JSON.stringify({ ...data, user_id, newCoords }),
      body: data,
      credentials: "include"
    })
    
    const place = await responseData.json();
    console.log("PLACE FROM FROM ACTION", place);

    dispatch(setPlace(place))
  } catch(error) {
    dispatch(setError(error))
  }
}

//actionCreater
export const setAllPlaces = (allPlaces) => ({
  type: SET_ALL_PLACES,
  payload: {allPlaces}
})

export const setPlace = (place) => ({
  type: SET_PLACE,
  payload: { place }
})

export const setLoading = () => ({
  type: SET_LOADING
})

export const setError = (error) => ({
  type: SET_ERROR,
  error
})
