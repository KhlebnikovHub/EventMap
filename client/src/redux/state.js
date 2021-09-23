export const initialState = {
  allUsers: {
    list: [],
    isLoading: false,
    error: false
  },
  oneUser: {
    list: {},
    isLoading: false,
    error: false
  },
  currentuser: null,
  userFriends: {  
    list: [],
    isLoading: false,
    error: false
  },
  requestList: [],
  allPlaces: {
    list: [],
    isLoading: false,
    error: false,
    lastPlace: null
  },
  randomPlaces: {
    list: [],
    isLoading: false,
    error: false
  },
  event: {
    list: [],
    isLoading: false,
    error: false
  },
  profileEvents: {
    list: [],
    isLoading: false,
    error: false
  }
}

const getInitState = () => {
  const stateFromLS = JSON.parse(window.localStorage.getItem('redux'))
  return stateFromLS ? stateFromLS : initialState

}

export default getInitState
