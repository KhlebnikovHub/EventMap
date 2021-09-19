import { EDIT_USER_AVATAR, GET_CURRENT_USER } from "../types/currentUserTypes";
import axios from 'axios';

//action creater
export const getCurrentUser = (currentuser) => ({
  type: GET_CURRENT_USER,
  payload: { currentuser }
})

export const editAva = ( { id, newAva } ) => ({
  type: EDIT_USER_AVATAR,
  payload: { id, newAva }
})

//midleware
export const setCurrentUser = (id) => async(dispatch) => {
  const response = await axios(`${process.env.REACT_APP_API_URL}/profile/${id}`)
  const currentUser = response.data; 
  dispatch(getCurrentUser(currentUser)) 
}


export const editAvaToBack = (id, newAva) => async(dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/${id}`, {
    method: 'PATCH',
    body: newAva
  })
  console.log('=======', response)
  dispatch(editAva(response))
}
