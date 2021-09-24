import axios from 'axios';
import {GET_PROFILE_EVENTS, SET_PROFILE_EVENTS, SET_LOADING, SET_ERROR } from '../types/event'

export const setLoading = () => ({
  type: SET_LOADING
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

export const getProfileEvents = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/event/profileEvents/${id}`, { withCredentials: true });
    const profileEvents = response.data;

    dispatch(setProfileEvents(profileEvents));
  } catch (error) {
    dispatch(setError(error));
  }
};


export const setProfileEvents = (profileEvents) => ({
  type: SET_PROFILE_EVENTS,
  payload: { profileEvents }
});

