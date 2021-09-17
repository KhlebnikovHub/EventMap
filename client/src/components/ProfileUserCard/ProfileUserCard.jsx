import axios from "axios";
import { useDispatch } from "react-redux";

function ProfileUserCard({ id, firstname, lastname, email, avatar  }) {

  const dispatch = useDispatch();

  const editAvaHandler = (event) => {
    event.preventDefault();
    console.log(event.target.avatar.files[0])
    const file = event.target.avatar.files[0];
    const formData = new FormData()
    formData.append('avatar', file)
    //axios.post(`${process.env.REACT_APP_API_URL}/profile/${id}`, file)
    fetch(`${process.env.REACT_APP_API_URL}/profile/${id}`, {
      method: 'POST',
      body: formData
    })
    event.target.reset()
  }

  return (
    <>
      
      <p>{firstname }</p>
      <p>{lastname}</p>
      <p>{email}</p>
      <img src={avatar} style={{ width: '300px' }} />
      <form onSubmit={editAvaHandler} enctype="multipart/form-data">
        <input type="file" name="avatar" />
        <button>send</button>
      </form>
    </>

  )
}

export default ProfileUserCard;
