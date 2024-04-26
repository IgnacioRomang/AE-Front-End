// AuthContext.js
import axios from "axios";
import React, { createContext, useContext } from "react";

const URL_BACKEND = process.env.REACT_APP_BACK_URL;
const APP_KEY = process.env.REACT_APP_KEY;

const EmailVerifyContext = createContext();

export const EmailVerifyProvider = ({ children }) => {
  /**
   * Re-sends the verification email to the user if they haven't verified their email address yet.
   * @async
   * @returns {boolean} true if the verification email was sent successfully, false otherwise. True don't means that the email was already verified.
   * @throws {Error} if there was an error sending the verification email.
   */
  const resend_verify_email = async () => {
    try {
      const response = await axios.post(
        `${URL_BACKEND}/api/email/notification`,
        {},
        { headers: { "X-API-Key": APP_KEY } }
      );
      const { message } = response.data;
      console.log(message);
      return true; // Return true if the request was successful
    } catch (error) {
      console.error("Error al reenviar el correo:", error); // Log the error
      return false; // Return false if there was an error
    }
  };

  /**
   * Sends the credentials to verify the email, and returns true if the email is verified.
   * This function is called when the user clicks on the verification link in the email.
   * @async
   * @param {string} id - the ID for verification
   * @param {string} hash - the hash for verification
   * @param {number} expires - the expiration time for the verification link
   * @param {string} signature - the signature for verification
   * @return {boolean} true if email is verified, false if not
   */
  const send_confirmation_verify = async (id, hash, expires, signature) => {
    try {
      const response = await axios.post(
        `${URL_BACKEND}/api/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`,
        {},
        { headers: { "X-API-Key": APP_KEY } }
      );
      const { message } = response.data;
      return (
        message === "Email verified" || message === "Email already verified"
      );
    } catch (error) {
      console.error("Error during email verification:", error);
      return false;
    }
  };

  /**
   * Sends confirmation code to the specified email address for verification
   * @async
   * @param {string} code - The confirmation code to send
   * @param {string} email - The email address to send the confirmation code to
   * @returns {boolean} - True if the confirmation code was successfully sent, otherwise false
   */
  const send_confirmation_code = async (code, email) => {
    try {
      // Send a POST request to the backend API to confirm the email verification
      const response = await axios.post(
        `${URL_BACKEND}/api/auth/email/verify/confirm`,
        {
          code: code,
          email: email,
        },
        { headers: { "X-API-Key": APP_KEY } }
      );
      const { message } = response.data;
      if (message === "Confirmation successful") {
        return true;
      }
      return false;
    } catch (error) {
      // Log an error message if there was an error during email verification
      console.error("Error during email verification:", error);
      return false;
    }
  };

  /**
   * Send confirmation email
   * @param {string} password - The password to use for verification
   * @param {string} email - The email address to send the confirmation email to
   * @returns {Promise<boolean>} - True if confirmation is successful, otherwise false
   */
  const send_confirmation_email = async (password, email) => {
    try {
      // Send a post request to the backend API to send the confirmation email
      const result = await axios.post(
        `${URL_BACKEND}/api/email/change`,
        {
          current_password: password,
          email: email,
        },
        { headers: { "X-API-Key": APP_KEY } }
      );
      const { message } = result.data;
      return message === "Verification send successfully";
    } catch (error) {
      // Log and return false if there's an error during the confirmation process
      console.error("Error during code verification: ", error);
      return false;
    }
  };

  return (
    <EmailVerifyContext.Provider
      value={{
        send_confirmation_email,
        send_confirmation_code,
        send_confirmation_verify,
        resend_verify_email,
      }}
    >
      {children}
    </EmailVerifyContext.Provider>
  );
};

export const useEmailVerify = () => {
  return useContext(EmailVerifyContext);
};
