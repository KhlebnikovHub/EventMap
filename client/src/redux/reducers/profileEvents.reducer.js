import { SET_PROFILE_EVENTS, SET_LOADING, SET_ERROR } from '../types/event';

export const profileEventsReducer = (state = {}, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case SET_LOADING: {
      return { list: state.list, isLoading: true, error: null };
    }
      
    case SET_ERROR: {
      return { list: state.list, isLoading: false, error };
    }
      
    case SET_PROFILE_EVENTS: {
      const { profileEvents } = payload;
      return { ...state, list: profileEvents, isLoading: false };
    }
    
    default: {
      return state;
    }
  }
}
