import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import Profile from "../Profile";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="menu-div">
      <button onClick={openMenu} className="menu-button">
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>{user.firstname} {user.lastname}</li>
            <li>
              <button onClick={handleLogout}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
          <li>
            <Profile />
          </li>
            {/* <li className="login-button">
              <OpenModalButton
                buttonText="Sign In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Create Account"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li> */}
            
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
