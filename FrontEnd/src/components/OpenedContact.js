import React from "react";
// import constants
import {
  snackbarPosition,
  snackbarDuration,
  deleteSuccessMessage,
  deleteFailMessage,
  editSuccessMessage,
  editFailMessage,
} from "../constants/Snackbar";
// import components
import ViewContact from "./ViewContact";
import EditContact from "./EditContact";
// import snackbar
import Snackbar from "@material-ui/core/Snackbar";
// import alert
import Alert from "@material-ui/lab/Alert";
// import css
import "./css/OpenedContact.css";

class OpenedContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactId: props.contactId,
      isSnackbarOpen: false,
      didDeleteSuccessfully: "",
      didEditSuccessfully: "",
    };
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.contactId !== nextProps.contactId) {
      return { contactId: nextProps.contactId };
    }
    return null;
  }

  setIsSnackbarOpen(bool) {
    this.setState({ isSnackbarOpen: bool });
  }

  setDidDeleteSuccessfully = (bool) => {
    this.setState({ didDeleteSuccessfully: bool });
    this.setState({ isSnackbarOpen: true });
    if (bool) {
      this.props.setIsViewing(true);
      this.props.updateContactsList();
    }
  };

  setDidEditSuccessfully = (bool) => {
    this.setState({ didEditSuccessfully: bool });
    this.setState({ isSnackbarOpen: true });
    if (bool) {
      this.props.setIsEditing(false);
      this.props.setIsViewing(true);
      this.props.updateContactsList();
    }
  };

  handleCloseSnackbar() {
    this.setState({
      isSnackbarOpen: false,
      didDeleteSuccessfully: "",
      didEditSuccessfully: "",
    });
  }

  render() {
    return (
      <div className="openedContact-container">
        {this.props.isViewing ? (
          <ViewContact
            setIsViewing={this.props.setIsViewing}
            setIsEditing={this.props.setIsEditing}
            setDidDeleteSuccessfully={this.setDidDeleteSuccessfully}
            contactId={this.state.contactId}
          />
        ) : null}
        {this.props.isEditing ? (
          <EditContact
            setIsViewing={this.props.setIsViewing}
            setIsEditing={this.props.setIsEditing}
            setDidEditSuccessfully={this.setDidEditSuccessfully}
            contactId={this.state.contactId}
          />
        ) : null}
        {this.state.didDeleteSuccessfully === "" ? null : (
          <Snackbar
            anchorOrigin={snackbarPosition}
            open={this.state.isSnackbarOpen}
            autoHideDuration={snackbarDuration}
            onClose={this.handleCloseSnackbar}
          >
            {this.state.didDeleteSuccessfully ? (
              <Alert
                onClose={this.handleCloseSnackbar}
                severity="success"
                sx={{ width: "100%" }}
              >
                {deleteSuccessMessage}
              </Alert>
            ) : (
              <Alert
                onClose={this.handleCloseSnackbar}
                severity="error"
                sx={{ width: "100%" }}
              >
                {deleteFailMessage}
              </Alert>
            )}
          </Snackbar>
        )}
        {this.state.didEditSuccessfully === "" ? null : (
          <Snackbar
            anchorOrigin={snackbarPosition}
            open={this.state.isSnackbarOpen}
            autoHideDuration={snackbarDuration}
            onClose={this.handleCloseSnackbar}
          >
            {this.state.didEditSuccessfully ? (
              <Alert
                onClose={this.handleCloseSnackbar}
                severity="success"
                sx={{ width: "100%" }}
              >
                {editSuccessMessage}
              </Alert>
            ) : (
              <Alert
                onClose={this.handleCloseSnackbar}
                severity="error"
                sx={{ width: "100%" }}
              >
                {editFailMessage}
              </Alert>
            )}
          </Snackbar>
        )}
      </div>
    );
  }
}

export default OpenedContact;
