import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/actions/allUsers.action'
import OneOfAllFriends from '../OneOfAllFriends/OneOfAllFriends'
import OneOfAllUsers from '../OneOfAllUsers/OneOfAllUsers'

function FriendList() {

  const dispatch = useDispatch()
  
  const { list, isLoading, error } = useSelector((state) => state.userFriends)
  // console.log("KAKA", list);

  // useEffect(() => {
  //   dispatch(getAllUsers())
  // }, [])


  return (
    <div>
            {list?.map((el) => { return (
        <OneOfAllFriends key={el?.id} {...el}/>
      )
      })}
    </div>
  )
}

export default FriendList
