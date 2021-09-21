import { EDIT_USER_AVATAR, GET_CURRENT_USER, LOG_OUT } from "../types/currentUserTypes";

function currentUserReducer(state = null, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_CURRENT_USER: {
      const { currentuser } = payload;
      return currentuser
    }
    
    case EDIT_USER_AVATAR: {
      const { newAvatar } = payload;
      console.log('REDUCERAVATAR', newAvatar);
      return {
        ...state,
        avatar: newAvatar
      }
    }
    case LOG_OUT: {
      console.log("KYKYKYKYKYK");
      return null
    }

    default: {
      return state
    }
  }
}

export default currentUserReducer;
