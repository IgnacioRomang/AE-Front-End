// AuthContext.js
import axios from "axios";
import React, { createContext, useContext } from "react";

const URL_BACKEND = process.env.REACT_APP_BACK_URL;
const APP_KEY = process.env.REACT_APP_KEY;

const PasswordServiceContext = createContext();

export const PasswordServiceProvider = ({ children }) => {
  /**
   * Send a forgot password email, the email will contain a link to reset the password.
   *
   * @param {string} cuil - The CUIL for the password reset
   * @return {boolean} Whether the password reset link was emailed successfully
   */
  const send_forgot_password_email = async (cuil) => {
    try {
      const response = await axios.post(
        `${URL_BACKEND}/api/password/forgot`,
        {
          cuil: cuil,
        },
        { headers: { "X-API-Key": APP_KEY } }
      );

      const { status } = response.data;

      return status === "We have emailed your password reset link.";
    } catch (error) {
      console.error("Error during password reset:", error);
      return false;
    }
  };

  /**
   * A function to send a reset password request.
   *
   * @param {string} token - the token for password reset (send by email)
   * @param {string} cuil - the user's CUIL
   * @param {string} password - the new password
   * @return {boolean} whether the password change was successful
   */

  const send_reset_password = async (
    token,
    cuil,
    password,
    password_confirmation
  ) => {
    try {
      const response = await axios.post(
        `${URL_BACKEND}/api/password/reset`,
        {
          token: token,
          cuil: cuil,
          password: password,
          password_confirmation: password_confirmation,
        },
        { headers: { "X-API-Key": APP_KEY } }
      );
      const { status } = response.data;
      return status === "Your password has been reset.";
    } catch (error) {
      console.error("Error during password reset:", error);
      return false;
    }
  };

  /**
   * Asynchronously changes the user's password
   * @async
   * @param {Object} data - the data containing the new password ( cuil, password, password_confirmation)
   * @return {boolean} true if the password was changed successfully, false otherwise
   */
  const change_user_password = async (data) => {
    try {
      const response = await axios.post(
        `${URL_BACKEND}/api/password/change`,
        data,
        { headers: { "X-API-Key": APP_KEY } }
      );
      const { message } = response.data;

      return message === "Password changed successfully";
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      return false;
    }
  };
  return (
    <PasswordServiceContext.Provider
      value={{
        send_forgot_password_email,
        change_user_password,
        send_reset_password,
      }}
    >
      {children}
    </PasswordServiceContext.Provider>
  );
};

export const usePasswordService = () => {
  return useContext(PasswordServiceContext);
};
