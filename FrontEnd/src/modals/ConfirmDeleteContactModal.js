import React from "react";
// import services
import { DeleteContactById } from "../services/RestService";
// import styles
import { makeStyles } from "@material-ui/core/styles";
// import icons
import Button from "@material-ui/core/Button";
// import modals
import Modal from "@material-ui/core/Modal";
// import css
import "./css/ConfirmDeleteContactModal.css";

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

const ConfirmDeleteContactModal = ({
  contactId,
  isConfirmDeleteContactModalShown,
  hideConfirmDeleteContactModal,
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const cancelDeleteContact = () => {
    hideConfirmDeleteContactModal();
  };

  const submitDeleteContact = () => {
    DeleteContactById(contactId).catch((error) => {
      console.log(error);
    });
    hideConfirmDeleteContactModal();
    window.location.reload();
  };

  return (
    <div>
      <Modal
        className="confirmDeleteContactModal"
        open={isConfirmDeleteContactModalShown}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="confirmDeleteContactModal-content">
            <header>
              <h2>Delete Contact</h2>
            </header>
            <body>
              <p>Are you sure you want to delete this contact?</p>
            </body>
            <footer>
              <div className="confirmDeleteContactModal-buttons">
                <div className="cancelDeleteContactButton confirmDeleteContactModal-button">
                  <Button
                    variant="contained"
                    className="cancelDeleteContact-button"
                    onClick={cancelDeleteContact}
                  >
                    <div className="cancelDeleteContactButton-text">Cancel</div>
                  </Button>
                </div>
                <div className="submitDeleteContactButton confirmDeleteContactModal-button">
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

export default ConfirmDeleteContactModal;
