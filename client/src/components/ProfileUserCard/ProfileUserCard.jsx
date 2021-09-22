import React, { useEffect } from "react";
import { useParams } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { editAvaToBack } from "../../redux/actions/currentUser.action";
import { getProfileEvents } from "../../redux/actions/getProfileEvents.action";
import exifr from "exifr";

import style from "./ProfileUserCard.module.css";
import eventStyle from '../Event/Event.module.css';

function ProfileUserCard({ id, firstname, lastname, email, avatar }) {
  console.log("IDIDIDIDI", id);

  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector(
    (state) => state.profileEvents
  );

  useEffect(() => {
    dispatch(getProfileEvents(id));
  }, []);

  const editAvaHandler = async (event) => {
    event.preventDefault();

    const file = event.target.img.files[0];

    // let {latitude, longitude} = await exifr.gps(file);
    // console.log(latitude, longitude)

    const formData = new FormData();
    formData.append("img", file);
    dispatch(editAvaToBack(id, formData));
    event.target.reset();
  };

  const dragStartHandler = (event) => {
    event.preventDefault();
  };
  const dragLeaveHandler = (event) => {
    event.preventDefault();
  };

  const dropHandler = async (event) => {
    event.preventDefault();
    let fileDrag = event.dataTransfer.files[0];

    //et {latitude, longitude} = await exifr.gps(fileDrag);
    //console.log('GPS', latitude, longitude)

    const formDragData = new FormData();
    formDragData.append("img", fileDrag);
    dispatch(editAvaToBack(id, formDragData));
  };

  if (!avatar?.includes("http")) {
    avatar = `${process.env.REACT_APP_API_URL}${avatar}`;
  }

  return (
    <>
      <section className={style.profile_wrapper}>
        <div className={style.profile}>
          <div className={style.profile__inner_pic}>
            <img className={style.profile__pic} id="img" src={`${avatar}`} />
          </div>

          <div className={style.profile__inner_info}>
            <p className={style.profile__text}>{firstname}</p>
            <p className={style.profile__text}>{lastname}</p>
            <p className={style.profile__text}>{email}</p>
          </div>

          <div className={style.profile__inner_dragger}>
            <div
              className={style.profile__dragger}
              encType="multipart/form-data"
              name="img"
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
              onDrop={dropHandler}
            ></div>
          </div>

          <div className={style.profile__inner_form}>
            <form
              className={style.profile__form}
              onSubmit={editAvaHandler}
              encType="multipart/form-data"
            >
              <input className={style.profile__input} type="file" name="img" />
              <button className={style.profile__button}>send</button>
            </form>
          </div>
        </div>

        <div className={style.profile__profileEvents}>
        <div className={eventStyle.event}>
          <div className={eventStyle.event__pic_wrapper}>
            <img className={eventStyle.event__pic} src={list[0].image} alt=""/>
          </div>

          <div className={eventStyle.event__info}>
            <p className={eventStyle.event__text}>{list[0].name}</p>

            <p className={eventStyle.event__text}>{list[0].description}</p>

            <p className={eventStyle.event__text}>{list[0].Place?.name}</p>

            <p className={eventStyle.event__text}>{list[0].User?.firstname} {list[0].User?.lastname}</p>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}

export default ProfileUserCard;
