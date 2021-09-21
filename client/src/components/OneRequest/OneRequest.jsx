import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approveRequest, deleteRequest } from '../../redux/actions/requests.action'

function OneRequest({ id, avatar, firstname, lastname, email}) {

  const dispatch = useDispatch()

  const requestList = useSelector((state) => state.requestList)

  const currentUserFromState = useSelector((state) => state.currentuser);
  const stateId = currentUserFromState?.id
  
  const deleteRequestHandler = async (id) => {
  dispatch(deleteRequest(id, stateId))
  }

  const approveRequestHandler = async (id) => {
    dispatch(approveRequest(id, stateId))
    dispatch(deleteRequest(id, stateId))
  }

  return (
    <div>
      <br/>
      <img src={avatar} style={{ width: '250px' }}/>
      <p>{firstname}</p>
      <p>{lastname}</p>
      <p>{email}</p>
      <button onClick={() => approveRequestHandler(id)}>Prinyat'</button>
      <button onClick={() => deleteRequestHandler(id)}>Udalit'</button>
    </div>
  )
}

export default OneRequest
