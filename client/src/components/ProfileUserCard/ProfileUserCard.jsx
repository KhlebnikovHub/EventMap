import { useDispatch } from "react-redux";
import { editAvaToBack } from "../../redux/actions/currentUser.action";
import exifr from 'exifr'

function ProfileUserCard({ id, firstname, lastname, email, avatar  }) {

  const dispatch = useDispatch();

  const editAvaHandler = async (event) => {
    event.preventDefault();
    const file = event.target.img.files[0];
    // let {latitude, longitude} = await exifr.gps(file);
    // console.log(latitude, longitude)
 
    const formData = new FormData()
    formData.append('img', file)
    dispatch(editAvaToBack(id, formData))
    event.target.reset()
  }

  const dragStartHandler = (event) => {
    event.preventDefault()
  }
  const dragLeaveHandler = (event) => {
    event.preventDefault()
  }

  const dropHandler = async (event) => {
    event.preventDefault()
    let fileDrag = event.dataTransfer.files[0];
    //et {latitude, longitude} = await exifr.gps(fileDrag);
    //console.log('GPS', latitude, longitude)
    const formDragData = new FormData();
    formDragData.append('img', fileDrag)
    dispatch(editAvaToBack(id, formDragData))
  }

  if(!avatar?.includes('http')) {
    avatar = `${process.env.REACT_APP_API_URL}${avatar}`
  }
  
 
  

  return (
    <>
      
      <p>{firstname }</p>
      <p>{lastname}</p>
      <p>{email}</p>
      <div 
      encType="multipart/form-data"
      name="img"
      onDragStart={e => dragStartHandler(e)}
      onDragLeave={e => dragLeaveHandler(e)}
      onDragOver={e => dragStartHandler(e)}
      onDrop={dropHandler}
      >
      <img id="img" src={`${avatar}`} style={{ width: '300px' }} />
      </div>
      <form onSubmit={editAvaHandler} encType="multipart/form-data">
        <input type="file" name="img" />
        <button>send</button>
      </form>
    </>

  )
}

export default ProfileUserCard;
