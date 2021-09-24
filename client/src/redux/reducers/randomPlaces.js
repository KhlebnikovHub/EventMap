import { SET_RANDOM_PLACES, SET_PLACE, SET_ERROR, SET_LOADING } from "../types/randomPlaces"


export const randomPlacesReducer = (state = {}, action) => {
  const { type, payload, error } = action
  // const {response, idOfDevice} = payload

  switch (type) {
      case SET_ERROR: {
          return { list: state.list, isLoading: false, error }
      }
      case SET_LOADING: {
          return { list: state.list, isLoading: true, error: null }
      }
      case SET_RANDOM_PLACES: {
        const { randomPlaces } = payload
        return {...state, list: randomPlaces, isLoading: false }
    }
    case SET_PLACE: {
      const { place } = payload
      return {...state, list: [...state.list, place], isLoading: false }
  }
      default: {
          return state;
      }
  }
}
