import { useState, useEffect } from "react";
// import services
import { GetAllContacts } from "./services/RestService";
// import components
import Header from "./components/Header";
// import pages
import Body from "./pages/Body";
// import css
import "./css/App.css";

function App() {
  const [contactsList, setContactsList] = useState([]);

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
        this.setState({ isSnackbarOpen: true });
      });
  }
  return (
    <div className="App">
      <Header />
      <Body contactsList={contactsList} />
    </div>
  );
}

export default App;
