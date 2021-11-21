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

  setOpenContact = (contactId) => {
    this.setState({ openedContactId: contactId });
  };

  render() {
    return (
      <body className="body">
        <ContactList
          contactsList={this.props.contactsList}
          setOpenContact={this.setOpenContact}
          openedContactId={this.state.openedContactId}
        />
        {!!this.state.openedContactId ? (
          <OpenedContact contactId={this.state.openedContactId} />
        ) : null}
      </body>
    );
  }
}

export default Body;
