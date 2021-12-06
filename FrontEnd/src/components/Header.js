import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import constants
import { LOGIN, HOME } from "../constants/Pages";
// import buttons
import Button from "@material-ui/core/Button";
// import icons
import AddIcon from "@material-ui/icons/Add";
// import modals
import CreateContactModal from "../modals/CreateContactModal";
// import css
import "./css/Header.css";

const Header = ({ page, updateContactsList }) => {
  const navigate = useNavigate();

  const [isCreateContactModalShown, setCreateContactModalShown] =
    useState(false);

  function showNewContactModal() {
    setCreateContactModalShown(true);
  }

  function showSignUpPage() {
    navigate("/signup");
  }

  return (
    <div className="header">
      <div className="headerLeft">
        <h1>Contact Management System</h1>
      </div>
      <div className="headerRight">
        {page === LOGIN ? (
          <div className="signUpButton">
            <Button
              variant="contained"
              className="signUp-button"
              onClick={showSignUpPage}
            >
              <div className="signUpButton-text">Sign-Up</div>
            </Button>
          </div>
        ) : null}
        {page === HOME ? (
          <div className="newContactButton">
            <Button
              variant="contained"
              className="newContact-button"
              onClick={showNewContactModal}
            >
              <div className="newContactButton-text">New Contact</div>
              <div className="newContactButton-spacer"></div>
              <AddIcon className="newContactButton-icon" fontSize="medium" />
            </Button>
            <CreateContactModal
              isCreateContactModalShown={isCreateContactModalShown}
              setCreateContactModalShown={setCreateContactModalShown}
              updateContactsList={updateContactsList}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
