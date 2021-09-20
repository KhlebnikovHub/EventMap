import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getAllFriends } from '../../redux/actions/friends.action'
import FriendList from '../FriendList/FriendList'
import OneOfAllUsers from '../OneOfAllUsers/OneOfAllUsers'
import RequestList from '../RequestList/RequestList'

function Friends() {

  const [friendsPage, setFriendsPage] = useState(<FriendList/>)

  
  
  const { id } = useParams()
  
  const friendHandler = () => {
    setFriendsPage(<FriendList/>)
  }

  const requestHandler = () => {
    setFriendsPage(<RequestList id={id}/>)
  }

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllFriends(id))
  }, [])

  return (
    <>
    <button onClick={friendHandler} > Friends List </button>
    <button onClick={requestHandler} > Request List </button>
  {friendsPage}
    </>
  )
}

export default Friends
