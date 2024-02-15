// AuthContext.js
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  dates_to_json_calendar,
  json_to_json_calendar,
  parseDate,
} from "../utiles";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [User, setUserState] = useState(null);
  const [Authorization, setAuthorizationState] = useState(null);
  const [serverDates, setServerDatesState] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(User !== null);
  const AE = {
    NON_AE: -1, //Sin auto
    FINALIZED: 0, //finalizado
    FINISHABLE: 1, // PRimera autoexlcusion
    NON_FINISHABLE: 2, // segunda o n
  };
  // "SETTERS" "SESSION STORAGE"
  const setAuthorization = (newval) => {
    setAuthorizationState(newval);
    if (newval === null) {
      sessionStorage.removeItem("authorization");
    } else {
      sessionStorage.setItem("authorization", JSON.stringify(newval));
      //defaultSetupAxios();
    }
  };

  const setUser = (newval) => {
    setUserState(newval);
    if (newval === null) {
      sessionStorage.removeItem("user");
    } else {
      sessionStorage.setItem("user", JSON.stringify(newval));
    }
  };

  const setServerDates = (newval) => {
    setServerDatesState(newval);
    if (newval === null) {
      sessionStorage.removeItem("dates");
    } else {
      sessionStorage.setItem("dates", JSON.stringify(newval));
    }
  };

  const get_province_names = async (province) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_GEOREF_URL + "/provincias",
        {
          params: {
            nombre: province,
            campos: "estandar",
            aplanar: true,
          },
        }
      );
      if (response.data.cantidad > 0) {
        const list = response.data.provincias.map(
          (elemento) => elemento.nombre
        );
        return list.sort();
      } else {
        console.error("No se encontraron provincias.");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener las provincias:", error);
      return [];
    }
  };

  const get_citys_name = async (province, city) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_GEOREF_URL + "/localidades",
        {
          params: {
            provincia: province,
            nombre: city,
            campos: "estandar",
            aplanar: true,
          },
        }
      );
      if (response.data.cantidad > 0) {
        const list = response.data.localidades.map(
          (elemento) => elemento.nombre + "," + elemento.departamento_nombre
        );
        return list.sort();
      } else {
        console.error("No se encontraron localidades.");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener las localidades:", error);
      return [];
    }
  };

  const get_address_names = async (province, city, address) => {
    try {
      let aux = city.split(",");
      const response = await axios.get(
        process.env.REACT_APP_GEOREF_URL + "/direcciones",
        {
          params: {
            direccion: address,
            provincia: province,
            departamento: aux[1],
            localidad: aux[0],
            campos: "basico",
            aplanar: true,
          },
        }
      );
      if (response.data.cantidad > 0) {
        const list = response.data.direcciones.map((elemento) => {
          const calleNombre =
            elemento.calle_nombre.charAt(0).toUpperCase() +
            elemento.calle_nombre.slice(1).toLowerCase();
          const alturaValor = elemento.altura_valor
            ? elemento.altura_valor
            : "NUMERO";
          return calleNombre + ", " + alturaValor;
        });
        const uniqueList = list.filter(
          (element, index, self) => index === self.indexOf(element)
        );
        return uniqueList.sort();
      } else {
        console.error("No se encontraron direcciones.");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener las direcciones:", error);
      return [];
    }
  };

  const authenticate = async (username, password) => {
    let url = process.env.REACT_APP_BACK_URL;
    let user = null;
    let result = false;
    let auth = null;
    try {
      const response = await axios.post(
        `${url}/api/auth/login`,
        {
          cuil: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      auth = response.data.authorization;
      setAuthorization(auth);

      axios.defaults.headers.common["XSRF-TOKEN"] = auth.X_CSRF_TOKEN;
      axios.defaults.headers.common["User-Agent"] = "FRONT-END-REACT";
      axios.defaults.headers.common["Authorization"] = auth.type + auth.token;

      let aeResponse = null;
      if (response.data !== null) {
        user = {
          name: response.data.user.name,
          cuil: response.data.user.cuil,
          ae: null,
        };

        aeResponse = await axios.get(`${url}/api/ae/aedates`);
        user.ae = aeResponse.data.type;
      }

      setIsAuthenticated(true);
      setUser(user);
      if (aeResponse.data.dates.startDay !== null) {
        //console.log(response.data.dates);
        const newServerDates = {};

        if (aeResponse.data.dates.hasOwnProperty("startDay")) {
          newServerDates.startDay = parseDate(aeResponse.data.dates.startDay);
        }

        if (aeResponse.data.dates.hasOwnProperty("fifthMonth")) {
          newServerDates.fifthMonth = parseDate(
            aeResponse.data.dates.fifthMonth
          );
        }

        if (aeResponse.data.dates.hasOwnProperty("sixthMonth")) {
          newServerDates.sixthMonth = parseDate(
            aeResponse.data.dates.sixthMonth
          );
        }

        if (aeResponse.data.dates.hasOwnProperty("lastMonth")) {
          newServerDates.lastMonth = parseDate(aeResponse.data.dates.lastMonth);
        }

        if (aeResponse.data.dates.hasOwnProperty("renewalMonth")) {
          newServerDates.endMonth = parseDate(
            aeResponse.data.dates.renewalMonth
          );
        }
        setServerDates(newServerDates);
      }
      result = true;
    } catch (error) {
      console.error("Error during login:", error);
    }

    return result;
  };

  const unauthenticate = async () => {
    let result = false;
    let url = process.env.REACT_APP_BACK_URL;
    await axios
      .post(`${url}/api/auth/logout`)
      .then((response) => {
        if (response.data.message == "Successfully logged out") {
          result = true;
        }
      })
      .catch((e) => {
        console.log("session finalizada");
      });
    setUser(null);
    setIsAuthenticated(false);
    setServerDates(null);
    return result;
  };

  const registerRequest = async (register_user) => {
    let result = false;
    let url = process.env.REACT_APP_BACK_URL;
    await axios
      .post(`${url}/api/auth/register`, register_user)
      .then((response) => {
        console.log("Datos enviados correctamente");
        result = true;
      })
      .catch((e) => {
        console.log(e);
      });
    return result;
  };

  const start_ae_n = async (register_user) => {
    let result = false;
    let url = process.env.REACT_APP_BACK_URL;
    await axios
      .post(url + "/api/ae/start_n", register_user)
      .then((response) => {
        if (response.data === "Agregado") {
          result = true;
          setServerDates(null);
        }
      });
    return result;
  };

  const finalize_ae = async (password) => {
    let result = false;
    let url = process.env.REACT_APP_BACK_URL;
    await axios
      .post(`${url}/api/ae/finalize`, {
        password: password,
      })
      .then((response) => {
        result = response.data.status === "Finalizado";
      })
      .catch((e) => {
        console.log(e);
        result = false;
      });
    setServerDates(null);

    return result;
  };

  const getAEdates = async () => {
    let result = false;
    let url = process.env.REACT_APP_BACK_URL;
    const response = await axios.get(`${url}/api/ae/aedates`);
    let u = User;
    u.ae = response.data.type;
    setUser(u);
    result = dates_to_json_calendar(response.data.dates);
    setServerDates(result);
    return result !== null;
  };

  const send_confirmation_code = async (code, email) => {
    let result = false;
    let url = process.env.REACT_APP_BACK_URL;
    await axios
      .post(url + "/api/auth/email/verify", {
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
    const response = await axios.get(`${url}/api/auth/email/verify-link`, {
      params: {
        hash: hash,
        id: id,
      },
    });
    return response.data.message !== null;
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
        setUser,
        serverDates,
        setServerDates,
        setAuthorization,
        Authorization,
        authenticate,
        unauthenticate,
        registerRequest,
        getAEdates,
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
