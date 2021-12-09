// import constants
import { PHONE_NUMBER_REGEX, EMAIL_ADDRESS_REGEX } from "../constants/RegEx";

export const getIsStringValid = (string) => {
  return !!string;
};

export const getIsPhoneNumberValid = (string) => {
  return PHONE_NUMBER_REGEX.test(string);
};

export const getIsEmailAddressValid = (string) => {
  return EMAIL_ADDRESS_REGEX.test(string);
};
