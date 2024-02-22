// AuthContext.js
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  dates_to_json_calendar,
  json_to_json_calendar,
  parseDate,
} from "../utiles";

const URL_BACKEND = process.env.REACT_APP_BACK_URL;
const URL_GEOREF = process.env.REACT_APP_GEOREF_URL;

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
      sessionStorage.removeItem("authorization"); // Remove the "authorization" item from sessionStorage if newval is null
    } else {
      sessionStorage.setItem("authorization", JSON.stringify(newval)); // Store the newval in sessionStorage as a JSON string
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
      sessionStorage.removeItem("user");
    } else {
      sessionStorage.setItem("user", JSON.stringify(newval));
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
      sessionStorage.removeItem("dates");
    } else {
      sessionStorage.setItem("dates", JSON.stringify(newval));
    }
  };

  /**
   * Function to get the names of the provinces
   * @async
   * @param {string} province - The name of the province(can be misspelled), it will be searched in the georef api
   * @returns {Promise<Array>}
   */
  const get_province_names = async (province) => {
    try {
      const response = await axios.get(`${URL_GEOREF}/provincias`, {
        params: {
          nombre: province,
          campos: "estandar",
          aplanar: true,
        },
      });
      const { cantidad, provincias } = response.data;
      return cantidad > 0
        ? provincias.map((elemento) => elemento.nombre).sort()
        : [];
    } catch (error) {
      console.error("Error al obtener las provincias:", error);
      return [];
    }
  };

  /**
   * Asynchronously fetches city names based on province and city names.
   * @async
   * @param {string} province - the name of the province (can't be misspelled)
   * @param {string} city - the name of the city in the province (can be misspelled)
   * @return {Array<string>} an array of city names with department names, or an empty array
   */
  const get_citys_name = async (province, city) => {
    try {
      const response = await axios.get(`${URL_GEOREF}/localidades`, {
        params: {
          provincia: province,
          nombre: city,
          campos: "estandar", // 'estandar' or 'basico'
          aplanar: true,
        },
      });
      const { cantidad, localidades } = response.data;
      return cantidad > 0
        ? localidades.map(
            (elemento) => `${elemento.nombre},${elemento.departamento_nombre}`
          )
        : [];
    } catch (error) {
      console.error("Error al obtener las localidades:", error);
      return [];
    }
  };
  /**
   * Asynchronously retrieves address names based on the given province, city, and address.
   * @async
   * @param {string} province - The province where the address is located (can't be misspelled).
   * @param {string} city - The city where the address is located (can't be misspelled).
   * @param {string} address - The address to be searched (can be misspelled).
   * @returns {Array<string>} - An array of formatted address names.
   */
  const get_address_names = async (province, city, address) => {
    try {
      // Split the city into locality and department
      const [locality, department] = city.split(",");
      // Make a GET request to retrieve address names
      const response = await axios.get(`${URL_GEOREF}/direcciones`, {
        params: {
          direccion: address,
          provincia: province,
          departamento: department,
          localidad: locality,
          campos: "basico",
          aplanar: true,
        },
      });
      const { cantidad, direcciones } = response.data;
      // Process the retrieved address names
      return cantidad > 0
        ? direcciones
            .map((elemento) => {
              // Format the street name and house number
              const calleNombre = `${elemento.calle_nombre
                .charAt(0)
                .toUpperCase()}${elemento.calle_nombre.slice(1).toLowerCase()}`;
              const alturaValor = elemento.altura_valor
                ? elemento.altura_valor
                : "NUMERO";
              return `${calleNombre}, ${alturaValor}`;
            })
            .filter((elemento, index, self) => index === self.indexOf(elemento)) // Remove duplicate addresses
            .sort() // Sort the addresses
        : [];
    } catch (error) {
      console.error("Error al obtener las direcciones:", error);
      return [];
    }
  };

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
          withCredentials: true,
        }
      );

      const { authorization, user } = response.data;

      if (user && authorization) {
        // Save the authorization token for future requests
        setAuthorization(authorization);

        // Set additional headers for the axios instance
        axios.defaults.headers.common = {
          ...axios.defaults.headers.common,
          "XSRF-TOKEN": authorization.X_CSRF_TOKEN,
          "User-Agent": "FRONT-END-REACT",
          Authorization: authorization.type + authorization.token,
        };

        let user_data = {
          name: user.name,
          cuil: user.cuil,
          ae: null,
        };

        try {
          // Get additional user data from the backend API
          const aeResponse = await axios.get(`${URL_BACKEND}/api/ae/dates`);
          const { type, dates } = aeResponse.data;
          user_data.ae = type;
          if (dates.startDay) {
            // Convert dates to calendar format and set it in the state
            const dates_calendar = json_to_json_calendar(dates);
            setServerDates(dates_calendar);
          }
        } catch (error) {
          console.error("Error getting AE dates:", error);
        }
        // Set user authentication status and user data in the state
        setIsAuthenticated(true);
        setUser(user_data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error during login:", error);
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
        register_user
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
        register_user
      );
      const { message } = response.data;
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
      const response = await axios.post(`${URL_BACKEND}/api/ae/finalize`, {
        password: password,
      });
      const { message } = response.data;
      return message === "Finalizado";
    } catch (error) {
      console.error("Error during register:", error);
      return false;
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
      const response = await axios.get(`${URL_BACKEND}/api/ae/dates`);
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

  const send_confirmation_code = async (code, email) => {
    try {
      const response = await axios.post(
        `${URL_BACKEND}/api/auth/email/verify/confirm`,
        {
          code: code,
          email: email,
        }
      );
      const { message } = response.data;
      if (message === "Email Email") {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error during email verification:", error);
      return false;
    }
  };

  const send_confirmation_email = async (password, email) => {
    //let result = false;
    let url = process.env.REACT_APP_BACK_URL;
    await axios
      .post(url + "/api/auth/email/verify/send", {
        password: password,
        email: email,
      })
      .catch((e) => {
        console.log(e);
      });
    //return result;
  };

  const send_confirmation_verify = async (id, hash) => {
    let url = process.env.REACT_APP_BACK_URL;
    await axios
      .get(`${url}/api/auth/email/verify-link`, {
        params: {
          hash: hash,
          id: id,
        },
      })
      .catch((e) => {
        console.log(e);
        throw new Error(e.response.data);
      });
  };

  const fetch_end_pdf = async () => {
    let url = process.env.REACT_APP_BACK_URL;
    try {
      const response = await axios.get(url + "/api/ae/fetch-end-pdf");
      return response.data.content;
    } catch (error) {
      console.error("Error al obtener el PDF:", error);
    }
  };

  const fetch_start_pdf = async () => {
    let url = process.env.REACT_APP_BACK_URL;
    try {
      const response = await axios.get(url + "/api/ae/fetch-start-pdf");
      console.log(response);
      return response.data.content;
    } catch (error) {
      console.error("Error al obtener el PDF:", error);
    }
  };

  const fetch_user_data = async () => {
    let url = process.env.REACT_APP_BACK_URL;
    try {
      const response = await axios.get(url + "/api/ae/fetch-user-data");
      return response;
    } catch (error) {
      console.error("Error al obtener el UserData:", error);
    }
  };

  const send_forgot_password_code = async (code, email) => {
    let result = false;
    let url = process.env.REACT_APP_BACK_URL;
    await axios
      .post(url + "/api/auth/reset-password", {
        code: code,
        email: email,
      })
      .then((response) => {
        if (response.data.message === "Email verified") {
          result = true;
        }
      })
      .catch((e) => {
        console.log(e);
      });
    return result;
  };

  const send_forgot_password_email = async (cuil) => {
    //let result = false;
    let url = process.env.REACT_APP_BACK_URL;
    await axios
      .post(url + "/api/auth/forgot-password", {
        cuil: cuil,
      })
      .catch((e) => {
        console.log(e);
      });
    //return result;
  };

  const fetch_news_list = async () => {
    try {
      const response = await axios.post(
        `${URL_BACKEND}/api/resources/get-news-list`
      );
      return response.data;
    } catch (error) {
      // handle error
      return null;
    }
  };

  const fetch_news_pdf = async (id) => {
    try {
      const response = await axios.post(
        `${URL_BACKEND}/api/resources/get-news-pdf`,
        {
          id: id,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching PDF viewer:", error);
      // Handle error if needed
    }
  };
  // REFRESCO
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedDates = sessionStorage.getItem("dates");
    const storedAuthorization = sessionStorage.getItem("authorization");

    if (storedUser !== null) {
      setUserState(JSON.parse(storedUser));
      setIsAuthenticated(true); // Actualiza el estado directamente
    }

    if (storedDates !== null) {
      let dates_calendar = json_to_json_calendar(JSON.parse(storedDates));
      setServerDatesState(dates_calendar);
    }

    if (storedAuthorization !== null) {
      let addressuthorization_json = JSON.parse(storedAuthorization);
      setAuthorizationState(addressuthorization_json);
      axios.defaults.headers.common["XSRF-TOKEN"] =
        addressuthorization_json.X_CSRF_TOKEN;
      axios.defaults.headers.common["User-Agent"] = "FRONT-END-REACT";
      axios.defaults.headers.common["Authorization"] =
        addressuthorization_json.type + addressuthorization_json.token;
    }
  }, []);

  return (
    <ServiceContext.Provider
      value={{
        fetch_end_pdf,
        isAuthenticated,
        setIsAuthenticated,
        User,
        fetch_news_list,
        fetch_news_pdf,
        setUser,
        send_forgot_password_email,
        serverDates,
        setServerDates,
        setAuthorization,
        Authorization,
        authenticate,
        unauthenticate,
        registerRequest,
        get_ae_dates,
        send_confirmation_email,
        send_confirmation_code,
        get_province_names,
        get_citys_name,
        get_address_names,
        send_confirmation_verify,
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
