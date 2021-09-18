import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getAllFriends } from '../../redux/actions/friends.action'
import OneOfAllUsers from '../OneOfAllUsers/OneOfAllUsers'

function Friends() {

  const { list, isLoading, error } = useSelector((state) => state.userFriends)

  console.log("KEKEKE", list);

  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    dispatch(getAllFriends(id))
  }, [])

  return (
    <>
      {list?.map((el) => { return (
        <OneOfAllUsers key={el.id} {...el.User}/>
      )
      })}
    </>
  )
}

export default Friends
