import { SET_EVENT, SET_LOADING, SET_ERROR, ADD_NEW_PHOTO, SET_EDIT_EVENT} from '../types/event';

export const getEventReducer = (state = {}, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case SET_LOADING: {
      return { list: state.list, isLoading: true, error: null };
    }
    
    case SET_ERROR: {
      return { list: state.list, isLoading: false, error };
    }
      
    case SET_EVENT: {
      const { event } = payload;
      return { ...state, list: event, isLoading: false };
    }
    case ADD_NEW_PHOTO: {
      const { allEventPhoto } = payload
      console.log('REDUCERGOVNA', allEventPhoto);
      state.list.Images = allEventPhoto
      return { ...state,  isLoading: false  }
    }
    case SET_EDIT_EVENT: {
      const { editedEvent } = payload;
      return { ...state, list: editedEvent, isLoading: false };
    }
    default: {
      return state;
    }
  }
}
