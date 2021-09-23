

import { useParams } from "react-router";
import { getEvent } from "../../redux/actions/getEvent.action.js";
import { editEvent } from "../../redux/actions/editEvent.action.js";
import EventEditForm from "../EventEditForm/EventEditForm.jsx";
import style from "./Event.module.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtherPhotoInput from "../OtherPhotoInput/OtherPhotoInput.jsx";
import DiscInput from "../DiscInput/DiscInput.jsx";

function Event() {
  const currentUserFromState = useSelector((state) => state.currentuser);
  // console.log("KYKYKYKYKYK", currentUserFromState);
  // if (currentUserFromState) {
  //   return <EventEditForm />
  // }

  const [inputChange, setInputChange] = useState(<OtherPhotoInput />);
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => {
    console.log("PISYAPOPA", state.event.list);
    
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

 

  const DiscInputHandler = () => {
    setInputChange(<DiscInput id={id} />);
  };

  const requestHandler = () => {
    setInputChange(<OtherPhotoInput id={id} />);
  };
  useEffect(() => {
    console.log("NOVOE GAVNO", list)
  }, [list])

  return (
    <>
   {list?.User?.email === currentUserFromState?.email ? <div>
              <button onClick={DiscInputHandler}>
            Загрузить данные с GoogleDisc
          </button>
          <button onClick={requestHandler}>
            Загрузить обычное фото
          </button>
          <div>{inputChange}</div>
    </div> : ''} 

      <div className={style.event}>
        <div className={style.event__pic_wrapper}>

       


          <img className={style.event__pic} src={list?.image} alt="" />
        </div>
        {list?.Images.map(image => {
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
        </div>
      </div>


      {/* <form name="name" onSubmit={editEventHandler}>
          <input name='name' placeholder="имя" type="text" />
          <input name='description' placeholder="описание" type="text" />
          <input name='image' placeholder="ссылка на картинку" type="text" />
          <button>
            аааа
          </button>
        </form> */}
    </>
  );
}

export default Event;
