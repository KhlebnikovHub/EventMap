import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getOneUser } from '../../redux/actions/OneUser.action'
import OneUserEventList from '../OneUserEventList/OneUserEventList'

function OneUserInfo() {

  const dispatch = useDispatch()
  const { id } = useParams();

  const { list, isLoading, error } = useSelector((state) => state.oneUser)

  useEffect(() => {
    dispatch(getOneUser(id))
  }, [])
  
  return (
    <div>
      <br/>
      <img src={list?.avatar} style={{ width: '200px'}}/>
      <p>{list?.lastname}</p>
      <p>{list?.email}</p>
      <p>{list?.firstname}</p>
      <div>
        {list?.Events?.map((el) => <OneUserEventList key={el.id} {...el} />
        )}
      </div>
    </div>
  )
}

export default OneUserInfo
