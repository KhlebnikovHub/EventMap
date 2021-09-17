import { GET_CURRENT_USER } from "../types/currentUserTypes";

function currentUserReducer(state = {}, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_CURRENT_USER: {
      const { currentuser } = payload;
      return currentuser
    }
    
    

    default: {
      return state
    }
  }
}

export default currentUserReducer;
