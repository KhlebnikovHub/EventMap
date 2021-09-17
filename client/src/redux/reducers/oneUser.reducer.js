import { SET_ERROR, SET_LOADING, SET_ONE_USER } from "../types/oneUser"


export const oneUserReducer = (state = {}, action) => {
  const { type, payload, error } = action
  // const {response, idOfDevice} = payload
  // console.log("CHANGE PAYL:OAD",payload);

  switch (type) {
      case SET_ERROR: {
          return { list: state.list, isLoading: false, error }
      }
      case SET_LOADING: {
          return { list: state.list, isLoading: true, error: null }
      }
      case SET_ONE_USER: {
        const { oneUser } = payload
        return {...state, list: oneUser }
    }
      default: {
          return state;
      }
  }
}
