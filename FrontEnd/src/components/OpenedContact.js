import React from "react";
// import components
import ViewContact from "./ViewContact";
import EditContact from "./EditContact";
// import css
import "./css/OpenedContact.css";

class OpenedContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      contactId: props.contactId,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ contactId: props.contactId });
  }

  setIsEditing = () => {
    this.setState({ isEditing: true });
  };

  setIsNotEditing = () => {
    this.setState({ isEditing: false });
  };

  render() {
    return (
      <div className="openedContact-container">
        {this.state.isEditing ? (
          <EditContact
            setIsNotEditing={this.setIsNotEditing}
            contactId={this.state.contactId}
          />
        ) : (
          <ViewContact
            setIsEditing={this.setIsEditing}
            contactId={this.state.contactId}
          />
        )}
      </div>
    );
  }
}

export default OpenedContact;
