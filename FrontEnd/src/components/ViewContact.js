import React from "react";
// import services
import { GetContactById } from "../services/RestService";
// import constants
import {
  snackbarPosition,
  snackbarDuration,
  fetchContactFailMessage,
} from "../constants/Snackbar";
// import icons
import Button from "@material-ui/core/Button";
// import modals
import DeleteContactModal from "../modals/DeleteContactModal";
// import snackbar
import Snackbar from "@material-ui/core/Snackbar";
// import alert
import Alert from "@material-ui/lab/Alert";
// import css
import "./css/ViewContact.css";

class OpenContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteContactModalShown: false,
      contactId: this.props.contactId,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailAddress: "",
      isSnackbarOpen: true,
      didFetchSuccessfully: false,
    };
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  componentDidMount() {
    GetContactById(this.props.contactId)
      .then((contact) => {
        this.setState({
          firstName: contact.firstName,
          lastName: contact.lastName,
          phoneNumber: contact.phoneNumber,
          emailAddress: contact.emailAddress,
          didFetchSuccessfully: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ didFetchSuccessfully: false });
        this.setState({ isSnackbarOpen: true });
      });
  }

  componentWillReceiveProps(props) {
    GetContactById(props.contactId)
      .then((contact) => {
        this.setState({
          contactId: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          phoneNumber: contact.phoneNumber,
          emailAddress: contact.emailAddress,
          didFetchSuccessfully: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ didFetchSuccessfully: false });
        this.setState({ isSnackbarOpen: true });
      });
  }

  showDeleteContactModal = () => {
    this.setState({ isDeleteContactModalShown: true });
  };

  setDeleteContactModalShown = (bool) => {
    this.setState({ isDeleteContactModalShown: bool });
  };

  handleCloseSnackbar() {
    this.setState({ isSnackbarOpen: false });
  }

  render() {
    return (
      <div className="openedContactView-container">
        {this.state.didFetchSuccessfully ? (
          <div>
            <header>
              <h2>
                {this.state.firstName} {this.state.lastName}
              </h2>
            </header>
            <body>
              <div className="phoneNumber-container openedContactField-container">
                <p className="phoneNumber-label openedContactField-label">
                  Phone Number
                </p>
                <p className="phoneNumber-value openedContactField-value">
                  {this.state.phoneNumber}
                </p>
              </div>
              <div className="emailAddress-container openedContactField-container">
                <p className="emailAddress-label openedContactField-label">
                  Email Address
                </p>
                <p className="emailAddress-value openedContactField-value">
                  {this.state.emailAddress}
                </p>
              </div>
            </body>
            <footer>
              <div className="openedContactView-buttons">
                <div className="deleteContactButton openedContactView-button">
                  <Button
                    variant="contained"
                    className="deleteContact-button"
                    onClick={this.showDeleteContactModal}
                  >
                    <div className="cancelNewContactButton-text">Delete</div>
                  </Button>
                  <DeleteContactModal
                    contactId={this.state.contactId}
                    isDeleteContactModalShown={
                      this.state.isDeleteContactModalShown
                    }
                    setDeleteContactModalShown={this.setDeleteContactModalShown}
                  />
                </div>
                <div className="editContactButton openedContactView-button">
                  <Button
                    variant="contained"
                    className="editContact-button"
                    onClick={() => this.props.setIsEditing(true)}
                  >
                    <div className="editContactButton-text">Edit</div>
                  </Button>
                </div>
              </div>
            </footer>
          </div>
        ) : (
          <Snackbar
            anchorOrigin={snackbarPosition}
            open={this.state.isSnackbarOpen}
            autoHideDuration={snackbarDuration}
            onClose={this.handleCloseSnackbar}
          >
            <Alert
              onClose={this.handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              {fetchContactFailMessage}
            </Alert>
          </Snackbar>
        )}
      </div>
    );
  }
}

export default OpenContact;
