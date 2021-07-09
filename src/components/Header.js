import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, provider } from "../firebase";
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";

const Header = (props) => {
  // dispatch allow us to dispatch action to store
  const dispatch = useDispatch();
  // history allow us to access history
  const history = useHistory();
  // selector to retrieve the username & userphoto from store
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  // function only run when variable 'userName' is updated/changes
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      // if user existed
      if (user) {
        // setUser to logined user
        setUser(user);
        // add the home path to my history
        history.push("/home");
      }
    });
    // userName is the dependency
  }, [userName]);

  const handleAuth = () => {
    // if userName not existed(user haven't login)
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result.user);
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
    // if userName existed(user already login)
    else if (userName) {
      auth
        .signOut()
        .then(() => {
          // dispatch signoutState to the store
          dispatch(setSignOutState());
          // push login page to history
          history.push("/");
        })
        .catch((error) => alert(error.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        // dispatch the information get from google login to reduc store
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <Logo>
        <img src="../images/logo.svg" alt="Disney+" />
      </Logo>

      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="../images/home-icon.svg" alt="HOME"></img>
              <span>HOME</span>
            </a>
            <a href="/home">
              <img src="../images/search-icon.svg" alt="SEARCH"></img>
              <span>SEARCH</span>
            </a>
            <a href="/home">
              <img src="../images/watchlist-icon.svg" alt="WATCHLIST"></img>
              <span>WATCHLIST</span>
            </a>
            <a href="/home">
              <img src="../images/original-icon.svg" alt="ORIGINALS"></img>
              <span>ORIGINALS</span>
            </a>
            <a href="/home">
              <img src="../images/movie-icon.svg" alt="MOVIES"></img>
              <span>MOVIES</span>
            </a>
            <a href="/home">
              <img src="../images/series-icon.svg" alt="SERIES"></img>
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <Dropdown>
              <span onClick={handleAuth}>Sign Out</span>
            </Dropdown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

export default Header;

const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease-out;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%);
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  text-align: center;
  padding-left: 0;
  padding-right: 0;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  // when hover over SignOut style the Dropdown component
  &:hover {
    ${Dropdown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  height: 100%;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;
