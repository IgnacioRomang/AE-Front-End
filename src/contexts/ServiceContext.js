// AuthContext.js
import axios from "axios";
import React, {
  createContext,
  useMemo,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  dates_to_json_calendar,
  json_to_json_calendar,
  parseDate,
} from "../utiles";

const ServiceContext = createContext();
const URL_BACKEND = process.env.REACT_APP_BACK_URL;
const URL_GEO = process.env.REACT_APP_GEOREF_URL;

export const ServiceProvider = ({ children }) => {
  const [User, setUserState] = useState(null);
  const [Authorization, setAuthorizationState] = useState(null);
  const [serverDates, setServerDatesState] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(User !== null);
  /**
   * Enumeration for AE status
   * @readonly
   * @enum {number}
   */
  const AE = {
    /** Sin auto */
    NON_AE: -1,
    /** finalizado */
    FINALIZED: 0,
    /** Primera autoexclusion */
    FINISHABLE: 1,
    /** segunda o n */
    NON_FINISHABLE: 2,
  };

  /**
   * Sets the authorization state and stores the value in the session storage
   * @param {Object} newval - The new authorization value to be set
   */
  const setAuthorization = (newval) => {
    setAuthorizationState(newval);
    if (newval === null) {
      // Remove authorization from session storage if new value is null
      sessionStorage.removeItem("authorization");
    } else {
      // Store the new authorization value in session storage
      sessionStorage.setItem("authorization", JSON.stringify(newval));
      // Perform additional setup if needed
      // defaultSetupAxios();
    }
  };

  /**
   * Set user state and update session storage
   * @param {Object} newval - The new value to set for the user state
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
   * Sets the server dates and stores them in session storage.
   * @param {Object} newval - The new server dates to be set
   */
  const setServerDates = (newval) => {
    // Update the state
    setServerDatesState(newval);

    // Store the dates in session storage
    if (newval === null) {
      sessionStorage.removeItem("dates");
    } else {
      sessionStorage.setItem("dates", JSON.stringify(newval));
    }
  };
  /**
   * Retrieves the names of provinces based on the provided province name.
   * @param {string} province - The name of the province to search for.
   * @returns {Array} - An array of province names sorted alphabetically.
   */
  const get_province_names = async (province) => {
    try {
      // Make a GET request to retrieve province data
      const response = await axios.get(`${URL_GEO}/provincias`, {
        params: {
          nombre: province,
          campos: "estandar",
          aplanar: true,
        },
      });
      // Check if there are any provinces found
      const list =
        response.data.cantidad > 0
          ? response.data.provincias.map((elemento) => elemento.nombre).sort()
          : [];
      return list;
    } catch (error) {
      // Log and return an empty array if an error occurs
      console.error("Error al obtener las provincias:", error);
      return [];
    }
  };

  /**
   * Retrieves the city names based on the given province and city.
   * @param {string} province - The name of the province.
   * @param {string} city - The name of the city.
   * @returns {Array} - An array of city names and department names sorted alphabetically.
   */
  const get_citys_name = async (province, city) => {
    try {
      // Make a GET request to fetch the localidades based on the province and city
      const response = await axios.get(`${URL_GEO}/localidades`, {
        params: {
          provincia: province,
          nombre: city,
          campos: "estandar",
          aplanar: true,
        },
      });

      // Destructure the cantidad and localidades from the response data
      const { cantidad, localidades } = response.data;

      if (cantidad > 0) {
        // If localidades are found, map and concatenate the city and department names, then sort the array alphabetically
        return localidades
          .map(
            (elemento) => `${elemento.nombre},${elemento.departamento_nombre}`
          )
          .sort();
      } else {
        // If no localidades are found, log an error and return an empty array
        console.error("No se encontraron localidades.");
        return [];
      }
    } catch (error) {
      // If an error occurs during the GET request, log the error and return an empty array
      console.error("Error al obtener las localidades:", error);
      return [];
    }
  };

  /**
   * Retrieves the unique address names based on the provided province, city, and address.
   * @param {string} province - The province of the address.
   * @param {string} city - The city of the address. Should be in the format "city,department".
   * @param {string} address - The address to retrieve names for.
   * @returns {Array} - Unique list of address names, sorted alphabetically.
   */
  const get_address_names = async (province, city, address) => {
    try {
      // Split the city into its name and department
      let [cityName, department] = city.split(",");

      // Make the API request to retrieve the address names
      const response = await axios.get(URL_GEO + "/direcciones", {
        params: {
          direccion: address,
          provincia: province,
          departamento: department,
          localidad: cityName,
          campos: "basico",
          aplanar: true,
        },
      });
      console.log(response.data);
      const { direcciones, cantidad } = response.data;

      // If addresses are found, format and return the list
      if (cantidad > 0) {
        const list = direcciones.map((elemento) => {
          const calleNombre =
            elemento.calle_nombre.charAt(0).toUpperCase() +
            elemento.calle_nombre.slice(1).toLowerCase();
          const alturaValor = elemento.altura_valor
            ? elemento.altura_valor
            : "NUMERO";
          return calleNombre + ", " + alturaValor;
        });
        const uniqueList = [...new Set(list)];
        return uniqueList.sort();
      } else {
        console.error("No addresses found.");
        return [];
      }
    } catch (error) {
      console.error("Error retrieving addresses:", error);
      return [];
    }
  };

  /**
   * Asynchronously authenticates the user with the provided username and password.
   *
   * @param {string} username - The user's username (CUIL).
   * @param {string} password - The user's password.
   * @returns {boolean} - True if authentication is successful, false otherwise.
   */
  const authenticate = async (username, password) => {
    try {
      // Send a POST request to the authentication API endpoint
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

      // Extract the authorization data from the response and set it as the default headers for future requests
      const auth = response.data.authorization;
      setAuthorization(auth);
      axios.defaults.headers.common["XSRF-TOKEN"] = auth.X_CSRF_TOKEN;
      axios.defaults.headers.common["User-Agent"] = "FRONT-END-REACT";
      axios.defaults.headers.common["Authorization"] = auth.type + auth.token;

      // Initialize user and aeResponse variables
      let user = null;
      let aeResponse = null;

      // If the response data is not null, extract user information and fetch additional data
      if (response.data !== null) {
        user = {
          name: response.data.user.name,
          cuil: response.data.user.cuil,
          ae: null,
        };

        aeResponse = await axios.get(`${URL_BACKEND}/api/ae/aedates`);
        user.ae = aeResponse.data.type;
      }

      // Set the user as authenticated and update user and server dates
      setIsAuthenticated(true);
      setUser(user);
      if (aeResponse.data.dates.startDay !== null) {
        const newServerDates = json_to_json_calendar(aeResponse.data.dates);
        setServerDates(newServerDates);
      }

      return true; // Return true to indicate successful authentication
    } catch (error) {
      console.error("Error during login:", error);
      return false; // Return false if an error occurs during authentication
    }
  };

  /**
   * Function to unauthenticate the user
   *
   * Makes a POST request to log out the user from the API
   * @returns {boolean} - true if the user is successfully logged out, false otherwise
   */
  const unauthenticate = async () => {
    try {
      // Make a POST request to log out the user from the API
      const response = await axios.post(`${URL_BACKEND}/api/auth/logout`);
      if (response.data.message === "Successfully logged out") {
        setUser(null); // Reset user data
        setIsAuthenticated(false); // Set authentication status to false
        setServerDates(null); // Reset server dates
        return true; // Return true if the user is successfully logged out
      } else {
        return false; // Return false if the API response message is not as expected
      }
    } catch (e) {
      console.log("Session finalizada"); // Log an error message if the request fails
      return false; // Return false if there is an error during the request
    }
  };

  /**
   * Asynchronously registers a user.
   *
   * @param {object} register_user - The user information to register.
   * @returns {boolean} - True if the user is created successfully, otherwise false.
   */
  const register_request = async (register_user) => {
    try {
      const response = await axios.post(
        `${URL_BACKEND}/api/auth/register`,
        register_user
      );
      console.log("Data sent successfully");
      return (
        response.data && response.data.message === "User created successfully"
      );
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  /**
   * Starts process N for user registration
   * @param {Object} register_user - The user registration data
   * @returns {boolean} - True if the process is successfully started, false otherwise
   */
  const start_ae_n = async (register_user) => {
    try {
      // Send user registration data to the server
      const response = await axios.post(
        `${URL_BACKEND}/api/ae/start_n`,
        register_user
      );
      // Check server response
      if (response.data === "Agregado") {
        // Reset server dates
        setServerDates(null);
        return true;
      }
      return false;
    } catch (error) {
      // Log and return false if there's an error
      console.error(error);
      return false;
    }
  };

  /**
   * Finalizes the AE process with the provided password.
   *
   * @param {string} password - The password for finalizing the AE process.
   * @returns {boolean} - Returns true if the AE process is finalized successfully, otherwise returns false.
   */
  const finalize_ae = async (password) => {
    try {
      // Make a POST request to finalize the AE process
      const response = await axios.post(`${URL_BACKEND}/api/ae/finalize`, {
        password: password,
      });

      // Return true if the response status is "Finalizado"
      return response.data.status === "Finalizado";
    } catch (e) {
      // Log the error and return false
      console.log(e);
      return false;
    }
  };

  /**
   * Fetches AE dates from the API and updates the user and server dates.
   * @returns {boolean} - True if the result is not null, otherwise false.
   */
  const get_ae_dates = async () => {
    // Fetch AE dates from the API
    const response = await axios.get(`${URL_BACKEND}/api/ae/aedates`);

    // Update the user with AE dates type
    setUser((u) => ({ ...u, ae: response.data.type }));

    // Convert dates to JSON calendar format
    const result = dates_to_json_calendar(response.data.dates);

    // Update the server dates
    setServerDates(result);

    // Return true if the result is not null, otherwise false
    return result !== null;
  };

  /**
   * Sends a confirmation code to the specified email address and verifies the email using the code.
   * @param {string} code - The confirmation code to be sent.
   * @param {string} email - The email address to receive the confirmation code.
   * @returns {boolean} - Indicates whether the email was successfully verified.
   */
  const send_confirmation_code = async (code, email) => {
    try {
      // Send a POST request to the backend API to verify the email using the confirmation code
      const response = await axios.post(
        `${URL_BACKEND}/api/auth/email/verify`,
        {
          code: code,
          email: email,
        }
      );

      // Return true if the email was successfully verified, false otherwise
      return response.data.message === "Email verified";
    } catch (error) {
      // Log any error that occurs during the verification process
      //TODO error
      console.log(error);
      return false;
    }
  };

  /**
   * Sends a confirmation email using the specified password and email
   * @param {string} password - The password to be used for the confirmation email
   * @param {string} email - The email address to which the confirmation email will be sent
   */
  const send_confirmation_email = async (password, email) => {
    try {
      // Send a POST request to the backend API to send the confirmation email
      await axios.post(`${URL_BACKEND}/api/auth/email/verify/send`, {
        password,
        email,
      });
    } catch (e) {
      // Log any errors that occur during the process
      console.log(e);
    }
  };

  /**
   * Sends a verification link for email confirmation.
   * @param {string} id - The user ID.
   * @param {string} hash - The verification hash.
   * @returns {Promise} The data returned from the server.
   */
  const send_confirmation_verify = async (id, hash) => {
    try {
      // Send a GET request to the backend API to verify the email confirmation link
      const response = await axios.get(
        `${URL_BACKEND}/api/auth/email/verify-link`,
        {
          params: {
            hash: hash,
            id: id,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Log any errors and throw an error with the response data
      console.log(error);
      throw new Error(error.response.data);
    }
  };

  /**
   * Fetches the end PDF from the backend API.
   * @returns {Promise<string>} The content of the end PDF.
   */
  const fetch_end_pdf = async () => {
    try {
      const { data } = await axios.get(`${URL_BACKEND}/api/ae/fetch-end-pdf`);
      return data.content;
    } catch (error) {
      console.error("Error al obtener el PDF:", error);
    }
  };

  /**
   * Fetches the start PDF from the backend API.
   *
   * @return {Promise} The content of the PDF
   */
  const fetch_start_pdf = async () => {
    try {
      const { data } = await axios.get(`${URL_BACKEND}/api/ae/fetch-start-pdf`);
      return data.content;
    } catch (error) {
      console.error("Error al obtener el PDF:", error);
    }
  };

  /**
   * Fetch user data from the backend API.
   * @returns {Promise} The promise object representing the user data.
   */
  const fetch_user_data = async () => {
    try {
      return await axios.get(`${URL_BACKEND}/api/ae/fetch-user-data`);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  /**
   * Sends a forgot password code to the specified email.
   * @param {string} code - The code to send.
   * @param {string} email - The email to send the code to.
   * @returns {boolean} - True if the email is verified, false otherwise.
   */
  const send_forgot_password_code = async (code, email) => {
    try {
      const { data } = await axios.post(
        `${URL_BACKEND}/api/auth/reset-password`,
        {
          code: code,
          email: email,
        }
      );
      return data.message === "Email verified";
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  /**
   * Sends a forgot password email.
   * @param {string} cuil - The user's CUIL.
   */
  const send_forgot_password_email = async (cuil) => {
    try {
      // Send a POST request to the forgot password endpoint with the user's CUIL
      await axios.post(`${URL_BACKEND}/api/auth/forgot-password`, { cuil });
    } catch (error) {
      // Log any errors that occur during the request
      console.log(error);
    }
  };
  /**
   * Fetches news from the backend API.
   * @returns {Promise} The promise object representing the result of the API call.
   */
  const fetch_news = async () => {
    return await axios.post(`${URL_BACKEND}/api/resources/get-news-list`);
  };

  /**
   * Fetches the news PDF for the given ID.
   * @param {string} id - The ID of the news PDF to fetch
   * @returns {Promise} - A promise that resolves with the fetched news PDF data
   */
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
      // Handle error
      console.error("Error fetching news PDF:", error);
      throw error;
    }
  };

  // This effect runs once when the component mounts
  useEffect(() => {
    (async () => {
      // Retrieve user, dates, and authorization from session storage
      const [storedUser, storedDates, storedAuthorization] = await Promise.all([
        sessionStorage.getItem("user"),
        sessionStorage.getItem("dates"),
        sessionStorage.getItem("authorization"),
      ]);

      // If user is stored, update user state and set isAuthenticated to true
      if (storedUser !== null) {
        setUserState(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }

      // If dates are stored, convert to calendar format and update server dates state
      if (storedDates !== null) {
        let dates_calendar = json_to_json_calendar(JSON.parse(storedDates));
        setServerDatesState(dates_calendar);
      }

      // If authorization is stored, update authorization state and set axios headers
      if (storedAuthorization !== null) {
        let addressuthorization_json = JSON.parse(storedAuthorization);
        setAuthorizationState(addressuthorization_json);
        axios.defaults.headers.common["XSRF-TOKEN"] =
          addressuthorization_json.X_CSRF_TOKEN;
        axios.defaults.headers.common["User-Agent"] = "FRONT-END-REACT";
        axios.defaults.headers.common["Authorization"] =
          addressuthorization_json.type + addressuthorization_json.token;
      }
    })();
  }, []);

  const contextValue = useMemo(
    () => ({
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
      send_forgot_password_code,
      fetch_news_pdf,
      fetch_end_pdf,
      fetch_news,
      send_forgot_password_email,
      register_request,
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
    }),
    []
  );

  return (
    <ServiceContext.Provider value={contextValue}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  return useContext(ServiceContext);
};
