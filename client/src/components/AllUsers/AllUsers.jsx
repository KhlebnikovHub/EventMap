import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../../redux/actions/allUsers.action';
import OneOfAllUsers from '../OneOfAllUsers/OneOfAllUsers';


function AllUsers() {

  const dispatch = useDispatch()
  const { list, isLoading, error } = useSelector((state) => state.allUsers)
  console.log('ENTO LIST', list);
  const newArr = new Array(10).fill('');

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
