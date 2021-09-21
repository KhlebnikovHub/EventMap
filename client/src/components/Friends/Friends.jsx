import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllFriends } from "../../redux/actions/friends.action";
import FriendList from "../FriendList/FriendList.jsx";
import OneOfAllUsers from "../OneOfAllUsers/OneOfAllUsers";
import RequestList from "../RequestList/RequestList";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import style from "./Friends.module.css";

import Button from "@mui/material/Button";

import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: red[300],
    },
  },
});

function Friends() {
  const [friendsPage, setFriendsPage] = useState(<FriendList />);

  const { id } = useParams();

  
  const friendHandler = () => {
    setFriendsPage(<FriendList />);
  };

  const requestHandler = () => {
    setFriendsPage(<RequestList id={id} />);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFriends(id));
  }, []);

  return (
    <>
      <section className={style.friends}>
        <div className={style.friends__buttons}>
          <Button
            variant="contained"
            color="primary"
            className={style.friends__button}
            onClick={friendHandler}
          >
            {" "}
            Мои друзья
          </Button>

          <Button
                        variant="contained"
            color="primary"
            className={style.friends__button} onClick={requestHandler}>
            {" "}
            Запросы в друзья
          </Button>
        </div>
        <div className={style.friends__wrapper}>{friendsPage}</div>
      </section>
    </>
  );
}

export default Friends;
