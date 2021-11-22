import { useState, useEffect } from "react";
// import services
import { GetAllContacts } from "../services/RestService";
// import constants
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
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    updateContactsList();
  }, [contactsList]);

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
        setContactsList(sortedContacts);
      })
      .catch((error) => {
        console.log(error);
        setIsSnackbarOpen(true);
      });
  }

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <div className="home">
      <Header />
      <body className="body">
        <ContactList
          setOpenContactId={setOpenContactId}
          setIsViewing={setIsViewing}
          contactsList={contactsList}
          openedContactId={openedContactId}
        />
        {!!openedContactId ? (
          <OpenedContact
            setIsViewing={setIsViewing}
            isViewing={isViewing}
            contactId={openedContactId}
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
