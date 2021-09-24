

import { useParams } from "react-router";
import { getEvent } from "../../redux/actions/getEvent.action.js";
import { editEvent } from "../../redux/actions/getEvent.action.js";
import EventEditForm from "../EventEditForm/EventEditForm.jsx";
import style from "./Event.module.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtherPhotoInput from "../OtherPhotoInput/OtherPhotoInput.jsx";
import DiscInput from "../DiscInput/DiscInput.jsx";

function Event() {
  const currentUserFromState = useSelector((state) => state.currentuser);
 
  const [showEditButton, setShowEditButton] = useState(true)
  const [showSubmitButton, setShowSubmitButton] = useState(false)

  const [inputChange, setInputChange] = useState(<DiscInput />);
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => {
    
    return state.event });

  const { id } = useParams();

  useEffect(() => {
    dispatch(getEvent(id));
  }, []);

  const editEventHandler = async (e) => {
    e.preventDefault();
    const newFormData = Object.fromEntries(new FormData(e.target));
    dispatch(editEvent(id, newFormData));
  }

  const switchEditFrom = () => {
    setShowEditButton(!showEditButton)
    setShowSubmitButton(!showSubmitButton)
  }

  if(list) {
    if (!list?.image?.includes("http")) {
      list.image = `${process.env.REACT_APP_API_URL}${list?.image}`;
       }
  }
  
    
    const DiscInputHandler = () => {
      setInputChange(<DiscInput id={id} />);
    };
  const PhotoInputHandler = () => {
    setInputChange(<OtherPhotoInput id={id} />);
  };
  // useEffect(() => {
   
  // }, [list])

  return (
    <>
    
   {list?.User?.email === currentUserFromState?.email ? 
      <div>
        <button onClick={DiscInputHandler}>
          Загрузить данные с GoogleDisc
        </button>
        <button onClick={PhotoInputHandler}>
          Загрузить обычное фото
        </button>
        <div>{inputChange}</div>
      </div>
   : ''} 

   

     {showEditButton && <div className={style.event}>
        <div className={style.event__pic_wrapper}>
          {/* <img className={style.event__pic} src={`${image}`} alt="" />
        </div> */}

          <img className={style.event__pic} src={list?.image} alt="" />
        </div>
        {list?.Images?.map(image => {
         return (  <img className={style.event__pic} src={image?.path} alt="" />
          )})}
        <div className={style.event__info}>
          <div className={style.event__text_box}>
         
            <p className={style.event__text_title}>Название: </p>
            <p className={style.event__text}>{list?.name}</p>
          </div>

          <div className={style.event__text_box}>
            <p className={style.event__text_title}>Описание: </p>
            <p className={style.event__text}>{list?.description}</p>
          </div>

          <div className={style.event__text_box}>
            <p className={style.event__text_title}>Место:</p>
            <p className={style.event__text}>{list?.Place?.name}</p>
          </div>

          <div className={style.event__text_box}>
            <p className={style.event__text_title}>Автор:</p>
            <p className={style.event__text}>
              {list?.User?.firstname} {list?.User?.lastname}
            </p>
          </div>
          {list?.User?.email === currentUserFromState?.email ? 
            <button onClick={switchEditFrom}>
            Редактировать
          </button>
          : ''}
          
        </div>
      </div>}

      {showSubmitButton && 
            <form name="name" onSubmit={(e) => { editEventHandler(e); switchEditFrom()}}>
            <input name='name' placeholder="имя" type="text" />
            <input name='description' placeholder="описание" type="text" />
            <input name='image' placeholder="ссылка на картинку" type="text" />
            <button type="submit" >
              Принять
            </button>
          </form>  }

    </>
  );
}

export default Event;
