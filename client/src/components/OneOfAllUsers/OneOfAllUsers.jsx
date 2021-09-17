import React from 'react'
import { Link } from 'react-router-dom';

export default function OneOfAllUsers({ id, email, firstname, lastname, avatar }) {
  console.log("KYKYK");
  return (
    <div>
      <br/>
      <img src={avatar} style={{width: '300px'}}/>
      <p>{email}</p>
      <p>{firstname}</p>
      <p>{lastname}</p>
      <br/>
      <Link to={`/User/${id}`} >Podrobnee</Link>
      <hr/>
    </div>
  )
}

