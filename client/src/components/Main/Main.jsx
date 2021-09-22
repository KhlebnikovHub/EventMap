import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { useHistory, useLocation } from "react-router"


import Friends from '../Friends/Friends.jsx'
import Auth from '../Auth/Auth.jsx'
import Profile from '../Profile/Profile.jsx'
import AllUsers from '../AllUsers/AllUsers.jsx'
import Event from '../Event/Event.jsx'
import Map from '../Map/Map.jsx'
import OneUserInfo from "../OneUserInfo/OneUserInfo.jsx";

import style from "./Main.module.css";
import Events from "../Events/Events.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, setCurrentUser } from "../../redux/actions/currentUser.action.js";
import { useEffect } from "react";
import PrivateRoute from "../PrivateRouter/PrivateRouter.js";

// import { createTheme, ThemeProvider } from "@mui/material/styles";

import Button from "@mui/material/Button";

import { red } from "@mui/material/colors";

import Pin from '../Pin/Pin.jsx';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: red[300],
//     },
//   },
// });

function Main() {


  // let history = useHistory();
  // let location = useLocation();

  // let { from } = location.state || { from: { pathname: "/" } };

  // const dispatch = useDispatch();
  // const currentUserFromState = useSelector((state) => state.currentuser);


  // useEffect(() => {
  //   dispatch(setCurrentUser(history, from))
  // }, [])

  return (
    <>
      <main id="mainid" className={style.main}>
        <Switch>
          <Route exact path="/">
            <Link to="/Events" className={`${style.main__title} ${style.main__title_zoom}`}>
              Создайте свою карту впечатлений!
            </Link>

            <Pin />
          </Route>

          <Route exact path="/Events">
            <Events />
          </Route>

          <PrivateRoute exact path="/Friends/:id">
            <Friends />
          </PrivateRoute>

          <Route exact path="/Auth">
            <Auth />
          </Route>

          <PrivateRoute exact path="/Profile">
            <Profile />
          </PrivateRoute>

          <Route exact path="/AllUsers">
            <AllUsers />
          </Route>

          <PrivateRoute exact path="/Event/:id">
            <Event />
          </PrivateRoute>

          <PrivateRoute exact path="/Map/:id">
            <Map />
          </PrivateRoute>

          <PrivateRoute exact path="/User/:id">
            <OneUserInfo />
          </PrivateRoute>
        </Switch>
      </main>
    </>
  );
}

export default Main;
