import {
  Alert,
  AlertTitle,
  CardContent,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useCallback, useImperativeHandle, useState } from "react";
import {
  useComponentPasswordAlertString,
  useFormInfoString,
} from "../../contexts/TextProvider.jsx";
import { centeringStyles } from "../../theme.jsx";
import { datecontrol, doformatCUIL, testpassword } from "../../utiles.js";

const genders = [
  { label: "Femenino", id: "F" },
  { label: "Masculino", id: "M" },
  { label: "X", id: "X" },
  { label: "Ninguno", id: "-1" },
];

const FormInfo = React.forwardRef((props, ref) => {
  const forminfolabels = useFormInfoString();
  const passwordalertlabels =
    useComponentPasswordAlertString().info.requirements;

  const [userData, setUserData] = useState({
    name: props.name,
    lastname: props.lastName,
    cuil: props.cuil,
    birthdate: props.birthdate,
    gender: props.gender,
    password: props.password,
    passrep: props.password,
  });

  const getData = () => {
    return userData;
  };

  useImperativeHandle(ref, () => ({
    handleErrors,
    getData,
  }));

  const handleNothing = (value) => value;
  const handleEmptyness = (value) => value === "";

  const [errors, setErrors] = useState({
    name: false,
    lastname: false,
    cuil: false,
    birthdate: false,
    gender: false,
    password: false,
    passrep: false,
  });

  //Objeto que contine todos los metodos para formatear los campos
  const FieldsFormatters = {
    name: (value) => handleNothing(value),
    lastname: (value) => handleNothing(value),
    cuil: (value) => doformatCUIL(value),
    birthdate: (value) => handleDateControl(value),
    gender: (value) => handleNothing(value),
    password: (value) => handleNothing(value),
    passrep: (value) => handleNothing(value),
  };

  const handleDateControl = (value) => !datecontrol(new Date(value));
  const handleNonDefaultGender = (value) => value === -1;
  const handleRepPassword = (value) =>
    props.registerState ? !testpassword(value, userData.password) : false;

  // Objeto que contiene todos los metodos para detectar errores segun el campo
  const FieldsDetectedError = {
    name: (value) => handleEmptyness(value),
    lastname: (value) => handleEmptyness(value),
    cuil: (value) =>
      props.registerState
        ? handleEmptyness(value) || value.length !== 13
        : false,
    birthdate: (value) =>
      props.registerState
        ? handleDateControl(value) || handleEmptyness(value)
        : false,
    gender: (value) => handleNonDefaultGender(value),
    password: (value) => handleEmptyness(value),
    passrep: (value) => handleRepPassword(value),
  };

  const handleChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: FieldsFormatters[field](value),
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: FieldsDetectedError[field](value),
    }));
  };

  const handleErrors = useCallback(async () => {
    let e = (
      props.registerState
        ? [
            "name",
            "lastname",
            "cuil",
            "password",
            "passrep",
            "birthdate",
            "gender",
          ]
        : ["name", "lastname", "cuil"]
    ).reduce((acc, field) => {
      acc[field] = FieldsDetectedError[field](userData[field]);
      return acc;
    }, {});
    setErrors(e);
    return Object.values(e).some(Boolean);
  }, [userData, props]);

  return (
    <CardContent key={"Form-info"}>
      <Grid container padding={3} spacing={{ xs: 1, sm: 2 }}>
        {(props.registerState
          ? ["name", "lastname", "cuil", "password", "passrep"]
          : ["name", "lastname", "cuil"]
        ).map((field) => (
          <Grid item key={field + "grid-item"}>
            <TextField
              required
              size="small"
              variant="standard"
              id={field}
              key={field}
              type={
                ["password", "passrep"].includes(field) ? "password" : "text"
              }
              label={forminfolabels[field]}
              value={userData[field]}
              error={errors[field]}
              onChange={(event) => handleChange(field, event.target.value)}
              InputLabelProps={{
                shrink: userData[field] !== "",
              }}
            />
          </Grid>
        ))}

        <Grid item>
          {props.registerState && (
            <TextField
              id="dates"
              key="dates"
              label={forminfolabels["birthdate"]}
              required
              value={userData["birthdate"]}
              error={errors["birthdate"]}
              helperText={null}
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) =>
                handleChange("birthdate", event.target.value)
              }
              variant="standard"
            />
          )}
        </Grid>

        <Grid item>
          <FormControl>
            <InputLabel
              sx={{ color: errors.gender ? red[600] : "inherit" }}
              variant="standard"
              key="gender-label"
              htmlFor="gender"
            >
              {forminfolabels.gender}
            </InputLabel>
            <NativeSelect
              key="gender"
              value={userData["gender"]}
              onChange={(event) => handleChange("gender", event.target.value)}
              error={errors["gender"]}
              size="small"
              inputProps={{
                name: "gender",
                id: "gender-select",
              }}
            >
              {genders.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>

        <Grid item>
          <Collapse in={errors.password} sx={centeringStyles}>
            <Alert
              severity="error"
              style={{ textAlign: "left", marginTop: "16px" }}
            >
              <AlertTitle>{passwordalertlabels.title}</AlertTitle>
              <ul>
                {passwordalertlabels.body.map((label) => (
                  <li key={label}>{label}</li>
                ))}
              </ul>
            </Alert>
          </Collapse>
        </Grid>
      </Grid>
    </CardContent>
  );
});

export default FormInfo;
