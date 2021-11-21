import React, { useState } from "react";
// import services
import { DeleteContactById } from "../services/RestService";
// import constants
import {
  snackbarPosition,
  snackbarDuration,
  deleteSuccessMessage,
  deleteFailMessage,
} from "../constants/Snackbar";
// import styles
import { makeStyles } from "@material-ui/core/styles";
// import icons
import Button from "@material-ui/core/Button";
// import modals
import Modal from "@material-ui/core/Modal";
// import snackbar
import Snackbar from "@material-ui/core/Snackbar";
// import alert
import Alert from "@material-ui/lab/Alert";
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
  contactId,
  isDeleteContactModalShown,
  setDeleteContactModalShown,
  setIsViewing,
}) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [didDeleteSuccessfully, setDidDeleteSuccessfully] = useState();
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const submitDeleteContact = () => {
    DeleteContactById(contactId)
      .then(() => {
        setDidDeleteSuccessfully(true);
        setSnackbarOpen(true);
        setDeleteContactModalShown(false);
        // setIsViewing(false);
      })
      .catch((error) => {
        console.log(error);
        setDidDeleteSuccessfully(false);
        setSnackbarOpen(true);
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
                    onClick={() => setDeleteContactModalShown(false)}
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
      <Snackbar
        anchorOrigin={snackbarPosition}
        open={isSnackbarOpen}
        autoHideDuration={snackbarDuration}
        onClose={() => setSnackbarOpen(false)}
      >
        {didDeleteSuccessfully ? (
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {deleteSuccessMessage}
          </Alert>
        ) : (
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {deleteFailMessage}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default DeleteContactModal;
