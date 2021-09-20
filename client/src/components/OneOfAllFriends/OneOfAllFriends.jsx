import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteFromFriends } from '../../redux/actions/friends.action'

function OneOfAllFriends({ id, email, firstname, lastname, avatar,}) {

 const dispatch = useDispatch()

 const stateId = 3
 
 const deleteFriendHandler  = (id) => {
   dispatch(deleteFromFriends(id, stateId))
 }

 return (
    <div>
      <br/>
      <img src={avatar} style={{width: '300px'}}/>
      <p>{email}</p>
      <p>{firstname}</p>
      <p>{lastname}</p>
      <br/>
      <Link to={`/User/${id}`} >Podrobnee</Link>
      <br/>
      <button onClick={() => deleteFriendHandler(id)}>UDALIT' IZ DRUZEI </button>
    </div>
  )
}

export default OneOfAllFriends
