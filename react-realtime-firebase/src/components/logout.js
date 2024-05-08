import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const Logout = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleClose = () => {
    // Prevent the user from closing the modal
  };

  return (
    <div className="logout">
      <div className="logoutField" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <div className="logoutText">Weet je zeker dat je wil uitloggen </div>
        <div className="logOutButtons">
          <button className="Yep"
            variant="primary"
            onClick={() => {
              signOut(auth);
              localStorage.setItem("auth", "");
              navigate("/");
              window.location.reload();
            }}
          >
            Ja
          </button>
          <button className="Nope"
            variant="secondary"
            onClick={() => {
              navigate("/");
            }}
          >
            Nee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
