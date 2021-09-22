import axios from 'axios';
import { EDIT_EVENT, SET_EDIT_EVENT, SET_LOADING, SET_ERROR } from '../types/event';

export const setLoading = () => ({
  type: SET_LOADING
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

export const editEvent = (id, newFormData) => async (dispatch) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url:  `${process.env.REACT_APP_API_URL}/event/edit/${id}`,
      data: { newFormData },
      withCredentials: true
    })
    const newRequest = response.data;
  
    dispatch(setEditEvent(newRequest));

  } catch (error) {
    console.log(error);
  }
};

export const setNewEventPhoto = ({id, googleDisc, otherPhoto}) => async (dispatch) => {
  
  try {
    const response = await axios({
      method: 'POST',
      url:  `${process.env.REACT_APP_API_URL}/event/addPhotoEvent/${id}`,
      data: { googleDisc, otherPhoto },
      withCredentials: true
    })
    const newPhoto = response.data;
  
    dispatch(setEditEvent(newPhoto));

  } catch (error) {
    console.log(error);
  }
};

export const setEditEvent = (newRequest) => ({
  type: SET_EDIT_EVENT,
  payload: {newRequest}
});
    