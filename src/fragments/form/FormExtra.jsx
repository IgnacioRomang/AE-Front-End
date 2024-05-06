import {
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import React, { useImperativeHandle, useState } from "react";
import { useFormExtraString } from "../../contexts/TextProvider.jsx";
import { doEmail, doPhone } from "../../utiles.js";

const occupations = [
  { label: "Empleado", id: "E" },
  { label: "Profesional Independiente", id: "PI" },
  { label: "Autonomo", id: "A" },
  { label: "Estudiante", id: "ES" },
  { label: "Jubilado", id: "J" },
  { label: "Desocupado", id: "D" },
  { label: "Otro", id: "O" },
  { label: "No Contesta", id: "NC" },
];
const studys = [
  { label: "Primaria", id: "P" },
  { label: "Secundaria", id: "S" },
  { label: "Tercearua", id: "T" },
  { label: "Universitaria", id: "U" },
  { label: "Otra", id: "O" },
  { label: "No contesta", id: "NC" },
];
/**
 * The code defines a React functional component called `ExtraDataCard`. It is a card component that
 * displays and allows users to edit extra data such as occupation, study, phone, and email.
 *
 * @param {object} props - The props object passed to the component.
 * @param {string} props.occupation - The occupation of the user.
 * @param {string} props.study - The study capacity of the user.
 * @param {string} props.phone - The phone number of the user.
 * @param {string} props.email - The email of the user.
 * @returns {JSX.Element} - Returns the ExtraDataCard component.
 */
const FormExtra = React.forwardRef(
  ({ occupation, study, phone, email }, ref) => {
    const formextralabels = useFormExtraString();

    const [userData, setUserData] = useState({
      occupation,
      study,
      phone,
      email,
    });

    const [errors, setErrors] = useState({
      phone: false,
      email: false,
    });

    /**
     * The handleChange function updates the userData state by formatting the value of a specific field.
     *
     * @param {Event} event - The input event that triggered the change.
     * @param {string} field - The name of the field to update.
     * @param {function} formatter - The function used to format the field value.
     */
    const handleChange = (event, field, formatter) => {
      const { value } = event.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        [field]: formatter(value),
      }));
    };

    /**
     * The `handleErrors` function is a callback function that is used to validate the phone and email
     * fields in the `userData` state object.
     *
     * @param {object} userData - The user data object containing the phone and email fields to validate.
     * @returns {boolean} - Returns true if any of the fields have errors, otherwise returns false.
     */
    const handleErrors = () => {
      const { phone, email } = userData;
      const errors = {
        phone: !phone.trim() || !/^\+54 \(\d{2}\) \d{4}-\d{4}$/.test(phone),
        email: !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      };

      setErrors(errors);

      return Object.values(errors).some(Boolean);
    };

    /**
     * The handleChangeNotFormatter function updates the value of a specific field in the userData state
     * object using the setUserData function.
     *
     * @param {Event} event - The input event that triggered the change.
     * @param {string} field - The name of the field to update.
     */
    const handleChangeNotFormatter = (event, field) => {
      const value = event.target.value;
      setUserData((prevData) => ({ ...prevData, [field]: value }));
    };
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
        <Grid container padding={3} spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="occupation">
                {formextralabels.occupation}
              </InputLabel>
              <NativeSelect
                value={userData.occupation}
                size="small"
                onChange={(event) =>
                  handleChangeNotFormatter(event, "occupation")
                }
                inputProps={{
                  name: "occupation",
                  id: "occupation",
                }}
              >
                {occupations.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="Study">
                {formextralabels.capacity}
              </InputLabel>
              <NativeSelect
                value={userData.study}
                size="small"
                onChange={(event) => handleChangeNotFormatter(event, "study")}
                inputProps={{
                  name: "Study",
                  id: "Study",
                }}
              >
                {studys.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="phone"
              label={formextralabels.phone}
              disabled={false}
              error={errors.phone}
              size="small"
              value={userData.phone}
              onChange={(event) => handleChange(event, "phone", doPhone)}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="email"
              label={formextralabels.email}
              required
              disabled={null}
              size="small"
              value={userData.email}
              error={errors.email}
              onChange={(event) => handleChange(event, "email", doEmail)}
              variant="standard"
            />
          </Grid>
        </Grid>
      </CardContent>
    );
  }
);

export default FormExtra;
