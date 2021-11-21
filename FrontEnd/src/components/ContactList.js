import React from "react";
// import constants
import {
  snackbarPosition,
  snackbarDuration,
  fetchContactsFailMessage,
} from "../constants/Snackbar";
// import components
import ContactListItem from "./ContactListItem";
// import snackbar
import Snackbar from "@material-ui/core/Snackbar";
// import alert
import Alert from "@material-ui/lab/Alert";
// import css
import "./css/ContactList.css";

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      isSnackbarOpen: false,
    };
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  componentDidMount() {
    this.setState({ contacts: this.props.contactsList });
  }

  componentWillReceiveProps(props) {
    this.setState({ contacts: props.contactsList });
  }

  handleCloseSnackbar() {
    this.setState({ isSnackbarOpen: false });
  }

  render() {
    return (
      <div>
        <ul className="contactList">
          {this.state.contacts.map((contact) => (
            <li key={contact.id}>
              <ContactListItem
                setOpenContact={this.props.setOpenContact}
                openedContactId={this.props.openedContactId}
                contactId={contact.id}
                firstName={contact.firstName}
                lastName={contact.lastName}
              />
            </li>
          ))}
        </ul>
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
            {fetchContactsFailMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default ContactList;
