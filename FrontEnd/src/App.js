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
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path={LOGIN} element={<Login />}></Route>
          <Route path={SIGN_UP} element={<SignUp />}></Route>
          <Route path={HOME} element={<Home />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
