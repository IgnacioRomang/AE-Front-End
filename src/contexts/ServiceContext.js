// AuthContext.js
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [User, setUserState] = useState(null);
  const [Authorization, setAuthorizationState] = useState(null);
  const [serverDates, setServerDatesState] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(User !== null);

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
            ae: null,
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
    axios
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
    axios
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

  const getAEdates = async () => {
    let result = false;
    let url = process.env.REACT_APP_BACK_URL;
    const response = await axios.post(`${url}/api/ae/aedates`);
    if (!response.data.startDay) {
      let u = User;
      u.ae = false;
      setUser(u);
    } else {
      let u = User;
      u.ae = true;
      setUser(u);
      setServerDates({
        startDay: new Date(response.data.startDay),
        fifthMonth: new Date(response.data.fifthMonth),
        sixthMonth: new Date(response.data.sixthMonth),
        lastMonth: new Date(response.data.lastMonth),
      });
      result = true;
    }
    return result;
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
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  return useContext(ServiceContext);
};
