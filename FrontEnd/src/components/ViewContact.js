import React from "react";
// import services
import { GetContactById } from "../services/RestService";
// import icons
import Button from "@material-ui/core/Button";
// import modals
import ConfirmDeleteContactModal from "../modals/ConfirmDeleteContactModal";
// import css
import "./css/ViewContact.css";

class OpenContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfirmDeleteContactModalShown: false,
      contactId: this.props.contactId,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailAddress: "",
    };
  }

  componentDidMount() {
    GetContactById(this.props.contactId).then((contact) => {
      this.setState({
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber,
        emailAddress: contact.emailAddress,
      });
    });
  }

  componentWillReceiveProps(props) {
    GetContactById(props.contactId).then((contact) => {
      this.setState({
        contactId: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber,
        emailAddress: contact.emailAddress,
      });
    });
  }

  showConfirmDeleteContactModal = () => {
    this.setState({ isConfirmDeleteContactModalShown: true });
  };

  hideConfirmDeleteContactModal = () => {
    this.setState({ isConfirmDeleteContactModalShown: false });
  };

  render() {
    return (
      <div className="openedContactView-container">
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
                onClick={this.showConfirmDeleteContactModal}
              >
                <div className="cancelNewContactButton-text">Delete</div>
              </Button>
              <ConfirmDeleteContactModal
                contactId={this.state.contactId}
                isConfirmDeleteContactModalShown={
                  this.state.isConfirmDeleteContactModalShown
                }
                hideConfirmDeleteContactModal={
                  this.hideConfirmDeleteContactModal
                }
              />
            </div>
            <div className="editContactButton openedContactView-button">
              <Button
                variant="contained"
                className="editContact-button"
                onClick={this.props.setIsEditing}
              >
                <div className="editContactButton-text">Edit</div>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default OpenContact;
