import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router';
import { getCurrentUser, logOut } from '../../redux/actions/currentUser.action';

function Auth() {

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };



  const dispatch = useDispatch()

 const loginWithGoogle = (ev) => {
    ev.preventDefault();
    window.open(`${process.env.REACT_APP_API_URL}/user/signIn`, "_self");
  }

  const checkAuth = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/checkAuth`, {
        credentials: 'include'
      });
      const currentuser = await response.json();
      dispatch(getCurrentUser(currentuser))

  }

  const authLogOut = async () => {
    dispatch(logOut())

  }

  
  return (
    <>
      <button onClick={loginWithGoogle}>Авторизация через Google</button>
      <button onClick={checkAuth}>Проверочка =')'</button>
      <button onClick={authLogOut}>Вити надо Выти</button>
    </>
  )

}

export default Auth
