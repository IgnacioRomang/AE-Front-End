import axios from "axios";
import React, { createContext, useContext } from "react";

const URL_BACKEND = process.env.REACT_APP_BACK_URL;
const URL_GEOREF = process.env.REACT_APP_GEOREF_URL;
const APP_KEY = process.env.REACT_APP_KEY;

const PublicResourseContext = createContext();

export const PublicResourcesProvider = ({ children }) => {
  /**
   * Function to get the names of the provinces
   * @async
   * @param {string} province - The name of the province(can be misspelled), it will be searched in the georef api
   * @returns {Promise<Array>}
   */
  const get_province_names = async () => {
    try {
      const response = await axios.get(`${URL_GEOREF}/provincias`, {
        params: {
          //nombre: province,
          campos: "estandar",
          aplanar: true,
          orden: "nombre",
        },
      });
      const { cantidad, provincias } = response.data;
      return cantidad > 0 ? provincias.map((elemento) => elemento.nombre) : [];
    } catch (error) {
      console.error("Error al obtener las provincias:", error);
      return [];
    }
  };

  const get_substate_names = async (province) => {
    try {
      const response = await axios.get(`${URL_GEOREF}/departamentos`, {
        params: {
          provincia: province,
          campos: "estandar",
          aplanar: true,
          max: 5000,
          orden: "nombre",
        },
      });
      const { cantidad, departamentos } = response.data;
      return cantidad > 0
        ? departamentos.map((elemento) => elemento.nombre)
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
  const get_citys_name = async (province, substate) => {
    try {
      const response = await axios.get(`${URL_GEOREF}/localidades`, {
        params: {
          provincia: province,
          departamento: substate,
          //nombre: city,
          campos: "estandar", // 'estandar' or 'basico'
          aplanar: true,
          max: 5000,
          orden: "nombre",
        },
      });
      const { cantidad, localidades } = response.data;
      return cantidad > 0 ? localidades.map((elemento) => elemento.nombre) : [];
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
   * Fetches the news list from the backend API.
   * @async
   * @return {Promise<Array>} the response data from the backend API
   */
  const fetch_news_list = async () => {
    try {
      const response = await axios.post(
        `${URL_BACKEND}/api/resources/get-news-list`,
        {},
        { headers: { "X-API-Key": APP_KEY } }
      );
      return response.data ? response.data : [];
    } catch (error) {
      console.error("Error fetching news list:", error);
      return null;
    }
  };

  /**
   * Fetches the news PDF for a given ID.
   *
   * @param {type} id - The ID of the news PDF to fetch
   * @return {Promise<string>} The url of the PDF
   */
  const fetch_news_pdf = async (id) => {
    try {
      const response = await axios.post(
        `${URL_BACKEND}/api/resources/get-news-pdf`,
        {
          id: id,
        },
        { headers: { "X-API-Key": APP_KEY } }
      );
      return response.data ? response.data : [];
    } catch (error) {
      console.error("Error fetching PDF viewer:", error);
      return null;
    }
  };

  const fetch_faq = async () => {
    try {
      let url = process.env.REACT_APP_BACK_URL;
      const response = await axios.get(url + "/api/resources/getQuestions");
      return response.data ? response.data : [];
    } catch (error) {
      console.error("Error fetching Answers&Questions:", error);
      return [];
    }
  };

  return (
    <PublicResourseContext.Provider
      value={{
        fetch_news_list,
        fetch_news_pdf,
        get_province_names,
        get_citys_name,
        get_address_names,
        get_substate_names,
        fetch_faq,
      }}
    >
      {children}
    </PublicResourseContext.Provider>
  );
};

export const usePublicResources = () => {
  return useContext(PublicResourseContext);
};
