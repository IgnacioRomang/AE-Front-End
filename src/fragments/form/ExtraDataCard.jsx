import {
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import React, { useState, useCallback, useImperativeHandle } from "react";
import { useExtraDataCardString } from "../../contexts/TextProvider";
import { doEmail, doPhone } from "../../utiles";

const occupations = [
  { label: "Estudiante", id: 11 },
  { label: "Profesional", id: 12 },
  { label: "Trabajador", id: 13 },
  { label: "Otro", id: 14 },
];
const study = [
  { label: "Primaria", id: 21 },
  { label: "Secundaria", id: 22 },
  { label: "Tercearua", id: 23 },
  { label: "Universitaria", id: 24 },
  { label: "Otra", id: 25 },
  { label: "No contesta", id: 26 },
];
/* The code defines a React functional component called `ExtraDataCard`. It is a card component that
displays and allows users to edit extra data such as occupation, study, phone, and email. */

const ExtraDataCard = React.forwardRef((props, ref) => {
  const labels = useExtraDataCardString();

  const [userData, setUserData] = useState({
    occupation: props.occupation,
    study: props.study,
    phone: props.phone,
    email: props.email,
  });

  const [errors, setErrors] = useState({
    phone: false,
    email: false,
  });

  /**
   * The handleChange function updates the userData state by formatting the value of a specific field.
   */
  const handleChange = (event, field, formatter) => {
    const { value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: formatter(value),
    }));
  };

  /* The `handleErrors` function is a callback function that is used to validate the phone and email
fields in the `userData` state object. */
  const handleErrors = useCallback(() => {
    const { phone, email } = userData;
    const errors = {
      phone:
        phone.trim() !== ""
          ? !/^\+54 \(\d{2}\) \d{4}-\d{4}$/.test(userData.phone)
          : false,
      email:
        !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email),
    };

    setErrors(errors);

    return Object.values(errors).some(Boolean);
  }, [userData]);

  const getData = () => {
    return userData;
  };

  useImperativeHandle(ref, () => ({
    handleErrors,
    getData,
  }));

  /**
   * The handleChangeNotFormatter function updates the value of a specific field in the userData state
   * object using the setUserData function.
   */
  const handleChangeNotFormatter = (event, field) => {
    const value = event.target.value;
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <CardContent>
      <Grid container padding={3} spacing={3}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor="occupation">{labels.occupation}</InputLabel>
            <NativeSelect
              value={userData.occupation}
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
            <InputLabel htmlFor="Study">{labels.capacity}</InputLabel>
            <NativeSelect
              value={userData.study}
              onChange={(event) => handleChangeNotFormatter(event, "study")}
              inputProps={{
                name: "Study",
                id: "Study",
              }}
            >
              {study.map((c) => (
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
            label={labels.phone}
            disabled={false}
            error={errors.phone}
            value={userData.phone}
            onChange={(event) => handleChange(event, "phone", doPhone)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="email"
            label={labels.email}
            required
            disabled={null}
            value={userData.email}
            error={errors.email}
            onChange={(event) => handleChange(event, "email", doEmail)}
            variant="standard"
          />
        </Grid>
      </Grid>
    </CardContent>
  );
});
export default ExtraDataCard;
