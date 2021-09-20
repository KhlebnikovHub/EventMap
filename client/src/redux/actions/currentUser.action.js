import { EDIT_USER_AVATAR, GET_CURRENT_USER, LOG_OUT } from "../types/currentUserTypes";
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

export const setLogOut = () => ({
  type: LOG_OUT
}) 

//midleware
export const setCurrentUser = (history, from) => async(dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/checkAuth`, {
    credentials: 'include'
  });
  if (response.status === 200) {
  const currentuser = await response.json();
  dispatch(getCurrentUser(currentuser))
  // history.replace(from);
  }
  // history.replace('/signin')
}

export const logOut = () => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/logOut`, {
    credentials: 'include'
  });
  dispatch(setLogOut())
}

export const editAvaToBack = (id, newAva) => async(dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/${id}`, {
    method: 'PATCH',
    body: newAva,
    credentials: 'include'
  })
  console.log('=======', response.json())
  dispatch(editAva(response))
}
