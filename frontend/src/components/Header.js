import headerLogo from "../images/header__logo.svg"; 
import React, { useState, useEffect, useContext } from "react"; 
import { Link, useLocation } from "react-router-dom"; 
import * as userAuth from "../utils/userAuth"; 

function Header(props) { 
  const location = useLocation(); 
  const [userEmail, setUserEmail] = useState(""); 

  useEffect(() => { 
    getEmail(); 
  }, []); 
  console.log(props.user.email)
  const getEmail = () => { 
    const authorized = localStorage.getItem("authorized"); 

    if (authorized) { 
        setUserEmail(props.user.email); 
    } 
  }; 

  return ( 
    <header className="header"> 
      <img src={headerLogo} alt="логотип Место" className="header__logo" /> 
      <div className="header__paragraphs"> 
        <p 
          className={`header__paragraph header__paragraph_name ${ 
            props.loggedIn ? "visible" : "invisible" 
          }`} 
        > 
          {userEmail} 
        </p> 
        <Link 
          className="header__paragraph header__paragraph_link" 
          onClick={props.onSignOut} 
          to={location.pathname.includes("signin") ? "/signup" : "/signin"} 
        > 
          {location.pathname.includes("signin") 
            ? "Регистрация" 
            : location.pathname.includes("/signup") 
            ? "Войти" 
            : "Выйти"} 
        </Link> 
      </div> 
    </header> 
  ); 
} 

export default Header; 