import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteFriendsFromAllUsers } from '../../redux/actions/allUsers.action.js';
import { addToRequest } from '../../redux/actions/requests.action.js';
import Header from "../Header/Header.jsx";



export default function OneOfAllUsers({ id, email, firstname, lastname, avatar, Requests, Friends }) {
 if(!avatar?.includes('http')) {
    avatar = `${process.env.REACT_APP_API_URL}${avatar}`
  }
  const dispatch = useDispatch()
  

  const { list, isLoading, error } = useSelector((state) => state.userFriends)

  const stateId = 3

  const addToRequestHandler = async (id) => {
    dispatch(addToRequest(id, stateId))
  }

  const deleteFromFriendsHandler = (id) => {
    dispatch(deleteFriendsFromAllUsers(id, stateId))

  }


  return (
    <div>
      <br/>
      <img src={`${avatar}`} style={{width: '300px'}}/>
      <p>{email}</p>
      <p>{firstname}</p>
      <p>{lastname}</p>
      <br/>
      <Link to={`/User/${id}`} >Podrobnee</Link>
      <br/>
      
      {(id !== stateId) ?
      (Friends?.find(el => el.user_id === stateId && el.friend_id === id) ?
      <button onClick={() => deleteFromFriendsHandler(id)}>UDALIT'</button> :
      (Requests?.find(el => el.applicant_id === stateId && el.respondent_id === id ) ? 
      <p >zayzvka Otpravlena</p> :
      <button onClick={() => addToRequestHandler(id)}>Dobavit' v druz'ya</button>))
      : ''
       } 
      <hr/>
    </div>
  )
}

