import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getEvent } from '../../redux/actions/getEvent.action.js';
import { editEvent } from '../../redux/actions/editEvent.action.js';
import EventEditForm from '../EventEditForm/EventEditForm.jsx'
import style from './Event.module.css';

function Event(
) {
  const currentUserFromState = useSelector((state) => state.currentuser);

  // if (currentUserFromState) {
  //   return <EventEditForm /> 
  // }

  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.event);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getEvent(id));
  }, []);

  const editEventHandler = async (e) => {
    e.preventDefault();
    
    const newFormData = Object.fromEntries(new FormData(e.target));
    
    dispatch(editEvent(id, newFormData));
  }

  return (
    <>
      <section className={style.event__wrapper}>
        <div className={style.event}>
          <div className={style.event__pic_wrapper}>
            <img className={style.event__pic} src={list?.image} alt=""/>
          </div>

          <div className={style.event__info}>
            <p className={style.event__text}>{list?.name}</p>

            <p className={style.event__text}>{list?.description}</p>

            <p className={style.event__text}>{list?.Place?.name}</p>

            <p className={style.event__text}>{list?.User?.firstname} {list?.User?.lastname}</p>
          </div>
        </div>



        <form name="name" onSubmit={editEventHandler}>
          <input name='name' placeholder="имя" type="text" />
          <input name='description' placeholder="описание" type="text" />
          <input name='image' placeholder="ссылка на картинку" type="text" />
          <button>
            аааа
          </button>
        </form>

      </section>
    </>
  )
}

export default Event
