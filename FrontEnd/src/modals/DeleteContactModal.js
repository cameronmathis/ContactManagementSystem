import React, { useState } from "react";
// import services
import { DeleteContactById } from "../utils/RestService";
// import styles
import { makeStyles } from "@material-ui/core/styles";
// import button
import Button from "@material-ui/core/Button";
// import modals
import Modal from "@material-ui/core/Modal";
// import css
import "./css/DeleteContactModal.css";

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

const DeleteContactModal = ({
  setDidDeleteSuccessfully,
  setIsSnackbarOpen,
  setIsViewing,
  setIsDeleteContactModalShown,
  contactId,
  isDeleteContactModalShown,
}) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const submitDeleteContact = () => {
    DeleteContactById(contactId)
      .then(() => {
        setDidDeleteSuccessfully(true);
        setIsSnackbarOpen(true);
        setIsViewing(false);
        setIsDeleteContactModalShown(false);
      })
      .catch((error) => {
        console.log(error);
        setDidDeleteSuccessfully(false);
        setIsSnackbarOpen(true);
      });
  };

  return (
    <div>
      <Modal className="deleteContactModal" open={isDeleteContactModalShown}>
        <div style={modalStyle} className={classes.paper}>
          <div className="deleteContactModal-content">
            <header>
              <h2>Delete Contact</h2>
            </header>
            <body>
              <p>Are you sure you want to delete this contact?</p>
            </body>
            <footer>
              <div className="deleteContactModal-buttons">
                <div className="cancelDeleteContactButton deleteContactModal-button">
                  <Button
                    variant="contained"
                    className="cancelDeleteContact-button"
                    onClick={() => setIsDeleteContactModalShown(false)}
                  >
                    <div className="cancelDeleteContactButton-text">Cancel</div>
                  </Button>
                </div>
                <div className="submitDeleteContactButton deleteContactModal-button">
                  <Button
                    variant="contained"
                    className="submitDeleteContact-button"
                    onClick={submitDeleteContact}
                  >
                    <div className="submitDeleteContactButton-text">Delete</div>
                  </Button>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteContactModal;
