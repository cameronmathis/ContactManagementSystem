import React, { useState, useEffect } from "react";
// import css
import "./css/ContactListItem.css";

const ContactListItem = ({
  setOpenContact,
  openedContactId,
  contactId,
  firstName,
  lastName,
}) => {
  const [isContactSelected, setIsContactSelected] = useState(false);

  useEffect(() => {
    if (openedContactId === contactId) {
      setIsContactSelected(true);
    } else {
      setIsContactSelected(false);
    }
  }, [openedContactId, contactId, isContactSelected]);

  return (
    <>
      {isContactSelected ? (
        <div
          className="contactListItem-selected"
          onClick={() => setOpenContact(contactId)}
        >
          <div className="contactListItem-text">
            {lastName}, {firstName}
          </div>
        </div>
      ) : (
        <div
          className="contactListItem"
          onClick={() => setOpenContact(contactId)}
        >
          <div className="contactListItem-text">
            {lastName}, {firstName}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactListItem;
