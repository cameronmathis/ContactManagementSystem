import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import services
import { getIsStringValid } from "../services/ValidationService";
// import constants
import { login } from "../constants/Pages";
// import components
import Header from "../components/Header";
// import button
import Button from "@material-ui/core/Button";
// import css
import "./css/Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isUsernameValid, setUsernameValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);

  const submitLogin = () => {
    if (areValuesValid()) {
      console.log("Username: " + username);
      console.log("Password: " + password);
      navigate("/home");
    }
  };

  const areValuesValid = () => {
    let result = true;
    if (!getIsStringValid(username)) {
      setUsernameValid(false);
      result = false;
    } else {
      setUsernameValid(true);
    }
    if (!getIsStringValid(password)) {
      setPasswordValid(false);
      result = false;
    } else {
      setPasswordValid(true);
    }
    return result;
  };

  return (
    <div className="login-container">
      <Header page={login} />
      <div className="login-content">
        <body>
          {isUsernameValid ? (
            <label className="usernameInput-label loginInput-label">
              Username
            </label>
          ) : (
            <label className="usernameInput-label loginInput-label-invalid">
              Username
            </label>
          )}
          <input
            className="username-input login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />

          {isPasswordValid ? (
            <label className="passwordInput-label loginInput-label">
              Password
            </label>
          ) : (
            <label className="passwordInput-label loginInput-label-invalid">
              Password
            </label>
          )}
          <input
            type="password"
            className="password-input login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </body>
        <footer>
          <div className="login-buttons">
            <div className="submitLoginButton submitLogin-button">
              <Button
                variant="contained"
                className="submitLogin-button"
                onClick={submitLogin}
              >
                <div className="submitLogin-text">Login</div>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Login;
