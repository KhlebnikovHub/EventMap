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

function Header() {
  const id = 1;

  return (
    <>
      <header className={style.header}>
        <section className={style.header__inner}>
          <div className={style.header__logoPart}>
            <img src={logo} className={style.header__logo} alt="logo" />
          </div>

          <nav className={style.header__navPart}>
            <ul className={style.header__navBar}>
              <Link to="/Events" className={style.header__nav}>
                <EventIcon fontSize="large" className={style.header__nav_icon}/>
                <p className={style.header__nav_text}>Мои события</p>
                {/* Мои события  */}
              </Link>

              <Link to={`/Profile/${id}`} className={style.header__nav}>
                <AccountBoxIcon fontSize="large" className={style.header__nav_icon} />
                <p className={style.header__nav_text}>Профиль</p>
                {/* Профиль */}
              </Link>

              <Link to="/AllUsers" className={style.header__nav}>
                <RecentActorsIcon fontSize="large" className={style.header__nav_icon} />
                <p className={style.header__nav_text}>Пользователи</p>
                {/* Пользователи */}
              </Link>

              <Link to={`/Friends/${id}`} className={style.header__nav}>
                <PeopleIcon fontSize="large" className={style.header__nav_icon} />
                <p className={style.header__nav_text}>Друзья</p>
                {/* Друзья */}
              </Link>

              <Link to="/Auth" className={style.header__nav}>
                <ExitToAppIcon fontSize="large" className={style.header__nav_icon} />
                <p className={style.header__nav_text}>Выйти</p>
                {/* Выйти */}
              </Link>
            </ul>
          </nav>
        </section>
      </header>
    </>
  );
}

export default Header;
