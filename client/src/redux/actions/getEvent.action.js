import axios from 'axios';
import { GET_EVENT, SET_EVENT, SET_LOADING, SET_ERROR, ADD_NEW_PHOTO } from '../types/event';

export const setLoading = () => ({
  type: SET_LOADING
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

export const setEvent = (event) => ({
  type: SET_EVENT,
  payload: {event}
});

export const setNewPhoto = (allEventPhoto) => ({
  type: ADD_NEW_PHOTO,
  payload: { allEventPhoto }
});



export const getEvent = (id) => async (dispatch) => {
  try {
    dispatch(setLoading())

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/event/${id}`, { withCredentials: true });
    const event = response.data;


    dispatch(setEvent(event));
  } catch (error) {
    dispatch(setError(error));
  }
}

export const setNewEventPhoto = ({id, googleDisc, otherPhoto}) => async (dispatch) => {
  
  try {
    const response = await axios({
      method: 'POST',
      url:  `${process.env.REACT_APP_API_URL}/event/addPhotoEvent/${id}`,
      data: { googleDisc, otherPhoto },
      withCredentials: true
    })
    const allEventPhoto = response.data;
    console.log('RESPONSE FROM ADDPHOTO', allEventPhoto );
  
    dispatch(setNewPhoto(allEventPhoto));

  } catch (error) {
    console.log(error);
  }
};
