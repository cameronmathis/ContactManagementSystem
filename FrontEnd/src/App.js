import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
// import constants
import { LOGIN, SIGN_UP, HOME } from "./constants/Pages";
// import css
import "./css/App.css";

function App() {
  const [isLoggedIn, setIsLoggedInState] = useState(false);

  useEffect(() => {
    setIsLoggedInState(window.sessionStorage.getItem("isLoggedIn"));
  }, [isLoggedIn]);

  function setIsLoggedIn(bool) {
    if (bool) {
      window.sessionStorage.setItem("isLoggedIn", bool);
    }
    setIsLoggedInState(bool);
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path={LOGIN}
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path={SIGN_UP}
            element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
          />
          {isLoggedIn && <Route path={HOME} element={<Home />} />}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
