// AuthContext.js
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { dates_to_json_calendar, json_to_json_calendar } from "../utiles";
import { TryOutlined } from "@mui/icons-material";

const URL_BACKEND = process.env.REACT_APP_BACK_URL;
const URL_GEOREF = process.env.REACT_APP_GEOREF_URL;
const APP_KEY = process.env.REACT_APP_KEY;

/**
 * Enum representing the status of AE
 */
const AE = {
  /** Not an AE */
  NON_AE: -1,
  /** Finalized */
  FINALIZED: 0,
  /** Finishable */
  FINISHABLE: 1,
  /** Non-finishable */
  NON_FINISHABLE: 2,
};
const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [User, setUserState] = useState(null);
  const [Authorization, setAuthorizationState] = useState(null);
  const [serverDates, setServerDatesState] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(User !== null);

  /**
   * Function to set the authorization state and update the session storage accordingly
   * @param  {Object} newval - The new authorization state
   * @returns {void}
   * */
  const setAuthorization = (newval) => {
    setAuthorizationState(newval); // Set the authorization state
    if (newval === null) {
      localStorage.removeItem("authorization"); // Remove the "authorization" item from sessionStorage if newval is null
    } else {
      localStorage.setItem("authorization", JSON.stringify(newval)); // Store the newval in sessionStorage as a JSON string
    }
  };

  /**
   * Set the user state and update the session storage accordingly
   * @param {any} newval - The new value to set for the user state
   * @returns {void}
   */
  const setUser = (newval) => {
    setUserState(newval);
    if (newval === null) {
      //localStorage.removeItem("user");
    } else {
      //localStorage.setItem("user", JSON.stringify(newval));
    }
  };

  /**
   * Set the dates and update the state.
   * @param {type} newval - The new value to set for server dates
   * @return {void}
   */
  const setServerDates = (newval) => {
    setServerDatesState(newval);
    if (newval === null) {
      //localStorage.removeItem("dates");
    } else {
      //localStorage.setItem("dates", JSON.stringify(newval));
    }
  };

  /**
   *
   *  ░█████╗░██╗░░░██╗████████╗██╗░░██╗
   *  ██╔══██╗██║░░░██║╚══██╔══╝██║░░██║
   *  ███████║██║░░░██║░░░██║░░░███████║
   *  ██╔══██║██║░░░██║░░░██║░░░██╔══██║
   *  ██║░░██║╚██████╔╝░░░██║░░░██║░░██║
   *  ╚═╝░░╚═╝░╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝
   */
  /**
   * Authenticates the user with the provided username and password
   * @async
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   * @returns {Promise<boolean>} - True if the authentication is successful, false otherwise
   */
  const authenticate = async (username, password) => {
    try {
      // Send a POST request to the backend API to authenticate the user
      const response = await axios.post(
        `${URL_BACKEND}/api/auth/login`,
        {
          cuil: username,
          password: password,
        },
        {
          headers: { "X-API-Key": APP_KEY },
          withCredentials: true,
        }
      );

      let { authorization, user } = response.data;
      if (user && authorization) {
        // Save the authorization token for future requests
        setAuthorization(authorization);

        // Set additional headers for the axios instance
        axios.defaults.headers.common = {
          ...axios.defaults.headers.common,
          "XSRF-TOKEN": authorization.X_CSRF_TOKEN,
          "User-Agent": "FRONT-END-REACT",
          "X-API-Key": APP_KEY,
          Authorization: authorization.type + authorization.token,
        };

        try {
          // Get additional user data from the backend API
          const aeResponse = await axios.get(`${URL_BACKEND}/api/ae/dates`);
          const { type, dates } = aeResponse.data;
          user.ae = type;
          if (dates.startDay) {
            // Convert dates to calendar format and set it in the state
            const dates_calendar = dates_to_json_calendar(dates);
            setServerDates(dates_calendar);
          }
        } catch (error) {
          console.error("Error getting AE dates:", error);
        }
        // Set user authentication status and user data in the state
        setIsAuthenticated(true);
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  /**
   * Refreshes the user's token and retrieves fresh user data
   * @async
   * @return {Promise<boolean>} true if the token refresh was successful, false otherwise
   */
  const refesh = async () => {
    try {
      const response = await axios.post(
        `${URL_BACKEND}/api/auth/refresh`,
        {}, // No request body needed
        { headers: { "X-API-Key": APP_KEY } }
      );
      const { user } = response.data;
      if (user) {
        setUser(user);
        //TODO: do it all in one , get the user data and dates
        await get_ae_dates();
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  /**
   * Function to log out the user , and clear user data and authentication status
   * @async
   * @returns {Promise<boolean>} - Indicates if the logout was successful
   */
  const unauthenticate = async () => {
    try {
      // Send a POST request to the logout endpoint
      const response = await axios.post(`${URL_BACKEND}/api/auth/logout`);
      const { message } = response.data;
      if (message === "Successfully logged out") {
        // Clear user data and authentication status
        setUser(null);
        setIsAuthenticated(false);
        setServerDates(null);
      }
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  };

  /**
   * Function to send a registration request to the backend
   * @async
   * @param {Object} register_user - The user object to be registered
   * @returns {Promise<boolean>} - True if the user is created successfully, false otherwise
   */
  const registerRequest = async (register_user) => {
    try {
      // Send a POST request to the backend API to register the user
      const response = await axios.post(
        `${URL_BACKEND}/api/auth/register`,
        register_user,
        {
          headers: {
            "X-API-Key": APP_KEY,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { message } = response.data;
      return message === "User created successfully";
    } catch (error) {
      // Log and handle any errors that occur during the registration process
      console.error("Error during register:", error);
      return false;
    }
  };

  /**
   *
   * ██╗░░░██╗░██████╗███████╗██████╗░  ██████╗░███████╗░██████╗░█████╗░██╗░░░██╗██████╗░░█████╗░███████╗░██████╗
   * ██║░░░██║██╔════╝██╔════╝██╔══██╗  ██╔══██╗██╔════╝██╔════╝██╔══██╗██║░░░██║██╔══██╗██╔══██╗██╔════╝██╔════╝
   * ██║░░░██║╚█████╗░█████╗░░██████╔╝  ██████╔╝█████╗░░╚█████╗░██║░░██║██║░░░██║██████╔╝██║░░╚═╝█████╗░░╚█████╗░
   * ██║░░░██║░╚═══██╗██╔══╝░░██╔══██╗  ██╔══██╗██╔══╝░░░╚═══██╗██║░░██║██║░░░██║██╔══██╗██║░░██╗██╔══╝░░░╚═══██╗
   * ╚██████╔╝██████╔╝███████╗██║░░██║  ██║░░██║███████╗██████╔╝╚█████╔╝╚██████╔╝██║░░██║╚█████╔╝███████╗██████╔╝
   * ░╚═════╝░╚═════╝░╚══════╝╚═╝░░╚═╝  ╚═╝░░╚═╝╚══════╝╚═════╝░░╚════╝░░╚═════╝░╚═╝░░╚═╝░╚════╝░╚══════╝╚═════╝░
   */

  /**
   * Function to fetch user data asynchronously.
   *
   * @return {Promise<Object>} the response from the fetch
   */
  const fetch_user_data = async () => {
    try {
      const response = await axios.get(
        `${URL_BACKEND}/api/ae/fetch-user-data`,
        {},
        { headers: { "X-API-Key": APP_KEY } }
      );
      const { data } = response;
      return data;
    } catch (error) {
      console.error("Error al obtener el UserData:", error);
      return null;
    }
  };

  /**
   * Asynchronously fetches dates corresponding to the user's AE
   * @async
   * @returns {Promise<boolean>} - Whether the dates' start day is not null
   */
  const get_ae_dates = async () => {
    try {
      // Fetch AE dates from the backend API
      const response = await axios.get(`${URL_BACKEND}/api/ae/dates`, {
        headers: { "X-API-Key": APP_KEY },
      });
      const { type, dates } = response.data;
      // Update user state with AE type
      setUser((prevUser) => {
        return { ...prevUser, ae: type };
      });
      // If startDay exists, convert dates to JSON calendar and set serverDates state
      if (dates.startDay) {
        const dates_calendar = json_to_json_calendar(dates);
        setServerDates(dates_calendar);
      }
      // Return whether the start day is not null
      return dates.startDay !== null;
    } catch (error) {
      console.error("Error getting AE dates:", error);
      // Return false if there's an error getting AE dates
      return false;
    }
  };

  /**
   * Function to start the AE process asynchronously
   * @async
   * @param {Object} register_user - The user data to be registered
   * @returns {Promise<boolean>} - True if the process is successfully started, false otherwise
   */
  const start_ae_n = async (register_user) => {
    try {
      // Send a POST request to start the AE process
      const response = await axios.post(
        `${URL_BACKEND}/api/ae/start-n`,
        register_user,
        { headers: { "X-API-Key": APP_KEY } }
      );
      const message = response.data;
      if (message === "Agregado") {
        // Reset server dates
        setServerDates(null);
        return true;
      }
      return false;
    } catch (error) {
      // Log and return false if an error occurs during the registration process
      console.error("Error during register:", error);
      return false;
    }
  };

  /**
   * This function finalizes the current Ae, using the given password for authentication.
   *
   * @param {string} password - the password to use for finalization
   * @return {boolean} true if the Ae is finalized successfully, false otherwise
   */
  const finalize_ae = async (password) => {
    try {
      const response = await axios.post(
        `${URL_BACKEND}/api/ae/finalize`,
        {
          password: password,
        },
        { headers: { "X-API-Key": APP_KEY } }
      );
      const { message } = response.data;

      return message === "Finalizado";
    } catch (error) {
      console.error("Error during register:", error);
      return false;
    }
  };

  /**
   * Fetches a certificate of the end of the AE in format PDF.
   * @async
   * @returns {Promise<string>} The content of the end PDF on base64.
   */
  const fetch_end_pdf = async () => {
    try {
      const response = await axios.get(
        `${URL_BACKEND}/api/ae/fetch-end-pdf`,
        {},
        { headers: { "X-API-Key": APP_KEY } }
      );
      const { content } = response.data;
      return content;
    } catch (error) {
      console.error("Error al obtener el PDF:", error);
      return null;
    }
  };

  /**
   * Fetches  a certificate of the start of the AE in format PDF.
   * @async
   * @return {Promise<string>} The content of the PDF on base64.
   */
  const fetch_start_pdf = async () => {
    try {
      const response = await axios.get(
        `${URL_BACKEND}/api/ae/fetch-start-pdf`,
        {},
        { headers: { "X-API-Key": APP_KEY } }
      );
      const { content } = response.data;
      return content;
    } catch (error) {
      console.error("Error al obtener el PDF:", error);
      return null;
    }
  };

  useEffect(() => {
    const parsedAuthorization = JSON.parse(
      localStorage.getItem("authorization") || "null"
    );

    if (parsedAuthorization) {
      const { X_CSRF_TOKEN, type, token } = parsedAuthorization;
      axios.defaults.headers.common["XSRF-TOKEN"] = X_CSRF_TOKEN;
      axios.defaults.headers.common["User-Agent"] = "FRONT-END-REACT";
      axios.defaults.headers.common["Authorization"] = type + token;
      axios.defaults.headers.common["X-API-Key"] = APP_KEY;
    }
    refesh();
  }, []);
  return (
    <ServiceContext.Provider
      value={{
        fetch_end_pdf,
        isAuthenticated,
        setIsAuthenticated,
        User,
        setUser,
        serverDates,
        setServerDates,
        setAuthorization,
        Authorization,
        authenticate,
        unauthenticate,
        registerRequest,
        get_ae_dates,
        start_ae_n,
        AE,
        fetch_user_data,
        fetch_start_pdf,
        finalize_ae,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  return useContext(ServiceContext);
};
