import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


export default function OneOfAllUsers({ id, email, firstname, lastname, avatar, Requests, Friends }) {
 if(!avatar?.includes('http')) {
    avatar = `${process.env.REACT_APP_API_URL}${avatar}`
  }
  const dispatch = useDispatch()
  
  const stateId = 2

  const addToFriendsHandler = async (id) => {
    const response = await axios({
      method: 'POST',
      url:  `${process.env.REACT_APP_API_URL}/friends/${stateId}`,
      data: {id}
    })
     
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
      {id !== stateId ?

      (Requests?.find(el => el.applicant_id === stateId && el.respondent_id === id ) ? 
      <p >zayzvka Otpravlena</p> :
      <button onClick={() => addToFriendsHandler(id)}>Dobavit' v druz'ya</button>)
      : ''
       } 
      <hr/>
    </div>
  )
}

