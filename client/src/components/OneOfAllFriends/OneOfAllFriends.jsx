import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFromFriends } from "../../redux/actions/friends.action";

// import style from './OneOfAllFriends.module.css'
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

function OneOfAllFriends({ id, email, firstname, lastname, avatar }) {
  const dispatch = useDispatch();
  const currentUserFromState = useSelector((state) => state.currentuser);
  const stateId = currentUserFromState?.id;

  const deleteFriendHandler = (id) => {
    dispatch(deleteFromFriends(id, stateId));
  };

  return (
    <div className={style.userCard}>
      <div className={style.userCard__pic_wrapper}>
        <img src={avatar} className={style.userCard__pic} />
      </div>

      <div className={style.userCard__info}>
        <p className={style.userCard__text}>{email}</p>
        <p className={style.userCard__text}>{firstname}</p>
        <p className={style.userCard__text}>{lastname}</p>

        <div className={style.userCard__buttons}>
          <Button
            to={`/User/${id}`}
            className={style.userCard__btn_m}
            variant="contained"
          >
            Подробнее
          </Button>
          <Button
            className={style.userCard__btn_m}
            variant="contained"
            onClick={() => deleteFriendHandler(id)}
          >
            Удалить{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OneOfAllFriends;
