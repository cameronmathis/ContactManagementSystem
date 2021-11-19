import React from "react";
// import components
import ContactList from ".././components/ContactList";
import OpenedContact from ".././components/OpenedContact";
// import css
import "./css/Body.css";
class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openedContactId: "",
    };
  }

  openContact = (contactId) => {
    this.setState({ openedContactId: contactId });
  };

  render() {
    const { openedContactId } = this.state;
    const contactId = openedContactId;

    return (
      <body className="body">
        <ContactList
          openContact={this.openContact}
          openedContactId={this.state.openedContactId}
        />
        {!!this.state.openedContactId ? (
          <OpenedContact contactId={contactId} />
        ) : null}
      </body>
    );
  }
}

export default Body;
