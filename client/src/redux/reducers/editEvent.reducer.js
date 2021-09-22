import { SET_EDIT_EVENT, SET_LOADING, SET_ERROR } from '../types/event';

export const editEventReducer = (state = {}, action) => {
  const { type, payload, error } = action; 

  switch (type) {
    case SET_LOADING: {
      return { list: state.list, isLoading: true, error: null };
    }
    
    case SET_ERROR: {
      return { list: state.list, isLoading: false, error };
    }
      
    case SET_EDIT_EVENT: {
      const { event } = payload;
      return { ...state, list: event, isLoading: false };
    }
      
    default:{
      return state;
    }

  }
}
