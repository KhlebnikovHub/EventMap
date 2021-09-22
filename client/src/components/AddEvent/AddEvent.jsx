import style from "./AddEvent.module.css";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import { useSelector } from "react-redux";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function AddEvent({ newCoords, imgName, address, setImgName, selectedOrganization }) {


  const currentUserFromState = useSelector((state) => state.currentuser);
  const user_id = currentUserFromState?.id

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target)


    const file = event.target?.event_image?.files[0];
    console.log('FILEE', file);
    const formData = new FormData()
    formData.append('img', file)
    console.log('FORMDATAAA', formData);
    data.append('user_id', user_id)
    data.append('newCoords', newCoords);
    console.log("COOOOOOORDISHE", newCoords);

    const responseData = await fetch(`${process.env.REACT_APP_API_URL}/event/newEvent`, {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json;charset=utf-8' },
      // body: JSON.stringify({ ...data, user_id, newCoords }),
      body: data,
      credentials: "include"
    })

    const answerData = await responseData.json();
    console.log(answerData);
    // const responseDataId = answerData.id;
    // const responseImage = await fetch(`${process.env.REACT_APP_API_URL}/event/newEvent/${responseDataId}`, {
    //   method: 'POST',
    //   body: formData,
    //   credentials: "include"
    // })



    // const formDragData = new FormData();
    // formDragData.append('img', imgFile)
    // await fetch(`${process.env.REACT_APP_API_URL}/event/newEvent`, {
    //   method: 'POST',
    //   body: formDragData
    // })


  };

  const dragStartHandler = (event) => {
    event.preventDefault()
  }
  const dragLeaveHandler = (event) => {
    event.preventDefault()
  }
  const dropHandler = async (event) => {
    event.preventDefault()
    const fileDrag = event.dataTransfer.files[0];
    setImgName(event.dataTransfer.files[0].name);
    const formDragData = new FormData();
    formDragData.append('img', fileDrag);
    await fetch(`${process.env.REACT_APP_API_URL}/event/setimage`, {
      method: 'POST',
      body: formDragData,
    })
  }


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
          defaultValue={address ? address : ''}
          name="place_name"
        />
        <Typography id="transition-modal-title" variant="h6" component="h2">
          { address && (<span>Адрес: {address}</span>)}
        </Typography>
        <Typography id="transition-modal-title" variant="h6" component="h2">
         Данные об организации: 
        </Typography>
        { selectedOrganization && (
            <>
          <p>{selectedOrganization?.name}</p>
                <p>{selectedOrganization?.description}</p>
                <p>{selectedOrganization?.workingTime}</p>
                <p>{selectedOrganization?.site}</p>
                </>
          )}
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

          Добавить фотографию <input type="file"  name="img" encType="multipart/form-data" />
          <div>
            <div
              encType="multipart/form-data"
              name="img"
              onDragStart={e => dragStartHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragOver={e => dragStartHandler(e)}
              onDrop={dropHandler}
            >
            
              <img src={`${process.env.REACT_APP_API_URL}/uploads/${imgName}`} style={{ width: '100px' }} />

            </div>
         Приватное событие <Checkbox
        {...label}
        name="private"
        value="true"
        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
      />
          </div>
          <button>Создать событие</button>
        </div>
      </form>
  )
}

export default AddEvent
