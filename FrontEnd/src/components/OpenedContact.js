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
      isEditing: false,
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

  setIsEditing = (bool) => {
    this.setState({ isEditing: bool });
  };

  setIsSnackbarOpen = (bool) => {
    this.setState({ isSnackbarOpen: bool });
  };

  setDidDeleteSuccessfully = (bool) => {
    this.setState({ didDeleteSuccessfully: bool });
  };

  setDidEditSuccessfully = (bool) => {
    this.setState({ didEditSuccessfully: bool });
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
            setIsEditing={this.setIsEditing}
            setIsSnackbarOpen={this.setIsSnackbarOpen}
            setDidDeleteSuccessfully={this.setDidDeleteSuccessfully}
            contactId={this.state.contactId}
          />
        ) : null}
        {this.state.isEditing ? (
          <EditContact
            setIsViewing={this.props.setIsViewing}
            setIsEditing={this.setIsEditing}
            setIsSnackbarOpen={this.setIsSnackbarOpen}
            setDidEditSuccessfully={this.setDidEditSuccessfully}
            contactId={this.state.contactId}
          />
        ) : null}
        <Snackbar
          anchorOrigin={snackbarPosition}
          open={this.state.isSnackbarOpen}
          autoHideDuration={snackbarDuration}
          onClose={this.handleCloseSnackbar}
        >
          {this.state.didEditSuccessfully === "" ? (
            <div>
              {this.state.didDeleteSuccessfully === "" ? null : (
                <div>
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
                </div>
              )}
            </div>
          ) : (
            <div>
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
            </div>
          )}
        </Snackbar>
      </div>
    );
  }
}

export default OpenedContact;
