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
const FormAddress = React.forwardRef(
  ({ address, floor, apartment, number, province, city, postalCode }, ref) => {
    const formaddresslables = useFormAddressString();
    const {
      get_province_names,
      get_citys_name,
      get_substate_names,
      get_address_names,
    } = usePublicResources();

    const [userData, setUserData] = useState({
      floor,
      apartment,
      number,
      postalCode,
    });

    const [provinceS, setProvince] = useState(province);
    const [cityS, setCity] = useState(city);
    const [substate, setSubstate] = useState("");
    const [addressS, setAddress] = useState(address);

    const [suggestions, setSuggestions] = useState({
      province: [],
      city: [],
      postalCode: [],
      address: [],
      substate: [],
    });

    const [errors, setErrors] = useState({
      address: false,
      province: false,
      city: false,
      postalCode: false,
      substate: false,
      number: false,
    });

    const handleChange = async (value, field, formatter) => {
      switch (field) {
        case "province":
          setProvince(value);
          await getSuggestions("substate", value);
          setSubstate("");
          setCity("");
          setAddress("");
          break;
        case "substate":
          setSubstate(value);
          await getSuggestions("city", value);
          setCity("");
          setAddress("");
          break;
        case "city":
          setCity(value);
          await getSuggestions("address", value);
          setAddress("");
          break;
        case "address":
          setAddress(value);
          break;
        default:
          setUserData((prevUserData) => ({
            ...prevUserData,
            [field]: formatter(value),
          }));
      }
    };

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
            fields = await get_citys_name(provinceS, value);
            break;
          case "address":
            fields = await get_address_names(provinceS, substate, value);
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
        substate,
        get_province_names,
        get_substate_names,
        get_citys_name,
        get_address_names,
      ]
    );

    const handleErrors = useCallback(() => {
      const newDate = {
        ...userData,
        province: provinceS,
        city: cityS,
        address: addressS,
      };
      setUserData(newDate);
      const errors = {
        address: newDate.address.trim() === "",
        province: !newDate.province.trim(),
        city: !newDate.city.trim(),
        postalCode:
          !newDate.postalCode.trim() && newDate.postalCode.length !== 4,
        substate: !substate.trim(),
        number: !newDate.number.trim() || !itsNumber(newDate.number),
      };

      setErrors(errors);

      return Object.values(errors).some(Boolean);
    }, [userData, provinceS, cityS, addressS, substate]);

    const getData = () => {
      return userData;
    };

    useImperativeHandle(ref, () => ({
      handleErrors,
      getData,
    }));

    useEffect(() => {
      getSuggestions("province");
    }, [getSuggestions]);

    return (
      <CardContent>
        <Grid container spacing={3} padding={3}>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              freeSolo
              id="province"
              size="small"
              onChange={(event, newvalue) => {
                handleChange(newvalue, "province", (value) => value);
              }}
              options={suggestions.province}
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
              freeSolo
              id="provincia"
              size="small"
              options={suggestions.substate}
              onChange={(event, newvalue) => {
                handleChange(newvalue, "substate", (value) => value);
              }}
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
              freeSolo
              id="city"
              size="small"
              options={suggestions.city}
              onChange={(event, newvalue) => {
                handleChange(newvalue, "city", (value) => value);
              }}
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
              freeSolo
              id="address"
              size="small"
              options={suggestions.address}
              onChange={(event, newvalue) => {
                handleChange(newvalue, "address", (value) => value);
              }}
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
              value={userData.number}
              InputLabelProps={{
                shrink: Boolean(userData.number !== ""),
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
              value={userData.floor}
              InputLabelProps={{
                shrink: Boolean(userData.floor !== ""),
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
              value={userData.apartment}
              InputLabelProps={{
                shrink: Boolean(userData.apartment !== ""),
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
              value={userData.postalCode}
              InputLabelProps={{
                shrink: Boolean(userData.postalCode !== ""),
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    );
  }
);

export default FormAddress;
