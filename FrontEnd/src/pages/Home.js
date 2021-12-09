import { useState, useEffect } from "react";
// import utils
import { GetAllContacts } from "../utils/RestUtil";
// import constants
import { HOME } from "../constants/Pages";
import {
  snackbarPosition,
  snackbarDuration,
  fetchContactsFailMessage,
} from "../constants/Snackbar";
// import components
import Header from "../components/Header";
import ContactList from "../components/ContactList";
import OpenedContact from "../components/OpenedContact";
// import snackbar
import Snackbar from "@material-ui/core/Snackbar";
// import alert
import Alert from "@material-ui/lab/Alert";
// import css
import "./css/Home.css";

function Home() {
  const [contactsList, setContactsList] = useState([]);
  const [openedContactId, setOpenContactId] = useState([]);
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    updateContactsList();
  });

  function updateContactsList() {
    GetAllContacts()
      .then((contacts) => {
        const sortedContacts = contacts.sort((a, b) =>
          a.lastName > b.lastName
            ? 1
            : a.lastName === b.lastName
            ? a.firstName > b.firstName
              ? 1
              : -1
            : -1
        );
        if (!areContactListsEqual(sortedContacts, contactsList))
          setContactsList(sortedContacts);
      })
      .catch((error) => {
        console.log(error.message);
        setIsSnackbarOpen(true);
      });
  }

  const areContactListsEqual = (contactList1, contactList2) => {
    if (contactList1.length !== contactList2.length) {
      return false;
    } else if (
      contactList1.every((contact, index) =>
        areContactsEqual(contact, contactList2[index])
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  function areContactsEqual(contact1, contact2) {
    if (contact1.id !== contact2.id) return false;
    if (contact1.firstName !== contact2.firstName) return false;
    if (contact1.lastName !== contact2.lastName) return false;
    return true;
  }

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <div className="home">
      <Header page={HOME} updateContactsList={updateContactsList} />
      <body className="home-content">
        <ContactList
          setOpenContactId={setOpenContactId}
          setIsViewing={setIsViewing}
          setIsEditing={setIsEditing}
          contactsList={contactsList}
          openedContactId={openedContactId}
        />
        {!!openedContactId ? (
          <OpenedContact
            setIsViewing={setIsViewing}
            setIsEditing={setIsEditing}
            isViewing={isViewing}
            isEditing={isEditing}
            contactId={openedContactId}
            updateContactsList={updateContactsList}
          />
        ) : null}
      </body>
      <Snackbar
        anchorOrigin={snackbarPosition}
        open={isSnackbarOpen}
        autoHideDuration={snackbarDuration}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {fetchContactsFailMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Home;
