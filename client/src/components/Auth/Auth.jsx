import React from 'react'

function Auth() {

 const loginWithGoogle = (ev) => {
    ev.preventDefault();
    window.open(`${process.env.REACT_APP_API_URL}/user/signIn`, "_self");
  }

  const checkAuth = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/checkAuth`, {
        credentials: 'include'
      });
      const answer = await response.json();
      console.log(answer);
  }

  const logOut = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user/logOut`, {
      credentials: 'include'
    });
    const answer = await response.json();
    console.log(answer);
  }


  return (
    <>
      <button onClick={loginWithGoogle}>Авторизация через Google</button>
      <button onClick={checkAuth}>Проверочка =')'</button>
      <button onClick={logOut}>Вити надо Выти</button>
    </>
  )

}

export default Auth
