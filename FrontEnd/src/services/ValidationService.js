export const getIsStringValid = (string) => {
  return !!string;
};

export const getIsPhoneNumberValid = (string) => {
  const phoneNumberRegEx =
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  return phoneNumberRegEx.test(string);
};

export const getIsEmailAddressValid = (string) => {
  const emailAddressRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailAddressRegEx.test(string);
};
