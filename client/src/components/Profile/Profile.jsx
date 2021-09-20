import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../redux/actions/currentUser.action';
import ProfileUserCard from '../ProfileUserCard/ProfileUserCard';

function Profile() {

  const currentUserFromState = useSelector((state) => state.currentuser);
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
