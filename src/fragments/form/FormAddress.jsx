import { Autocomplete, CardContent, Grid, TextField } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { usePublicResources } from "../../contexts/PublicResourcesContext.js";
import { useFormAddressString } from "../../contexts/TextProvider.jsx";
import { doApartment, doFloor, doPostalCode, itsNumber } from "../../utiles.js";

/**
 * The `AddressDataCard` component is a form component that displays fields for entering address data such as street address, floor, apartment, province, city, and postal code.
 * @param {object} props - The component properties.
 * @param {string} props.address - The initial street address.
 * @param {string} props.floor - The initial floor.
 * @param {string} props.apartment - The initial apartment.
 * @param {string} props.province - The initial province.
 * @param {string} props.city - The initial city.
 * @param {string} props.postalCode - The initial postal code.
 * @returns {JSX.Element} - Returns the `AddressDataCard` component.
 */

const DEFAULT = { id: 0, nombre: "Ninguno" };

const setDefaults = (value) => (value !== "Ninguno" ? value : DEFAULT);

const FormAddress = React.forwardRef(
  (
    { address, floor, apartment, number, province, substate, city, postalCode },
    ref
  ) => {
    const formaddresslables = useFormAddressString();
    const {
      get_province_names,
      get_citys_name,
      get_substate_names,
      get_address_names,
    } = usePublicResources();

    const [floorS, setFloor] = useState(floor);
    const [apartmentS, setApartment] = useState(apartment);
    const [numberS, setNumber] = useState(number);
    const [postalCodeS, setPostalCode] = useState(postalCode);

    const [provinceS, setProvince] = useState(setDefaults(province));
    const [substateS, setSubstate] = useState(setDefaults(substate));
    const [cityS, setCity] = useState(setDefaults(city));
    const [addressS, setAddress] = useState(setDefaults(address));

    const [suggestions, setSuggestions] = useState({
      province: [],
      city: [],
      postalCode: [],
      address: [],
      substate: [],
    });

    const FieldActions = {
      province: async (value) => {
        setProvince(value);
        await getSuggestions("substate", value.nombre);
        setSubstate(DEFAULT);
        setCity(DEFAULT);
        setAddress(DEFAULT);
      },
      substate: async (value) => {
        setSubstate(value);
        await getSuggestions("city", value.nombre);
        setCity(DEFAULT);
        setAddress(DEFAULT);
      },
      city: async (value) => {
        setCity(value);
        await getSuggestions("address", value.nombre);
        setAddress(DEFAULT);
      },
      address: (value) => {
        setAddress(value);
      },
      floor: (value) => {
        setFloor(doFloor(value));
      },
      apartment: (value) => {
        setApartment(doApartment(value));
      },
      number: (value) => {
        setNumber(value);
      },
      postalCode: (value) => {
        setPostalCode(doPostalCode(value));
      },
    };

    const [errors, setErrors] = useState({
      address: false,
      province: false,
      city: false,
      postalCode: false,
      substate: false,
      number: false,
    });

    const handleChange = useCallback(async (value, field, formatter) => {
      if (value === null) value = DEFAULT;
      if (FieldActions.hasOwnProperty(field)) await FieldActions[field](value);
      else console.error(`Unknown field: ${field}`);
    });

    const getSuggestions = useCallback(
      async (field, value = "") => {
        let fields = [];
        switch (field) {
          default:
            fields = [];
            break;
          case "province":
            fields = await get_province_names();
            break;
          case "substate":
            fields = await get_substate_names(value);
            break;
          case "city":
            fields = await get_citys_name(provinceS.nombre, value);
            break;
          case "address":
            fields = await get_address_names(
              provinceS.nombre,
              substateS.nombre,
              value
            );
            break;
        }

        setSuggestions((prevSuggestions) => ({
          ...prevSuggestions,
          [field]: fields,
        }));
        return fields;
      },
      [
        provinceS,
        substateS,
        get_province_names,
        get_substate_names,
        get_citys_name,
        get_address_names,
      ]
    );

    const handleErrors = useCallback(() => {
      const newErrors = {
        province: !provinceS.id,
        substate: !substateS.id,
        city: !cityS.id,
        address: !addressS.id,
        postalCode: postalCodeS === "" && postalCodeS.length !== 4,
        number: numberS === "" || !itsNumber(numberS),
      };

      setErrors(newErrors);
      console.log(newErrors);
      return Object.values(newErrors).some(Boolean);
    }, [provinceS, cityS, addressS, substateS]);

    const getData = () => {
      return {
        province: provinceS,
        substate: substateS,
        city: cityS,
        address: addressS,
        floor: floorS,
        number: numberS,
        apartment: apartmentS,
        postalCode: postalCodeS,
      };
    };

    useImperativeHandle(ref, () => ({
      handleErrors,
      getData,
    }));

    useEffect(() => {
      getSuggestions("province");
    }, [getSuggestions]);

    const handleEqualToValue = (option, value) => option.id === value.id;

    const handleOptionLabel = (option) => option.nombre;

    const handleOptionKey = (option) => option.id;

    return (
      <CardContent>
        <Grid container spacing={3} padding={3}>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              autoHighlight
              id="province"
              size="small"
              onChange={(event, newvalue) => {
                handleChange(newvalue, "province", (value) => value);
              }}
              options={suggestions.province}
              value={provinceS}
              isOptionEqualToValue={handleEqualToValue}
              getOptionLabel={handleOptionLabel}
              getOptionKey={handleOptionKey}
              renderInput={(params) => (
                <TextField
                  variant="standard"
                  required
                  error={errors.province}
                  {...params}
                  label={formaddresslables.state}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Autocomplete
              autoHighlight
              id="substate"
              size="small"
              options={suggestions.substate}
              onChange={(event, newvalue) => {
                handleChange(newvalue, "substate", (value) => value);
              }}
              value={substateS}
              disabled={!provinceS.id}
              isOptionEqualToValue={handleEqualToValue}
              getOptionLabel={handleOptionLabel}
              getOptionKey={handleOptionKey}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  error={errors.substate}
                  variant="standard"
                  label={formaddresslables.apartment}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Autocomplete
              autoHighlight
              id="city"
              size="small"
              options={suggestions.city}
              onChange={(event, newvalue) => {
                handleChange(newvalue, "city", (value) => value);
              }}
              value={cityS}
              disabled={!provinceS.id || !substateS.id}
              isOptionEqualToValue={handleEqualToValue}
              getOptionLabel={handleOptionLabel}
              getOptionKey={handleOptionKey}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={errors.city}
                  required
                  variant="standard"
                  label={formaddresslables.city}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Autocomplete
              autoHighlight
              id="address"
              size="small"
              options={suggestions.address}
              onChange={(event, newvalue) => {
                handleChange(newvalue, "address", (value) => value);
              }}
              value={addressS}
              disabled={!provinceS.id || !substateS.id || !cityS.id}
              isOptionEqualToValue={handleEqualToValue}
              getOptionLabel={handleOptionLabel}
              getOptionKey={handleOptionKey}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  error={errors.address}
                  variant="standard"
                  label={formaddresslables.street}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              id="num"
              label={formaddresslables.number}
              size="small"
              required
              error={errors.number}
              disabled={false}
              onChange={(event) =>
                handleChange(event.target.value, "number", (value) => value)
              }
              variant="standard"
              value={numberS}
              InputLabelProps={{
                shrink: Boolean(numberS !== ""),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              id="floor"
              label={formaddresslables.floor}
              size="small"
              disabled={false}
              onChange={(event) =>
                handleChange(event.target.value, "floor", doFloor)
              }
              variant="standard"
              value={floorS}
              InputLabelProps={{
                shrink: Boolean(floorS !== ""),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              id="apartment"
              label={formaddresslables.apartment}
              size="small"
              disabled={false}
              onChange={(event) =>
                handleChange(event.target.value, "apartment", doApartment)
              }
              variant="standard"
              value={apartmentS}
              InputLabelProps={{
                shrink: Boolean(apartmentS !== ""),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="postalCode"
              label={formaddresslables.postal_code}
              disabled={false}
              required
              error={errors.postalCode}
              size="small"
              onChange={(event) =>
                handleChange(event.target.value, "postalCode", doPostalCode)
              }
              variant="standard"
              value={postalCodeS}
              InputLabelProps={{
                shrink: Boolean(postalCodeS !== ""),
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    );
  }
);

FormAddress.defaultProps = {
  address: "",
  substate: "",
  floor: "",
  apartment: "",
  number: "",
  province: "",
  city: "",
  postalCode: "",
};

export default FormAddress;
