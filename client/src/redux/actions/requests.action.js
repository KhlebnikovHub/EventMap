import axios from "axios"
import { ADD_TO_REQUEST, APPROVE_REQUEST, DELETE_REQUEST, SET_REQUEST_LIST } from "../types/friends"


export const getRequestList = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/friends/requests/${id}`, { withCredentials: true })
    const requestList = response.data
    dispatch(setRequestList(requestList))
  } catch (error) {
    console.log(error);
  }
}

export const addToRequest = (id, stateId) => async (dispatch) => {
  try {
  const response = await axios({
    method: 'POST',
    url:  `${process.env.REACT_APP_API_URL}/friends/${stateId}`,
    data: { id },
    withCredentials: true
  })
  const newRequest = response.data

  dispatch(setNewRequest(newRequest, id))
  } catch (error) {
    console.log(error);
  }
}

export const deleteRequest = (id, stateId) => async(dispatch) => {
  const response = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API_URL}/friends/requests/${stateId}`,
    data: { id },
    withCredentials: true
  })
  if (response) {
  dispatch(setDeleteRequest(id, stateId))
  }
}

export const approveRequest = (id, stateId) => async(dispatch) => {
  const response = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/friends/requests/${stateId}`,
    data: { id },
    withCredentials: true
  })
  const newFriend = response.data
  dispatch(setApproveRequest(newFriend))
}

export const setNewRequest = (newRequest, id) => ({
  type: ADD_TO_REQUEST,
  payload: { newRequest, id }
})

export const setApproveRequest = (newFriend) => ({
  type: APPROVE_REQUEST,
  payload: { newFriend }
})

export const setDeleteRequest = (id, stateId) => ({
  type: DELETE_REQUEST,
  payload: {id, stateId}
})

export const setRequestList = (requestList) => ({
  type: SET_REQUEST_LIST,
  payload: { requestList }
})
