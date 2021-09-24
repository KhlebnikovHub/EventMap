import style from "./AddEvent.module.css";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlace } from "../../redux/actions/places.action";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



function AddEvent({ newCoords, imgName, address, setImgName, selectedOrganization, files, handleClose, setNewCoords }) {


  const dispatch = useDispatch();

  const [image, setImage] = useState(null);

  const inputFile = useRef(null);

  let reader = new FileReader();
  reader.addEventListener('load', () => {
    setImage(reader.result);
  })
  useEffect(() => {
    if (files) {
      inputFile.current.files = files;
      reader.readAsDataURL(files[0]);
    }
  }, []);



  const currentUserFromState = useSelector((state) => state.currentuser);
  const user_id = currentUserFromState?.id

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target)


    const file = event.target?.img?.files[0];
    
    const formData = new FormData()
    formData.append('img', file)

    data.append('user_id', user_id)
    data.append('newCoords', newCoords);


    dispatch(addPlace(data));
  };

  const dragStartHandler = (event) => {
    event.preventDefault()
  };
  const dragLeaveHandler = (event) => {
    event.preventDefault()
  };
  const dropHandler = async (event) => {
    event.preventDefault()
    inputFile.current.files = event.dataTransfer.files;
    reader.readAsDataURL(event.dataTransfer.files[0]);
  };

  const imgHandler = (event) => {
    reader.readAsDataURL(event.target.files[0]);
  };


  return (

    <form onSubmit={submitHandler} name="newEvent">
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Введите название места
      </Typography>
      
      <TextField
        id="outlined-multiline-flexible"
        label="Название места"
        multiline
        maxRows={4}

        name="place_name"
      />
      {address ? <Typography id="transition-modal-title" variant="h6" component="h2">
        Адрес: <p>{address}</p>
      </Typography> : ''}
      {selectedOrganization ? (
        <>
        <p>Данные об организации</p>
        <p>{selectedOrganization?.name}</p>
        <p>{selectedOrganization?.description}</p>
        <p>{selectedOrganization?.workingTime}</p>workingTime
        </>
      ) : ''}
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Введите данные о событии
      </Typography>
      <div>

        <TextField
          id="outlined-multiline-flexible"
          label="Название события"
          multiline
          maxRows={4}

          name="name"
        />

        <TextField
          id="outlined-multiline-static"
          label="Описание"
          multiline
          rows={4}
          name="description"
        />
        <div>
          <input className={style.dateinput} type="datetime-local" name="event_date"

          />
        </div>

        Добавить фотографию <input type="file" name="img" encType="multipart/form-data" onChange={imgHandler} ref={inputFile} />
        <div>
          <div

            name="img"
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            onDrop={dropHandler}
          >

            <img src={image} name='eventImg' style={{ width: '100px' }} alt='' />

          </div>
          Приватное событие <Checkbox
            {...label}
            name="private"
            value="true"
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
          />
        </div>
        <button onClick={() => {
          setTimeout(() => {
            setNewCoords([])
            handleClose();
          }, 100)
          
        }}>Создать событие</button>
      </div>
    </form>
  )
}

export default AddEvent
