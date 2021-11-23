import React, { useState } from "react";
// import services
import { CreateContact } from "../services/RestService";
import {
  getIsStringValid,
  getIsPhoneNumberValid,
  getIsEmailAddressValid,
} from "../services/ValidationService";
// import constants
import {
  snackbarPosition,
  snackbarDuration,
  createSuccessMessage,
  createFailMessage,
} from "../constants/Snackbar";
// import styles
import { makeStyles } from "@material-ui/core/styles";
// import button
import Button from "@material-ui/core/Button";
// import modals
import Modal from "@material-ui/core/Modal";
// import snackbar
import Snackbar from "@material-ui/core/Snackbar";
// import alert
import Alert from "@material-ui/lab/Alert";
// import css
import "./css/CreateContactModal.css";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CreateContactModal = ({
  isCreateContactModalShown,
  setCreateContactModalShown,
}) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const [isFirstNameValid, setFirstNameValid] = useState(true);
  const [isLastNameValid, setLastNameValid] = useState(true);
  const [isPhoneNumberValid, setPhoneNumberValid] = useState(true);
  const [isEmailAddressValid, setEmailAddressValid] = useState(true);

  const [didCreateSuccessfully, setDidCreateSuccessfully] = useState();
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const cancelNewContact = () => {
    setCreateContactModalShown(false);
    // reset all modal values
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmailAddress("");
    setFirstNameValid(true);
    setLastNameValid(true);
    setPhoneNumberValid(true);
    setEmailAddressValid(true);
  };

  const submitNewContact = () => {
    if (areValuesValid()) {
      CreateContact(firstName, lastName, phoneNumber, emailAddress)
        .then(() => {
          setDidCreateSuccessfully(true);
          setSnackbarOpen(true);
          setCreateContactModalShown(false);
        })
        .catch((error) => {
          console.log(error);
          setDidCreateSuccessfully(false);
          setSnackbarOpen(true);
        });
    }
  };

  const areValuesValid = () => {
    let result = true;
    if (!getIsStringValid(firstName)) {
      setFirstNameValid(false);
      result = false;
    } else {
      setFirstNameValid(true);
    }
    if (!getIsStringValid(lastName)) {
      setLastNameValid(false);
      result = false;
    } else {
      setLastNameValid(true);
    }
    if (!getIsPhoneNumberValid(phoneNumber)) {
      setPhoneNumberValid(false);
      result = false;
    } else {
      setPhoneNumberValid(true);
    }
    if (!getIsEmailAddressValid(emailAddress)) {
      setEmailAddressValid(false);
      result = false;
    } else {
      setEmailAddressValid(true);
    }
    return result;
  };

  return (
    <div>
      <Modal className="createContactModal" open={isCreateContactModalShown}>
        <div style={modalStyle} className={classes.paper}>
          <div className="createContactModal-content">
            <header>
              <h2>New Contact</h2>
            </header>
            <body>
              {isFirstNameValid ? (
                <input
                  className="firstName-input createContactModal-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
              ) : (
                <input
                  className="firstName-input createContactModal-input-invalid"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
              )}
              {isLastNameValid ? (
                <input
                  className="lastName-input createContactModal-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
              ) : (
                <input
                  className="lastName-input createContactModal-input-invalid"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
              )}
              {isPhoneNumberValid ? (
                <input
                  className="phoneNumber-input createContactModal-input"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                />
              ) : (
                <input
                  className="phoneNumber-input createContactModal-input-invalid"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                />
              )}
              {isEmailAddressValid ? (
                <input
                  className="emailAddress-input createContactModal-input"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Email Address"
                  type="email"
                />
              ) : (
                <input
                  className="emailAddress-input createContactModal-input-invalid"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Email Address"
                  type="email"
                />
              )}
            </body>
            <footer>
              <div className="createContactModal-buttons">
                <div className="cancelNewContactButton createContactModal-button">
                  <Button
                    variant="contained"
                    className="cancelNewContact-button"
                    onClick={cancelNewContact}
                  >
                    <div className="cancelNewContactButton-text">Cancel</div>
                  </Button>
                </div>
                <div className="submitNewContactButton createContactModal-button">
                  <Button
                    variant="contained"
                    className="submitNewContact-button"
                    onClick={submitNewContact}
                  >
                    <div className="submitNewContactButton-text">Save</div>
                  </Button>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </Modal>
      <Snackbar
        anchorOrigin={snackbarPosition}
        open={isSnackbarOpen}
        autoHideDuration={snackbarDuration}
        onClose={() => setSnackbarOpen(false)}
      >
        {didCreateSuccessfully ? (
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {createSuccessMessage}
          </Alert>
        ) : (
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {createFailMessage}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default CreateContactModal;
