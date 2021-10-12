import axios from 'axios';
import { GET_ALL_PLACES, SET_PLACE, SET_LAST_PLACE, SET_EVENT,  ADD_PLACE, SET_ALL_PLACES, SET_ERROR, SET_LOADING, DELETE_EVENT } from '../types/places'


//middleware
export const getAllPlaces = (user_id) => async (dispatch) => {
  try {
    dispatch(setLoading())
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/place/allPlaces/${user_id}/`, { credentials: 'include' })
    const allPlaces = await response.json();
    
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
      body: ata,d
      credentials: "include"
    })
    
    const place = await responseData.json();
    if(place?.Events.length === 1) {
      dispatch(setPlace(place))
    } else {
      dispatch(addEvent(place));
    }
    dispatch(setLastPlace(place))
  } catch(error) {
    dispatch(setError(error))
  }
}

export const deleteEvent = (id) => async (dispatch) => {

  try {
    dispatch(setLoading())
    
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/place/deleteEvent/${id}/`, { credentials: 'include' })
    const deletedEvent = await response.data;
    
    dispatch(setDeleteEvent(deletedEvent))
  } catch(error) {
    dispatch(setError(error))
  }
} 

//actionCreater
export const setAllPlaces = (allPlaces) => ({
  type: SET_ALL_PLACES,
  payload: {allPlaces}
})

export const addEvent = (place) => ({
  type: SET_EVENT,
  payload: { place }
})

export const setPlace = (place) => ({
  type: SET_PLACE,
  payload: { place }
})

export const setLastPlace = (place) => ({
  type: SET_LAST_PLACE,
  payload: { place }
})

export const setDeleteEvent = (deletedEvent) => ({
  type: DELETE_EVENT,
  payload: { deletedEvent }
})

export const setLoading = () => ({
  type: SET_LOADING
})

export const setError = (error) => ({
  type: SET_ERROR,
  error
})
