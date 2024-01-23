// AuthContext.js
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [User, setUserState] = useState(null);
  const [Authorization, setAuthorizationState] = useState(null);
  const [serverDates, setServerDatesState] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(User !== null);

  const authenticate = async (username, password) => {
    let url = process.env.REACT_APP_BACK_URL;
    let user = null;
    let auth = null;
    await axios
      .post(
        `${url}/api/auth/login`,
        {
          cuil: username,
          password: password,
        },
        {
          withCredentials: true, // Agrega esta opción para incluir las credenciales
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
            ae: false,
          };
        }
        setIsAuthenticated(true);
        setUser(user);
        axios.defaults.headers.common["XSRF-TOKEN"] = auth.X_CSRF_TOKEN;
        axios.defaults.headers.common["User-Agent"] = "FRONT-END-REACT";
        axios.defaults.headers.common["Authorization"] = auth.type + auth.token;
      })
      .catch((e) => {
        console.error("Error durante el inicio de sesión:", e);
      });
    return user;
  };

  const setAuthorization = (newval) => {
    setAuthorizationState(newval);
    if (newval === null) {
      sessionStorage.removeItem("authorization");
    } else {
      sessionStorage.setItem("authorization", JSON.stringify(Authorization));
      //defaultSetupAxios();
    }
  };

  const setUser = (newval) => {
    setUserState(newval);
    if (newval === null) {
      sessionStorage.removeItem("user");
    } else {
      sessionStorage.setItem("user", JSON.stringify(User));
    }
  };

  const setServerDates = (newval) => {
    setServerDatesState(newval);
    if (newval === null) {
      sessionStorage.removeItem("dates");
    } else {
      console.log("Date saved: " + JSON.stringify(serverDates));
      sessionStorage.setItem("dates", JSON.stringify(serverDates));
    }
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedDates = sessionStorage.getItem("dates");
    const storedAuthorization = sessionStorage.getItem("authorization");

    if (User == null && storedUser !== null) {
      setUserState(JSON.parse(storedUser));
      setIsAuthenticated(User !== null);
    }

    if (serverDates == null && storedDates !== null) {
      setServerDatesState(JSON.parse(storedDates));
    }

    if (Authorization == null && storedAuthorization !== null) {
      setAuthorizationState(JSON.parse(storedAuthorization));
      //defaultSetupAxios();
    }
  }, [setIsAuthenticated, setUserState, setServerDatesState]);

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
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  return useContext(ServiceContext);
};
