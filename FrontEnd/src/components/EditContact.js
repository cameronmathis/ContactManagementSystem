import React from "react";
// import services
import { GetContactById, UpdateContactById } from "../services/RestService";
import {
  getIsStringValid,
  getIsPhoneNumberValid,
  getIsEmailAddressValid,
} from "../services/ValidationService";
// import icons
import Button from "@material-ui/core/Button";
// import css
import "./css/EditContact.css";

class OpenContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfirmDeleteContactModalShown: false,
      contactId: props.contactId,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailAddress: "",
      isFirstNameValid: true,
      isLastNameValid: true,
      isPhoneNumberValid: true,
      isEmailAddressValid: true,
    };
  }

  componentDidMount() {
    GetContactById(this.state.contactId)
      .then((contact) => {
        this.setState({
          firstName: contact.firstName,
          lastName: contact.lastName,
          phoneNumber: contact.phoneNumber,
          emailAddress: contact.emailAddress,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleInputChange = (fieldName) => (event) => {
    this.setState({ [fieldName]: event.target.value });
  };

  cancelEditContact = () => {
    this.props.setIsNotEditing();
  };

  submitEditContact = () => {
    if (this.areValuesValid()) {
      UpdateContactById(
        this.state.contactId,
        this.state.firstName,
        this.state.lastName,
        this.state.phoneNumber,
        this.state.emailAddress
      );
      this.props.setIsNotEditing();
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

  render() {
    return (
      <div className="openedContactEdit-container">
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
    );
  }
}

export default OpenContact;
