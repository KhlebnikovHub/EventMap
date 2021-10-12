import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFriendsFromAllUsers } from "../../redux/actions/allUsers.action.js";
import { addToRequest } from "../../redux/actions/requests.action.js";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Button from "@mui/material/Button";

import style from "./OneOfAllUsers.module.css";

import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: red[300],
    },
  },
});


export default function OneOfAllUsers({
  id,
  email,
  firstname,
  lastname,
  avatar,
  Requests,
  Friends,
}) {
  const dispatch = useDispatch()
  
  const currentUserFromState = useSelector((state) => state.currentuser);
  const { list, isLoading, error } = useSelector((state) => state.userFriends)
  const allUsers = useSelector((state) => state.allUsers);

  if (!avatar?.includes("http")) {
    avatar = `${process.env.REACT_APP_API_URL}${avatar}`;
  }
  const stateId = currentUserFromState?.id

  const addToRequestHandler = async (id) => {
    dispatch(addToRequest(id, stateId));
  };

  const deleteFromFriendsHandler = (id) => {
    dispatch(deleteFriendsFromAllUsers(id, stateId));
  };

  return (
    <div className={style.userCard}>
      <div className={style.userCard__pic_wrapper}>
        <img src={`${avatar}`} className={style.userCard__pic} />
      </div>
      <div className={style.userCard__info}>
        <p className={style.userCard__text}>{email}</p>
        <p className={style.userCard__text}>{firstname}</p>
        <p className={style.userCard__text}>{lastname}</p>

        <div className={style.userCard__buttons}>
          <Link
            to={`/User/${id}`}
            className={style.userCard__btn_m}
            variant="contained"
            color="primary"
          >
            Подробнее
          </Link>

          {id !== stateId && stateId ? (
            Friends?.find(
              (el) => el.user_id === stateId && el.friend_id === id
            ) ? (
              <Button
                className={style.userCard__btn_m}
                variant="contained"
                onClick={() => deleteFromFriendsHandler(id)}
              >
                Удалить
              </Button>
            ) : Requests?.find(
                (el) => el.applicant_id === stateId && el.respondent_id === id
              ) ? (
              <Button className={style.userCard__btn_m} variant="contained">
                Отправлено
              </Button>
            ) : (
              <Button
                className={style.userCard__btn_m}
                variant="contained"
                onClick={() => addToRequestHandler(id)}
              >
                Добавить
              </Button>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
