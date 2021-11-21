import React from "react";
// import services
import { GetContactById, UpdateContactById } from "../services/RestService";
import {
  getIsStringValid,
  getIsPhoneNumberValid,
  getIsEmailAddressValid,
} from "../services/ValidationService";
// import constants
import {
  snackbarPosition,
  snackbarDuration,
  fetchContactFailMessage,
} from "../constants/Snackbar";
// import icons
import Button from "@material-ui/core/Button";
// import snackbar
import Snackbar from "@material-ui/core/Snackbar";
// import alert
import Alert from "@material-ui/lab/Alert";
// import css
import "./css/EditContact.css";

class EditContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      didFetchSuccessfully: true,
      contactId: props.contactId,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailAddress: "",
      isFirstNameValid: true,
      isLastNameValid: true,
      isPhoneNumberValid: true,
      isEmailAddressValid: true,
      isSnackbarOpen: false,
      didEditSuccessfully: "",
    };
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  componentDidMount() {
    GetContactById(this.state.contactId)
      .then((contact) => {
        this.setState({
          didFetchSuccessfully: true,
          firstName: contact.firstName,
          lastName: contact.lastName,
          phoneNumber: contact.phoneNumber,
          emailAddress: contact.emailAddress,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ didFetchSuccessfully: false });
        this.setState({ isSnackbarOpen: true });
      });
  }

  handleInputChange = (fieldName) => (event) => {
    this.setState({ [fieldName]: event.target.value });
  };

  cancelEditContact = () => {
    this.props.setIsEditing(false);
    this.props.setIsViewing(true);
  };

  submitEditContact = () => {
    if (this.areValuesValid()) {
      UpdateContactById(
        this.state.contactId,
        this.state.firstName,
        this.state.lastName,
        this.state.phoneNumber,
        this.state.emailAddress
      )
        .then(() => {
          this.props.setIsEditing(false);
          this.props.setIsViewing(true);
          this.props.setDidEditSuccessfully(true);
          this.props.setIsSnackbarOpen(true);
        })
        .catch((error) => {
          console.log(error);
          this.props.setDidEditSuccessfully(false);
          this.props.setIsSnackbarOpen(true);
        });
    }
  };

  areValuesValid = () => {
    let result = true;
    if (!getIsStringValid(this.state.firstName)) {
      this.setState({
        isFirstNameValid: false,
      });
      result = false;
    } else {
      this.setState({
        isFirstNameValid: true,
      });
    }
    if (!getIsStringValid(this.state.lastName)) {
      this.setState({
        isLastNameValid: false,
      });
      result = false;
    } else {
      this.setState({
        isLastNameValid: true,
      });
    }
    if (!getIsPhoneNumberValid(this.state.phoneNumber)) {
      this.setState({
        isPhoneNumberValid: false,
      });
      result = false;
    } else {
      this.setState({
        isPhoneNumberValid: true,
      });
    }
    if (!getIsEmailAddressValid(this.state.emailAddress)) {
      this.setState({
        isEmailAddressValid: false,
      });
      result = false;
    } else {
      this.setState({
        isEmailAddressValid: true,
      });
    }
    return result;
  };

  handleCloseSnackbar() {
    this.setState({ isSnackbarOpen: false });
  }

  render() {
    return (
      <div className="openedContactEdit-container">
        {this.state.didFetchSuccessfully ? (
          <div>
            <header>
              <h2>Edit Contact</h2>
            </header>
            <body>
              <div className="firstNameInput-container openedContactInput-container">
                {this.state.isFirstNameValid ? (
                  <p className="firstNameInput-label openedContactInput-label">
                    First Name
                  </p>
                ) : (
                  <p className="firstNameInput-label openedContactInput-label-invalid">
                    First Name
                  </p>
                )}
                <input
                  className="firstName-input openedContact-input"
                  value={this.state.firstName}
                  onChange={this.handleInputChange("firstName")}
                  placeholder="First Name"
                />
              </div>
              <div className="lastNameInput-container openedContactInput-container">
                {this.state.isLastNameValid ? (
                  <p className="lastNameInput-label openedContactInput-label">
                    Last Name
                  </p>
                ) : (
                  <p className="lastNameInput-label openedContactInput-label-invalid">
                    Last Name
                  </p>
                )}
                <input
                  className="lastName-input openedContact-input"
                  value={this.state.lastName}
                  onChange={this.handleInputChange("lastName")}
                  placeholder="Last Name"
                />
              </div>
              <div className="phoneNumberInput-container openedContactInput-container">
                {this.state.isPhoneNumberValid ? (
                  <p className="phoneNumberInput-label openedContactInput-label">
                    Phone Number
                  </p>
                ) : (
                  <p className="phoneNumberInput-label openedContactInput-label-invalid">
                    Phone Number
                  </p>
                )}
                <input
                  className="phoneNumber-input openedContact-input"
                  value={this.state.phoneNumber}
                  onChange={this.handleInputChange("phoneNumber")}
                  placeholder="Phone Number"
                />
              </div>
              <div className="emailAddressInput-container openedContactInput-container">
                {this.state.isEmailAddressValid ? (
                  <p className="emailAddressInput-label openedContactInput-label">
                    Email Address
                  </p>
                ) : (
                  <p className="emailAddressInput-label openedContactInput-label-invalid">
                    Email Address
                  </p>
                )}
                <input
                  className="emailAddress-input openedContact-input"
                  value={this.state.emailAddress}
                  onChange={this.handleInputChange("emailAddress")}
                  placeholder="Email Address"
                />
              </div>
            </body>
            <footer>
              <div className="openedContactEdit-buttons">
                <div className="cancelEditContactButton openedContactEdit-button">
                  <Button
                    variant="contained"
                    className="cancelEditContact-button"
                    onClick={this.cancelEditContact}
                  >
                    <div className="cancelNewContactButton-text">Cancel</div>
                  </Button>
                </div>
                <div className="submitEditContactButton openedContactEdit-button">
                  <Button
                    variant="contained"
                    className="submitEditContact-button"
                    onClick={this.submitEditContact}
                  >
                    <div className="submitEditContactButton-text">Save</div>
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

export default EditContact;
