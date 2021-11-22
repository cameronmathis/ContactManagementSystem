import React, { useState, useEffect } from "react";
// import css
import "./css/ContactListItem.css";

const ContactListItem = ({
  setOpenContact,
  setIsViewing,
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

  const openContact = () => {
    setOpenContact(contactId);
    setIsViewing(true);
  };

  return (
    <>
      {isContactSelected ? (
        <div className="contactListItem-selected" onClick={openContact}>
          <div className="contactListItem-text">
            {lastName}, {firstName}
          </div>
        </div>
      ) : (
        <div className="contactListItem" onClick={openContact}>
          <div className="contactListItem-text">
            {lastName}, {firstName}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactListItem;
