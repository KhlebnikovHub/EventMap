import { useState } from "react";
import { useDispatch } from "react-redux";
import { editAvaToBack } from "../../redux/actions/currentUser.action";

function ProfileUserCard({ id, firstname, lastname, email, avatar  }) {
  console.log("IDIDIDIDI", id);

  const dispatch = useDispatch();

  const editAvaHandler = (event) => {
    event.preventDefault();
    console.log(event.target.avatar.files[0])
    const file = event.target.avatar.files[0];
    const formData = new FormData()
    formData.append('avatar', file)
    dispatch(editAvaToBack(id, formData))
    event.target.reset()
  }

  const [drag, seDrag] = useState(false)

  const dragStartHandler = (event) => {
    event.preventDefault()
  }
  const dragLeaveHandler = (event) => {
    event.preventDefault()
  }

  const dropHandler = (event) => {
    event.preventDefault()
    let fileDrag = event.dataTransfer.files[0];
    const formDragData = new FormData();
    formDragData.append('avatar', fileDrag)
    console.log(formDragData)
    dispatch(editAvaToBack(id, formDragData))
  }
  if(!avatar?.includes('http')) {
    console.log('AVAVAVAVAVA', avatar)
    avatar = `${process.env.REACT_APP_API_URL}${avatar}`
  }

  return (
    <>
      
      <p>{firstname }</p>
      <p>{lastname}</p>
      <p>{email}</p>
      <div 
      encType="multipart/form-data"
      name="avatar"
      onDragStart={e => dragStartHandler(e)}
      onDragLeave={e => dragLeaveHandler(e)}
      onDragOver={e => dragStartHandler(e)}
      onDrop={dropHandler}
      >
      <img  src={`${avatar}`} style={{ width: '300px' }} />
      </div>
      <form onSubmit={editAvaHandler} encType="multipart/form-data">
        <input type="file" name="avatar" />
        <button>send</button>
      </form>
    </>

  )
}

export default ProfileUserCard;
