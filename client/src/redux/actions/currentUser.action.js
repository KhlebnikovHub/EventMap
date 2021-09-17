import { GET_CURRENT_USER } from "../types/currentUserTypes";
import axios from 'axios';

//action creater
export const getCurrentUser = (currentuser) => ({
  type: GET_CURRENT_USER,
  payload: { currentuser }
})



//midleware
export const setCurrentUser = (id) => async(dispatch) => {
  const response = await axios(`${process.env.REACT_APP_API_URL}/profile/${id}`)
  const currentUser = response.data; 
  console.log(currentUser);
  dispatch(getCurrentUser(currentUser)) 
}
