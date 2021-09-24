import { SET_RANDOM_PLACES, SET_PANORAMA, SET_ERROR, SET_LOADING } from "../types/panorama"


export const panoramaReducer = (state = {}, action) => {
  const { type, payload, error } = action
  // const {response, idOfDevice} = payload

  switch (type) {
      case SET_ERROR: {
          return { ...state, isLoading: false, error }
      }
      case SET_LOADING: {
          return { ...state, isLoading: true, error: null }
      }
    case SET_PANORAMA: {
      const { panorama } = payload
      return {...state, panorama: panorama, isLoading: false }
  }
      default: {
          return state;
      }
  }
}
