import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import Start from '../Start/Start.jsx'
import Friends from '../Friends/Friends.jsx'
import Auth from '../Auth/Auth.jsx'
import Profile from '../Profile/Profile.jsx'
import AllUsers from '../AllUsers/AllUsers.jsx'
import Event from '../Event/Event.jsx'
import Map from '../Map/Map.jsx'

import style from "./Main.module.css";

function Main() {
  return (
    <>
      <main className={style.main}>
        <Switch>
          <Router exact path="/">
            <Start />
          </Router>

          <Router exact path="/Friends/:id">
            <Friends />
          </Router>

          <Router exact path="/Auth">
            <Auth />
          </Router>

          <Router exact path="/Profile/:id">
            <Profile />
          </Router>

          <Router exact path="/AllUsers">
            <AllUsers />
          </Router>

          <Router exact path="/Event/:id">
            <Event />
          </Router>

          <Router exact path="/Map/:id">
            <Map />
          </Router>
        </Switch>
        </main>
    </>
  );
}

export default Main;
