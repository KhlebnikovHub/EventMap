import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import style from "./Header.module.css";

import logo from "../../img/EventMap__logo.png";

import EventIcon from "@material-ui/icons/Event";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router"
import { useEffect } from "react";
import { setCurrentUser } from "../../redux/actions/currentUser.action";

function Header() {
  const currentUserFromState = useSelector((state) => state.currentuser);
 
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const dispatch = useDispatch();
  // const currentUserFromState = useSelector((state) => state.currentuser);


  useEffect(() => {
    dispatch(setCurrentUser(history, from))
  }, [])

  return (

    <>
      <header className={style.header}>
        <section className={style.header__inner}>
          <Link to="/" className={style.header__logoPart}>
            <img src={logo} className={style.header__logo} alt="logo" />
          </Link>

          <nav className={style.header__navPart}>
            <ul className={style.header__navBar}>
              <Link to="/Events" className={style.header__nav}>
                <EventIcon
                  fontSize="large"
                  className={style.header__nav_icon}
                />
              </Link>
              <p className={style.header__nav_text}>Мои события</p>
              {/* Мои события  */}

              <Link to={`/Profile`} className={style.header__nav}>
                <AccountBoxIcon fontSize="large" className={style.header__nav_icon} />

              </Link>

              <p className={style.header__nav_text}>Профиль</p>
              {/* Профиль */}

              <Link to="/AllUsers" className={style.header__nav}>
                <RecentActorsIcon
                  fontSize="large"
                  className={style.header__nav_icon}
                />
              </Link>

              <Link to={`/Friends/${currentUserFromState?.id}`} className={style.header__nav}>
                <PeopleIcon fontSize="large" className={style.header__nav_icon} />

              </Link>

              <p className={style.header__nav_text}>Друзья</p>
              {/* Друзья */}

              <Link to="/Auth" className={style.header__nav}>
                <ExitToAppIcon
                  fontSize="large"
                  className={style.header__nav_icon}
                />
              </Link>

              <p className={style.header__nav_text}>Выйти</p>
              {/* Выйти */}
            </ul>
          </nav>
        </section>
      </header>
    </>
  );
}

export default Header;
