import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getEvent } from "../../redux/actions/getEvent.action.js";
import { editEvent } from "../../redux/actions/editEvent.action.js";
import EventEditForm from "../EventEditForm/EventEditForm.jsx";
import style from "./Event.module.css";

function Event({ id, name, description, Place, User, image }) {
  // const currentUserFromState = useSelector((state) => state.currentuser);

  // if (currentUserFromState) {
  //   return <EventEditForm />
  // }

  // const dispatch = useDispatch();
  // const { list, isLoading, error } = useSelector((state) => state.event);

  // const { id } = useParams();

  // useEffect(() => {
  //   dispatch(getEvent(id));
  // }, []);

  // const editEventHandler = async (e) => {
  //   e.preventDefault();

  //   const newFormData = Object.fromEntries(new FormData(e.target));

  //   dispatch(editEvent(id, newFormData));
  // }
  if (!image?.includes("http")) {
    image = `${process.env.REACT_APP_API_URL}${image}`;
  }

  return (
    <>
      <div className={style.event}>
        <div className={style.event__pic_wrapper}>
          <img className={style.event__pic} src={`${image}`} alt="" />
        </div>

        <div className={style.event__info}>
          <div className={style.event__text_box}>
            <p className={style.event__text_title}>Название:</p>
            <p className={style.event__text}>{name}</p>
          </div>

          <div className={style.event__text_box}>
            <p className={style.event__text_title}>Описание:</p>
            <p className={style.event__text}>{description}</p>
          </div>

          <div className={style.event__text_box}>
            <p className={style.event__text_title}>Место:</p>
            <p className={style.event__text}>{Place?.name}</p>
          </div>

          <div className={style.event__text_box}>
            <p className={style.event__text_title}>Автор:</p>
            <p className={style.event__text}>
              {User?.firstname} {User?.lastname}
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
