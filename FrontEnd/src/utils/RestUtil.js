// import constants
import { API_URL } from "../constants/API";

// USERS

export async function CreateUser(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };

  return fetch(API_URL + "/users", requestOptions).then((data) => data.json());
}

export async function GetUserByUsername(username) {
  const requestOptions = {};

  return fetch(API_URL + "/users/" + username, requestOptions).then((data) =>
    data.json()
  );
}

// CONTACTS

export async function CreateContact(
  firstName,
  lastName,
  phoneNumber,
  emailAddress
) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
    }),
  };

  return fetch(API_URL + "/contacts", requestOptions).then((data) =>
    data.json()
  );
}

export async function GetContactById(contactId) {
  const requestOptions = {};

  return fetch(API_URL + "/contacts/" + contactId, requestOptions).then(
    (data) => data.json()
  );
}

export async function GetAllContacts() {
  const requestOptions = {};

  return fetch(API_URL + "/contacts", requestOptions).then((data) =>
    data.json()
  );
}

export async function UpdateContactById(
  contactId,
  firstName,
  lastName,
  phoneNumber,
  emailAddress
) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
    }),
  };

  return fetch(API_URL + "/contacts/" + contactId, requestOptions).then(
    (data) => data.json()
  );
}

export async function DeleteContactById(contactId) {
  const requestOptions = {
    method: "DELETE",
  };

  return fetch(API_URL + "/contacts/" + contactId, requestOptions).then(
    (data) => data.json()
  );
}
