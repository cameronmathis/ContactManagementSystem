import React from "react";
// import constants
import {
  snackbarPosition,
  snackbarDuration,
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
      isViewing: true,
      isEditing: false,
      isSnackbarOpen: false,
      didEditSuccessfully: "",
    };
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ contactId: props.contactId });
  }

  setIsViewing = (bool) => {
    this.setState({ isViewing: bool });
  };

  setIsEditing = (bool) => {
    this.setState({ isEditing: bool });
  };

  setIsSnackbarOpen = (bool) => {
    this.setState({ isSnackbarOpen: bool });
  };

  setDidEditSuccessfully = (bool) => {
    this.setState({ didEditSuccessfully: bool });
  };

  handleCloseSnackbar() {
    this.setState({ isSnackbarOpen: false });
  }

  render() {
    return (
      <div className="openedContact-container">
        {this.state.isViewing ? (
          <ViewContact
            contactId={this.state.contactId}
            setIsViewing={this.setIsViewing}
            setIsEditing={this.setIsEditing}
            setIsSnackbarOpen={this.setIsSnackbarOpen}
            setDidEditSuccessfully={this.setDidDeleteSuccessfully}
          />
        ) : null}
        {this.state.isEditing ? (
          <EditContact
            contactId={this.state.contactId}
            setIsViewing={this.setIsViewing}
            setIsEditing={this.setIsEditing}
            setIsSnackbarOpen={this.setIsSnackbarOpen}
            setDidEditSuccessfully={this.setDidEditSuccessfully}
          />
        ) : null}
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
      </div>
    );
  }
}

export default OpenedContact;
