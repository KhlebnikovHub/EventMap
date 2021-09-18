import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../../redux/actions/allUsers.action';
import OneOfAllUsers from '../OneOfAllUsers/OneOfAllUsers';


function AllUsers() {

  const dispatch = useDispatch()
  const { list, isLoading, error } = useSelector((state) => state.allUsers)

  console.log("Vse LYDI", list);

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <>
   
    
    {list?.map((el) => { return (
      <OneOfAllUsers key={el.id} {...el}/>
 
    )
    })}

    </>
    
  )
}

export default AllUsers
