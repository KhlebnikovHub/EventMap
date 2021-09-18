import { EDIT_USER_AVATAR, GET_CURRENT_USER } from "../types/currentUserTypes";

function currentUserReducer(state = {}, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_CURRENT_USER: {
      const { currentuser } = payload;
      return currentuser
    }
    
    case EDIT_USER_AVATAR: {
      const { newAvatar } = payload;
      return {
        ...state,
        avatar: newAvatar
      }
    }

    default: {
      return state
    }
  }
}

export default currentUserReducer;
