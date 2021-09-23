import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approveRequest,
  deleteRequest,
} from "../../redux/actions/requests.action";

import style from "../OneOfAllUsers/OneOfAllUsers.module.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Button from "@mui/material/Button";

import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: red[300],
    },
  },
});

function OneRequest({ id, avatar, firstname, lastname, email }) {
  const dispatch = useDispatch();

  const requestList = useSelector((state) => state.requestList);

  const currentUserFromState = useSelector((state) => state.currentuser);
  const stateId = currentUserFromState?.id;

  if (!avatar?.includes("http")) {
    avatar = `${process.env.REACT_APP_API_URL}${avatar}`;
  }

  const deleteRequestHandler = async (id) => {
    dispatch(deleteRequest(id, stateId));
  };

  const approveRequestHandler = async (id) => {
    dispatch(approveRequest(id, stateId));
    dispatch(deleteRequest(id, stateId));
  };

  return (
    <div className={style.userCard}>
      <div className={style.userCard__pic_wrapper}>
        <img src={avatar} className={style.userCard__pic} />
      </div>

      <div className={style.userCard__info}>
        <p className={style.userCard__text}>{firstname}</p>
        <p className={style.userCard__text}>{lastname}</p>
        <p className={style.userCard__text}>{email}</p>
        <div className={style.userCard__buttons}>
          <Button
            className={style.userCard__btn_m}
            variant="contained"
            onClick={() => approveRequestHandler(id)}
          >
            Принять
          </Button>

          <Button
            className={style.userCard__btn_m}
            variant="contained"
            onClick={() => deleteRequestHandler(id)}
          >
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OneRequest;
