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
      isViewing: true,
    };
  }

  setOpenContact = (contactId) => {
    this.setState({ openedContactId: contactId });
  };

  setIsViewing = (bool) => {
    this.setState({ isViewing: bool });
  };

  render() {
    return (
      <body className="body">
        <ContactList
          setOpenContact={this.setOpenContact}
          setIsViewing={this.setIsViewing}
          contactsList={this.props.contactsList}
          openedContactId={this.state.openedContactId}
        />
        {!!this.state.openedContactId ? (
          <OpenedContact
            setIsViewing={this.setIsViewing}
            isViewing={this.state.isViewing}
            contactId={this.state.openedContactId}
          />
        ) : null}
      </body>
    );
  }
}

export default Body;
