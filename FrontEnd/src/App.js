import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import pages
// import Login from "./pages/Login";
import Home from "./pages/Home";
// import PageNotFound from "./pages/PageNotFound";
// import css
import "./css/App.css";

function App() {
  return (
    <div className="App">
      <Home />
      <Router>
        <Routes>
          {/* <Route path="/login" component={Login}></Route> */}
          <Route path="/home" component={Home}></Route>
          {/* <Route path="*" component={PageNotFound}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
