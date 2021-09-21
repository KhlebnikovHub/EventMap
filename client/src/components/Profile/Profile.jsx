import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, setCurrentUser } from '../../redux/actions/currentUser.action';
import ProfileUserCard from '../ProfileUserCard/ProfileUserCard';

function Profile() {

  const currentUserFromState = useSelector((state) => state.currentuser);
  console.log("CURENTUSER", currentUserFromState);
  const dispatch = useDispatch();


  const id = 1 


  useEffect(() => {
    dispatch(setCurrentUser(id))
    
  }, [id, currentUserFromState.avatar])


  return (
    <>
      <ProfileUserCard {...currentUserFromState}/>
    </>
  )
}

export default Profile
