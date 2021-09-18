import axios from "axios"
import { APPROVE_REQUEST, DELETE_REQUEST, SET_REQUEST_LIST } from "../types/friends"


export const getRequestList = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/friends/requests/${id}`)
    const requestList = response.data
    dispatch(setRequestList(requestList))
  } catch (error) {
    console.log(error);
  }
} 

export const deleteRequest = (id, stateId) => async(dispatch) => {
  const response = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API_URL}/friends/requests/${stateId}`,
    data: { id }
  })
  if (response) {
  dispatch(setDeleteRequest(id, stateId))
  }
}

export const approveRequest = (id, stateId) => async(dispatch) => {
  const response = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/friends/requests/${stateId}`,
    data: { id }
  })
  const newFriend = response.data
  console.log('ADSADSDDSADSAD', newFriend);
  dispatch(setApproveRequest(newFriend))
}

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
