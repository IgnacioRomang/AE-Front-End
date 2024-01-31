// AuthContext.js
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [User, setUserState] = useState(null);
  const [Authorization, setAuthorizationState] = useState(null);
  const [serverDates, setServerDatesState] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(User !== null);
  const AE = {
    NON_AE: -1,
    FINISHABLE: 0,
    FINALIZED: 1,
    NON_FINISHABLE: 2,
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
    //console.log(newval);
    if (newval === null) {
      sessionStorage.removeItem("dates");
    } else {
      sessionStorage.setItem("dates", JSON.stringify(newval));
    }
  };

  //NORMAL DATA

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

  // AXIOS
  const authenticate = async (username, password) => {
    let url = process.env.REACT_APP_BACK_URL;
    let user = null;
    let result = false;
    let auth = null;
    await axios
      .post(
        `${url}/api/auth/login`,
        {
          cuil: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        auth = response.data.authorization;
        setAuthorization(auth);

        if (response.data !== null) {
          let names = response.data.user.name.split(" ");
          user = {
            name: names[0],
            cuil: response.data.user.cuil,
            lastname: names[1],
            ae: AE.NON_AE,
          };
        }
        setIsAuthenticated(true);
        setUser(user);
        result = true;
        axios.defaults.headers.common["XSRF-TOKEN"] = auth.X_CSRF_TOKEN;
        axios.defaults.headers.common["User-Agent"] = "FRONT-END-REACT";
        axios.defaults.headers.common["Authorization"] = auth.type + auth.token;
      })
      .catch((e) => {
        console.error("Error durante el inicio de sesión:", e);
      });
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
        console.log(response.data);
        result = true;
      })
      .catch((e) => {
        console.log(e);
      });
    return result;
  };

  const start_ae = async (register_user) => {
    let result = false;
    let url = process.env.REACT_APP_BACK_URL;
    await axios
      .post(url + "/api/ae/start", { register_user })
      .then((response) => {
        if (response.data === "Agregado") {
          result = true;
        }
      });
    return result;
  };

  const finalize_ae = async (username, password) => {
    let url = process.env.REACT_APP_BACK_URL;
    const response = await axios.post(`${url}/api/ae/finalize`, {
      params: {
        current_password: password,
        cuil: username,
      },
    });
    return response.data.message !== null;
  };

  // TODO CAMBIAR NOMBRE
  const getAEdates = async () => {
    let result = false;
    let url = process.env.REACT_APP_BACK_URL;
    const response = await axios.get(`${url}/api/ae/aedates`);
    let u = User;
    u.ae = response.data.type;
    setUser(u);
    const parseDate = (dateString) => {
      const [year, month, day] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day);
    };
    console.log(response.data.dates);
    if (response.data.dates.startDay !== null) {
      // date.setUTCHours(date.getUTCHours());
      setServerDates({
        startDay: parseDate(response.data.dates),
        fifthMonth: parseDate(response.data.dates.fifthMonth),
        sixthMonth: parseDate(response.data.dates.sixthMonth),
        lastMonth: parseDate(response.data.dates.lastMonth),
      });
      
      result = true;
    }
    return result;
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
      let json = JSON.parse(storedDates);
      setServerDatesState({
        startDay: new Date(json.startDay),
        fifthMonth: new Date(json.fifthMonth),
        sixthMonth: new Date(json.sixthMonth),
        lastMonth: new Date(json.lastMonth),
      });
    }

    if (storedAuthorization !== null) {
      setAuthorizationState(JSON.parse(storedAuthorization));
      axios.defaults.headers.common["XSRF-TOKEN"] =
        storedAuthorization.X_CSRF_TOKEN;
      axios.defaults.headers.common["User-Agent"] = "FRONT-END-REACT";
      axios.defaults.headers.common["Authorization"] =
        storedAuthorization.type + storedAuthorization.token;
    }
  }, []);

  return (
    <ServiceContext.Provider
      value={{
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
        start_ae,
        AE,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  return useContext(ServiceContext);
};
