import { CardContent, Grid, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useCallback, useImperativeHandle, useState } from "react";
import { useService } from "../../contexts/ServiceContext.js";
import { useAddressDataCardString } from "../../contexts/TextProvider.jsx";
import { doApartment, doFloor, doPostalCode } from "../../utiles.js";

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
const AddressDataCard = React.forwardRef(
  ({ address, floor, apartment, province, city, postalCode }, ref) => {
    const labels = useAddressDataCardString();
    const { get_province_names, get_citys_name, get_address_names } =
      useService();
    const [userData, setUserData] = useState({
      address,
      floor,
      apartment,
      province,
      city,
      postalCode,
    });
    const [suggestions, setSuggestions] = useState({
      province: [],
      city: [],
      postalCode: [],
      address: [],
    });
    const [errors, setErrors] = useState({
      address: false,
      province: false,
      city: false,
      postalCode: false,
    });

    /**
     * Updates the user data state by formatting the value of a specific field.
     * @param {Event} event - The input event.
     * @param {string} field - The field name.
     * @param {function} formatter - The function used to format the value.
     */
    const handleChange = async (event, field, formatter) => {
      const { value } = event.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        [field]: formatter(value),
      }));

      if (
        field === "province" ||
        field === "city" ||
        field === "postalCode" ||
        field === "address"
      ) {
        const newSuggestions = await getSuggestions(field, value);
        setSuggestions((prevSuggestions) => ({
          ...prevSuggestions,
          [field]: newSuggestions,
        }));
      }
    };

    const getSuggestions = async (field, value) => {
      let fields = [];
      switch (field) {
        default:
          fields = [];
          break;
        case "province":
          fields = await get_province_names(value);
          break;
        case "city":
          fields = await get_citys_name(userData.province, value);
          break;
        case "address":
          fields = await get_address_names(
            userData.province,
            userData.city,
            value
          );
          break;
      }
      return fields
        .filter((suggestion) => suggestion.toLowerCase())
        .slice(0, 3);
    };

    const handleSuggestionClick = (field, suggestion) => {
      setUserData((prevUserData) => ({
        ...prevUserData,
        [field]: suggestion,
      }));
      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        [field]: [],
      }));
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

    return (
      <CardContent>
        <Grid container spacing={3} padding={3}>
          <Grid item xs={12} sm={3}>
            <TextField
              id="province"
              label={labels.province}
              required
              size="small"
              disabled={false}
              error={errors.province}
              onChange={(event) =>
                handleChange(event, "province", (value) => value)
              }
              variant="standard"
              value={userData.province}
              InputLabelProps={{
                shrink: Boolean(userData.province !== ""),
              }}
            />
            {suggestions.province.length > 0 && (
              <>
                <Typography
                  variant="body1"
                  style={{ alignItems: "left", fontSize: "10px" }}
                >
                  {labels.suggest}
                </Typography>
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                  {suggestions.province.map((suggestion, index) => (
                    <React.Fragment key={index}>
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: "12px",
                          color: blue[500],
                          //marginLeft: index > 0 ? "4px" : "0",
                        }}
                        onClick={() =>
                          handleSuggestionClick("province", suggestion)
                        }
                      >
                        {suggestion}
                        {index < suggestions.province.length - 1 && (
                          <span>, </span>
                        )}
                      </Typography>
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              label={labels.city}
              required
              disabled={false}
              size="small"
              error={errors.city}
              onChange={(event) =>
                handleChange(event, "city", (value) => value)
              }
              variant="standard"
              value={userData.city}
              InputLabelProps={{
                shrink: Boolean(userData.city !== ""),
              }}
            />
            {suggestions.city.length > 0 && (
              <>
                <Typography
                  variant="body1"
                  style={{ alignItems: "left", fontSize: "10px" }}
                >
                  {labels.suggest}
                </Typography>
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                  {suggestions.city.map((suggestion, index) => (
                    <React.Fragment key={index}>
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: "12px",
                          color: blue[500],
                          //marginLeft: index > 0 ? "4px" : "0",
                        }}
                        onClick={() =>
                          handleSuggestionClick("city", suggestion)
                        }
                      >
                        {suggestion.split(",")[0]}
                        {index < suggestions.city.length - 1 && <span>, </span>}
                      </Typography>
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="postalCode"
              label={labels.postalCode}
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
          <Grid item xs={12} sm={7}>
            <TextField
              id="address"
              label={labels.street}
              size="small"
              required
              disabled={false}
              error={errors.address}
              variant="standard"
              value={userData.address}
              onChange={(event) =>
                handleChange(event, "address", (value) => value)
              }
              InputLabelProps={{
                shrink: Boolean(userData.address !== ""),
              }}
            />
            {suggestions.address.length > 0 && (
              <>
                <Typography
                  variant="body1"
                  style={{ alignItems: "left", fontSize: "10px" }}
                >
                  {labels.suggest}
                </Typography>
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                  {suggestions.address.map((suggestion, index) => (
                    <React.Fragment key={index}>
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: "12px",
                          color: blue[500],
                          //marginLeft: index > 0 ? "4px" : "0",
                        }}
                        onClick={() =>
                          handleSuggestionClick("address", suggestion)
                        }
                      >
                        {suggestion.split(",")[0]}
                        {index < suggestions.address.length - 1 && (
                          <span>, </span>
                        )}
                      </Typography>
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="floor"
              label={labels.floor}
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
              label={labels.apartment}
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

export default AddressDataCard;
