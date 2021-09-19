import { ADD_TO_REQUEST, APPROVE_REQUEST, DELETE_REQUEST, SET_REQUEST_LIST } from "../types/friends";

export const requestListReducer = (state = [], action) => {
  const { payload, type } = action

  switch (type) {
    case SET_REQUEST_LIST: {
      const { requestList } = payload
      return requestList
    }
    case DELETE_REQUEST: {
      const { id, stateId } = payload
      return  state.filter(el => el.id!== id)
    }

    default: {
      return state;
    }
  }
}

