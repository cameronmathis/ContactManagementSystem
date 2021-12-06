import { useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={SIGN_UP} element={<SignUp />} />
          {isLoggedIn && <Route path={HOME} element={<Home />} />}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
