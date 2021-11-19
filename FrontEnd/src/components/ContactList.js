import React from "react";
// import services
import { GetAllContacts } from "../services/RestService";
// import components
import ContactListItem from "./ContactListItem";
// import css
import "./css/ContactList.css";

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [] };
  }

  componentDidMount() {
    GetAllContacts().then((contacts) => {
      const sortedContacts = contacts.sort((a, b) =>
        a.lastName > b.lastName
          ? 1
          : a.lastName === b.lastName
          ? a.firstName > b.firstName
            ? 1
            : -1
          : -1
      );
      this.setState({ contacts: sortedContacts });
    });
  }

  render() {
    return (
      <ul className="contactList">
        {this.state.contacts.map((contact) => (
          <li key={contact.id}>
            <ContactListItem
              openContact={this.props.openContact}
              openedContactId={this.props.openedContactId}
              contactId={contact.id}
              firstName={contact.firstName}
              lastName={contact.lastName}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default ContactList;
