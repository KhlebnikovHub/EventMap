import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRequestList } from '../../redux/actions/requests.action'
import OneRequest from '../OneRequest/OneRequest'

function RequestList({id}) {

  const dispatch = useDispatch()
  
  const requestList = useSelector((state) => state.requestList)

  useEffect(() => [
    dispatch(getRequestList(id))
  ], [])

  return (
    <div>
      {requestList?.map(el => <OneRequest key={el.id} {...el} />)}
    </div>
  )
}

export default RequestList
