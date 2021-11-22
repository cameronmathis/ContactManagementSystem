import React from "react";
// import components
import ContactListItem from "./ContactListItem";
// import css
import "./css/ContactList.css";

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  componentDidMount() {
    this.setState({ contacts: this.props.contactsList });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.contactsList !== nextProps.contactsList) {
      return { contacts: nextProps.contactsList };
    }
    return null;
  }

  render() {
    return (
      <div>
        <ul className="contactList">
          {this.state.contacts.map((contact) => (
            <li key={contact.id}>
              <ContactListItem
                setOpenContact={this.props.setOpenContact}
                setIsViewing={this.props.setIsViewing}
                openedContactId={this.props.openedContactId}
                contactId={contact.id}
                firstName={contact.firstName}
                lastName={contact.lastName}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ContactList;
