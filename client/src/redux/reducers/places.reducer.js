import { SET_ALL_PLACES, SET_PLACE, SET_EVENT, SET_LAST_PLACE, SET_ERROR, SET_LOADING, DELETE_EVENT } from "../types/places"


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
      return { ...state, list: allPlaces, isLoading: false }
    }
    case SET_PLACE: {
      const { place } = payload
      return { ...state, list: [...state.list, place], isLoading: false }
    }
    case SET_EVENT: {
      const { place } = payload
      state?.list?.map(onePlace => onePlace?.langitude === place?.langitude && onePlace?.latitude === place?.latitude? place : onePlace)
      return { ...state, list: state?.list?.map(onePlace => onePlace?.langitude === place?.langitude && onePlace?.latitude === place?.latitude? place : onePlace), isLoading: false }
    }
    case SET_LAST_PLACE: {
      const { place } = payload;
      return { ...state, lastPlace: place, isLoading: false }
    }
    case DELETE_EVENT: {
      const { deletedEvent } = payload;
      const placeId = deletedEvent?.place_id;
      const placeIndex = state?.list?.findIndex(el => el.id === placeId)
      if(state?.list[placeIndex]?.Events.length === 1) {
        return  { ...state, list: state?.list.filter((el, i) => i !== placeIndex) , isLoading: false }
      }
      state.list[placeIndex].Events = state.list[placeIndex]?.Events?.filter(el => el.id !== deletedEvent?.id)
      return { ...state, list: state?.list , isLoading: false }
    }
    default: {
      return state;
    }
  }
}
