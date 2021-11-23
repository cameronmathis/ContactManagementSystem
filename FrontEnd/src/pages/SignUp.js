import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import utils
import { CreateUser } from "../utils/RestUtil";
import { getIsStringValid } from "../utils/ValidationUtil";
// import constants
import { signUp } from "../constants/Pages";
import {
  snackbarPosition,
  snackbarDuration,
  signUpFailMessage,
} from "../constants/Snackbar";
// import components
import Header from "../components/Header";
// import button
import Button from "@material-ui/core/Button";
// import snackbar
import Snackbar from "@material-ui/core/Snackbar";
// import alert
import Alert from "@material-ui/lab/Alert";
// import css
import "./css/SignUp.css";

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordOneValid, setIsPasswordOneValid] = useState(true);
  const [isPasswordTwoValid, setIsPasswordTwoValid] = useState(true);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const submitSignUp = () => {
    if (areValuesValid()) {
      CreateUser(username, passwordOne)
        .then(() => {
          setIsSnackbarOpen(false);
          navigate("/home");
        })
        .catch((error) => {
          setIsSnackbarOpen(true);
        });
    }
  };

  const areValuesValid = () => {
    let result = true;
    if (!getIsStringValid(username)) {
      setIsUsernameValid(false);
      result = false;
    } else {
      setIsUsernameValid(true);
    }
    if (!getIsStringValid(passwordOne)) {
      setIsPasswordOneValid(false);
      result = false;
    } else {
      setIsPasswordOneValid(true);
    }

    if (!getIsStringValid(passwordTwo)) {
      setIsPasswordTwoValid(false);
      result = false;
    } else {
      setIsPasswordTwoValid(true);
    }

    if (passwordOne !== passwordTwo) {
      setDoPasswordsMatch(false);
      result = false;
    } else {
      setDoPasswordsMatch(true);
    }
    return result;
  };

  return (
    <div className="signUp-container">
      <Header page={signUp} />
      <div className="signUp-content">
        <body>
          {isUsernameValid ? (
            <label className="usernameInput-label signUpInput-label">
              Username
            </label>
          ) : (
            <label className="usernameInput-label signUpInput-label-invalid">
              Username
            </label>
          )}
          <input
            className="username-input signUp-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          {isPasswordOneValid ? (
            <label className="passwordOneInput-label signUpInput-label">
              Password
            </label>
          ) : (
            <label className="passwordOneInput-label signUpInput-label-invalid">
              Password
            </label>
          )}
          <input
            type="password"
            className="passwordOne-input signUp-input"
            value={passwordOne}
            onChange={(e) => setPasswordOne(e.target.value)}
            placeholder="Password"
          />
          {isPasswordTwoValid ? (
            <label className="passwordTwoInput-label signUpInput-label">
              Password
            </label>
          ) : (
            <label className="passwordTwoInput-label signUpInput-label-invalid">
              Password
            </label>
          )}
          <input
            type="password"
            className="passwordTwo-input signUp-input"
            value={passwordTwo}
            onChange={(e) => setPasswordTwo(e.target.value)}
            placeholder="Password"
          />
          {doPasswordsMatch ? null : (
            <label className="doPasswordsMatch-label signUpInput-label-invalid">
              Passwords do not match.
            </label>
          )}
        </body>
        <footer>
          <div className="login-buttons">
            <div className="submitSignUpButton submitSignUp-button">
              <Button
                variant="contained"
                className="submitSignUp-button"
                onClick={submitSignUp}
              >
                <div className="submitSignUp-text">Sign-Up</div>
              </Button>
            </div>
          </div>
        </footer>
      </div>
      <Snackbar
        anchorOrigin={snackbarPosition}
        open={isSnackbarOpen}
        autoHideDuration={snackbarDuration}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {signUpFailMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SignUp;
