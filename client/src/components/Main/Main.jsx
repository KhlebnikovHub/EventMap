import { Switch, Route, Redirect, Link } from "react-router-dom";

import Friends from "../Friends/Friends.jsx";
import Auth from "../Auth/Auth.jsx";
import Profile from "../Profile/Profile.jsx";
import AllUsers from "../AllUsers/AllUsers.jsx";
import Event from "../Event/Event.jsx";
import Map from "../Map/Map.jsx";
import OneUserInfo from "../OneUserInfo/OneUserInfo.jsx";

import style from "./Main.module.css";
import Events from "../Events/Events.jsx";

// import { createTheme, ThemeProvider } from "@mui/material/styles";

import Button from "@mui/material/Button";

import { red } from "@mui/material/colors";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: red[300],
//     },
//   },
// });

function Main() {
  return (
    <>
      <main id="mainid" className={style.main}>
        <Switch>
          <Route exact path="/">
            <Link to="/Events" className={`${style.main__title} ${style.main__title_zoom}`}>
              Создайте свою карту впечатлений!
            </Link>
          </Route>

          <Route exact path="/Events">
            <Events />
          </Route>

          <Route exact path="/Friends/:id">
            <Friends />
          </Route>

          <Route exact path="/Auth">
            <Auth />
          </Route>

          <Route exact path="/Profile/:id">
            <Profile />
          </Route>

          <Route exact path="/AllUsers">
            <AllUsers />
          </Route>

          <Route exact path="/Event/:id">
            <Event />
          </Route>

          <Route exact path="/Map/:id">
            <Map />
          </Route>

          <Route exact path="/User/:id">
            <OneUserInfo />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default Main;
