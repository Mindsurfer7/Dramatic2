import React, { useState } from "react";
import css from "./header.module.css";
import SearchBtn from "../tools/Search";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle } from "../../store/LoginSlice";
import logo from "../../pics/dramatic.png";
import { SettingOutlined } from "@ant-design/icons";
import SearchByActor from "../tools/SearchByActor";

const Header = (props) => {
  const { isLogged } = useSelector((state) => state.login);
  const { displayName } = useSelector((state) => state.login.account);
  const [isVisible, setVisible] = useState();
  const [modalWindow, setModalWindow] = useState(false);
  const dispatch = useDispatch();

  const loginSubmit = () => {
    dispatch(loginWithGoogle());
  };

  const handleClick = () => {
    setModalWindow(!modalWindow);
  };

  const scrollToSection = (e) => {
    e.preventDefault();
    const section = document.getElementById("target-TV");
    section.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToSection2 = (e) => {
    e.preventDefault();
    const section = document.getElementById("target-M");
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <NavLink to={"/"}>
          <div className={css.logo}>
            <img src={logo} />
          </div>
        </NavLink>
        <nav className={css.menu}>
          <ul className={css.list}>
            <li>
              <NavLink to={"/"} className={css.link}>
                Home
              </NavLink>
            </li>
            <li>
              <div onClick={scrollToSection} className={css.link}>
                TV Show
              </div>
            </li>
            <li>
              <div onClick={scrollToSection2} className={css.link}>
                Movies
              </div>
            </li>
            <li>
              <NavLink to={"/favorites"} className={css.link}>
                Favorites
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={css.settingsAndSearch}>
          {modalWindow ? <SearchByActor /> : <SearchBtn />}

          <SettingOutlined
            onClick={handleClick}
            style={{
              fontSize: "24px",
              color: "white",
              cursor: "pointer",
              margin: "7px",
              transition: "transform 0.2s",
              transform: `rotate(${modalWindow ? "90deg" : "0"})`,
            }}
          />
        </div>

        {isLogged ? (
          <div
            className={css.nickname}
            onClick={() => {
              setVisible(!isVisible);
            }}
          >
            {displayName}
          </div>
        ) : (
          <div className={css.login} onClick={loginSubmit}>
            LOGIN
          </div>
        )}
        {isVisible ? (
          <div className={css.account}>
            <NavLink to={"/favorites"}>
              <div className={css.WatchList}>Favorites</div>
            </NavLink>
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
