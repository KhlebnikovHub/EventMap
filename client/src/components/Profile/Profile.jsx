import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { setCurrentUser } from '../../redux/actions/currentUser.action';
import ProfileUserCard from '../ProfileUserCard/ProfileUserCard';

function Profile() {

  const currentUserFromState = useSelector((state) => state.currentuser);
  const dispatch = useDispatch();

  const id = 1 

  console.log(id)

  useEffect(() => {
    const curr = dispatch(setCurrentUser(id))
    console.log(curr)
  }, [id])

  return (
    <>
      <ProfileUserCard {...currentUserFromState}/>
    </>
  )
}

export default Profile
