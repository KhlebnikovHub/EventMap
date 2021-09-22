import { SET_ALL_PLACES, ADD_PLACE, SET_ERROR, SET_LOADING } from "../types/places"


export const allPlacesReducer = (state = {}, action) => {
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
      case SET_ALL_PLACES: {
        const { allPlaces } = payload
        return {...state, list: allPlaces, isLoading: false }
    }
    case ADD_PLACE: {
      const { coords } = payload
      const [latitude, longitude] = coords;
      return {...state, list: [...state.list, { latitude, longitude }], isLoading: false }
  }
      default: {
          return state;
      }
  }
}
