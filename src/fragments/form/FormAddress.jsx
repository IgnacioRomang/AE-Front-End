import {
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { usePublicResources } from "../../contexts/PublicResourcesContext.js";
import {
  useCommonsFieldString,
  useFormAddressString,
} from "../../contexts/TextProvider.jsx";
import { doApartment, doFloor, doPostalCode, sleep } from "../../utiles.js";

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
  ({ address, floor, apartment, province, city, postalCode }, ref) => {
    const commonfields = useCommonsFieldString();
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

    const getSuggestions = async (field, value = "") => {
      let fields = [];
      switch (field) {
        default:
          fields = [];
          break;
        case "province":
          fields = await get_province_names();
          break;
        case "city":
          fields = await get_citys_name(provinceS);
          break;
        case "address":
          fields = await get_address_names(provinceS, substate, cityS);
          break;
        case "substate":
          fields = await get_substate_names(value);
      }

      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        [field]: fields,
      }));
      return fields;
    };
    /**
      * The `handleErrors` function is a callback function created using the `useCallback` hook. It is
        responsible for validating the user data and updating the `errors` state accordingly.
      * @returns {boolean} - Returns a boolean indicating whether any of the user data is invalid.
    */
    const handleErrors = useCallback(() => {
      const { address, province, city, postalCode } = userData;

      const errors = {
        address:
          address.trim() === "" ||
          isNaN(parseInt(address.replace(/\s/g, "").split(",")[1])),
        province: !province.trim(),
        city: !city.trim(),
        postalCode: !postalCode.trim() && postalCode.length !== 4,
      };

      setErrors(errors);

      return Object.values(errors).some(Boolean);
    }, [userData]);

    /**
     * The function exports a `getData` function that returns `userData` and is accessible through the
     * `ref` object.
     * @returns {object} - Returns an object containing the user data.
     */
    const getData = () => {
      return userData;
    };

    useImperativeHandle(ref, () => ({
      handleErrors,
      getData,
    }));

    useEffect(() => {
      (async () => {
        await getSuggestions("province");
      })();
    }, []);
    return (
      <CardContent>
        <Grid container spacing={3} padding={3}>
          <Grid item xs={12} sm={3.5}>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              required
              fullWidth
            >
              <InputLabel>Prov</InputLabel>
              <Select
                value={provinceS}
                input={<OutlinedInput label="Name" />}
                onChange={(event) =>
                  handleChange(event.target.value, "province", (value) => value)
                }
                error={errors.province}
              >
                {suggestions.province.map((suggestion, index) => (
                  <MenuItem key={suggestion} value={suggestion}>
                    {suggestion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3.5}>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              required
              fullWidth
            >
              <InputLabel>Depart</InputLabel>
              <Select
                disabled={provinceS === ""}
                value={substate}
                input={<OutlinedInput label="Name" />}
                onChange={(event) =>
                  handleChange(event.target.value, "substate", (value) => value)
                }
                error={errors.substate}
              >
                {suggestions.substate.map((suggestion, index) => (
                  <MenuItem key={suggestion} value={suggestion}>
                    {suggestion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3.5}>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              required
              fullWidth
            >
              <InputLabel>Localidad</InputLabel>
              <Select
                disabled={substate === "" || provinceS === ""}
                value={cityS}
                input={<OutlinedInput label="Name" />}
                onChange={(event) =>
                  handleChange(event.target.value, "city", (value) => value)
                }
                error={errors.city}
              >
                {suggestions.city.map((suggestion, index) => (
                  <MenuItem key={suggestion} value={suggestion}>
                    {suggestion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              id="postalCode"
              label={formaddresslables.postal_code}
              disabled={false}
              error={errors.postalCode}
              size="small"
              onChange={(event) =>
                handleChange(event, "postalCode", doPostalCode)
              }
              variant="standard"
              value={userData.postalCode}
              InputLabelProps={{
                shrink: Boolean(userData.postalCode !== ""),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={7}></Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="floor"
              label={formaddresslables.floor}
              size="small"
              disabled={false}
              onChange={(event) => handleChange(event, "floor", doFloor)}
              variant="standard"
              value={userData.floor}
              InputLabelProps={{
                shrink: Boolean(userData.floor !== ""),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="floor"
              label={formaddresslables.floor}
              size="small"
              disabled={false}
              onChange={(event) => handleChange(event, "floor", doFloor)}
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
                handleChange(event, "apartment", doApartment)
              }
              variant="standard"
              value={userData.apartment}
              InputLabelProps={{
                shrink: Boolean(userData.apartment !== ""),
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    );
  }
);

export default FormAddress;
