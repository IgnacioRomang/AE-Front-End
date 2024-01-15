import React, { useState, useCallback, useImperativeHandle } from "react";
import { CardContent, Grid, TextField } from "@mui/material";
import { useAddressDataCardString } from "../../contexts/TextProvider.jsx";
import { doPostalCode, doApartment, doFloor } from "../../utiles.js";

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

    const [userData, setUserData] = useState({
      address,
      floor,
      apartment,
      province,
      city,
      postalCode,
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
    const handleChange = (event, field, formatter) => {
      const { value } = event.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        [field]: formatter(value),
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
        address: !address.trim(),
        province: !province.trim(),
        city: !city.trim(),
        postalCode: postalCode.trim() ? postalCode.length !== 4 : false,
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
          <Grid item xs={12} sm={4}>
            <TextField
              id="address"
              label={labels.street}
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
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="floor"
              label={labels.floor}
              disabled={false}
              onChange={(event) => handleChange(event, "floor", doFloor)}
              variant="standard"
              value={userData.floor}
              InputLabelProps={{
                shrink: Boolean(userData.floor !== ""),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="apartment"
              label={labels.apartment}
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
          <Grid item xs={12} sm={4}>
            <TextField
              id="province"
              label={labels.province}
              required
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
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="city"
              label={labels.city}
              required
              disabled={false}
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
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="postalCode"
              label={labels.postalCode}
              disabled={false}
              error={errors.postalCode}
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
        </Grid>
      </CardContent>
    );
  }
);

export default AddressDataCard;
