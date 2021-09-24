import { GET_ALL_PLACES, SET_PANORAMA, SET_RANDOM_PLACES, GET_RANDOM_PLACES, SET_PLACE, ADD_PLACE, SET_ALL_PLACES, SET_ERROR, SET_LOADING } from '../types/panorama'


//middleware
export const getPanorama = (id) => async (dispatch) => {
  try {
    dispatch(setLoading())
    
  

    const response = await fetch(`${process.env.REACT_APP_API_URL}/panorama/${id}`, { credentials: 'include' })
    const panorama = await response.json();
    
    dispatch(setPanorama(panorama))
  } catch(error) {
    dispatch(setError(error))
  }
}


//actionCreater
export const setPanorama = (panorama) => ({
  type: SET_PANORAMA,
  payload: { panorama }
})

export const setLoading = () => ({
  type: SET_LOADING
})

export const setError = (error) => ({
  type: SET_ERROR,
  error
})
