import {
  Alert,
  AlertTitle,
  CardContent,
  Collapse,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import React, { useCallback, useImperativeHandle, useState } from "react";
import {
  useCommonsFieldString,
  useComponentPasswordAlertString,
  useFormInfoString,
} from "../../contexts/TextProvider.jsx";
import { centeringStyles } from "../../theme.jsx";
import { datecontrol, doformatCUIL, testpassword } from "../../utiles.js";
import { useService } from "../../contexts/ServiceContext.js";
import { red } from "@mui/material/colors";

const genders = [
  { label: "Femenino", id: "F" },
  { label: "Masculino", id: "M" },
  { label: "X", id: "X" },
  { label: "Ninguno", id: "-1" },
];

const FormInfo = React.forwardRef((props, ref) => {
  const forminfolabels = useFormInfoString();
  const passwordalertlabels =
    useComponentPasswordAlertString().alert.info.requirements;
  const useCommonfieldslables = useCommonsFieldString();

  const [userData, setUserData] = useState({
    name: props.name,
    lastName: props.lastName,
    formattedCUIL: props.cuil,
    selectedBirthdate: props.birthdate,
    selectedGender: props.gender,
    password: props.password,
  });
  const [passrep, setPassRep] = useState(props.password);
  const [errors, setErrors] = useState({
    name: false,
    lastName: false,
    formattedCUIL: false,
    selectedBirthdate: false,
    selectedGender: false,
    password: false,
  });

  /**
   * Updates the state of the component with the new value of the input field.
   * @param {string} field - the name of the field to update
   * @param {string} value - the new value of the field
   */
  const handleInputChange = (field, value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: !value.trim() }));
  };

  /**
   * The handleCUIL function takes an event object, extracts the input value, formats it using the
   * doformatCUIL function, updates the formattedCUIL property in the userData state, and checks for
   * errors by setting the formattedCUIL ersror to true if the input value is empty or consists only of
   * whitespace.
   *
   * @param {Event} event - the event object
   * @returns {void}
   */
  const handleCUIL = (event) => {
    let formatted = doformatCUIL(event.target.value);
    setUserData((prevData) => ({
      ...prevData,
      formattedCUIL: formatted,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      formattedCUIL: !formatted.trim(),
    }));
  };

  /**
   * Updates the selectedBirthdate value in the userData state and checks if the selected date is a valid date.
   * @param {Event} event - the event object
   */
  const handleBirthdate = (event) => {
    const selectedDate = event.target.value;
    setUserData((prevData) => ({
      ...prevData,
      selectedBirthdate: selectedDate,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      selectedBirthdate: !datecontrol(new Date(selectedDate)),
    }));
  };
  /**
   * The function `handleGenderChange` updates the selected gender in the user data and checks if the
   * selected gender is equal to 4, updating the errors accordingly.
   */
  const handleGenderChange = (event) => {
    const newGender = event.target.value;
    setUserData((prevData) => ({ ...prevData, selectedGender: newGender }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      selectedGender: newGender === "-1",
    }));
  };

  const handleErrors = useCallback(() => {
    const {
      name,
      lastName,
      formattedCUIL,
      selectedBirthdate,
      selectedGender,
      password,
    } = userData;

    const errors = {
      name: !name.trim(),
      lastName: !lastName.trim(),
      formattedCUIL: props.registerState
        ? !formattedCUIL.trim() || formattedCUIL.length !== 13
        : false,
      selectedBirthdate: props.registerState
        ? !datecontrol(new Date(selectedBirthdate)) || !selectedBirthdate.trim()
        : false,
      selectedGender: selectedGender === "-1",
      password: props.registerState ? !testpassword(passrep, password) : false,
    };

    setErrors(errors);

    return Object.values(errors).some(Boolean);
  }, [userData, passrep]);

  const getData = () => {
    return userData;
  };

  useImperativeHandle(ref, () => ({
    handleErrors,
    getData,
  }));
  return (
    <>
      <CardContent>
        <Grid
          container
          padding={3}
          style={centeringStyles}
          direction={{ xs: "row", sm: "row" }}
          spacing={{ xs: 1, sm: 2 }}
        >
          <Grid item xs={12} sm={4}>
            <TextField
              id="name"
              label={forminfolabels.name}
              required
              disabled={false}
              value={userData.name}
              size="small"
              error={errors.name}
              onChange={(event) =>
                handleInputChange("name", event.target.value)
              }
              helperText={null}
              InputLabelProps={{
                shrink: Boolean(userData.name !== ""),
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="lastname"
              label={forminfolabels.lastname}
              required
              size="small"
              disabled={false}
              value={userData.lastName}
              error={errors.lastName}
              onChange={(event) =>
                handleInputChange("lastName", event.target.value)
              }
              helperText={null}
              InputLabelProps={{
                shrink: Boolean(userData.lastName !== ""),
              }}
              variant="standard"
            />
          </Grid>
          {props.registerState && (
            <Grid item xs={12} sm={4}>
              <TextField
                id="cuil"
                label={useCommonfieldslables.cuil}
                required
                size="small"
                autoComplete="true"
                disabled={false}
                error={errors.formattedCUIL}
                helperText={null}
                InputLabelProps={{
                  shrink: Boolean(userData.formattedCUIL !== ""),
                }}
                value={userData.formattedCUIL}
                onChange={handleCUIL}
                variant="standard"
              />
            </Grid>
          )}
          {true && (
            <Grid item xs={12} sm={4}>
              <TextField
                id="dates"
                label={forminfolabels.birthdate}
                required
                disabled={false}
                value={userData.selectedBirthdate}
                error={errors.selectedBirthdate}
                helperText={null}
                type="date"
                size="small"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleBirthdate}
                variant="standard"
              />
            </Grid>
          )}

          <Grid item xs={12} sm={4}>
            <FormControl>
              <InputLabel
                sx={{ color: errors.selectedGender ? red[600] : "inherit" }}
                variant="standard"
                htmlFor="gender"
              >
                {useCommonfieldslables.gender}
              </InputLabel>
              <NativeSelect
                value={userData.selectedGender}
                onChange={handleGenderChange}
                error={errors.selectedGender}
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
              <FormHelperText>{/* ERROR label */}</FormHelperText>
            </FormControl>
          </Grid>
          {props.registerState ? (
            <>
              <Grid
                container
                padding={3}
                style={centeringStyles}
                direction={{ xs: "row", sm: "row" }}
                spacing={{ xs: 1, sm: 2 }}
              >
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="password"
                    size="small"
                    label={useCommonfieldslables.password}
                    required
                    type="password"
                    error={errors.password}
                    value={userData.password}
                    //TODO QUITAR AUTO COMPLETE ESTA COMENTADO PARA AGILIZAR EL REGISTRO EN PRUEBAS
                    autoComplete="new-password"
                    onChange={(event) =>
                      handleInputChange("password", event.target.value)
                    }
                    InputLabelProps={{
                      shrink: Boolean(userData.password !== ""),
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="passwordrep"
                    label={"Repita la " + useCommonfieldslables.password}
                    required
                    error={errors.password}
                    size="small"
                    value={passrep}
                    autoComplete="new-password"
                    type="password"
                    onChange={(event) => {
                      setPassRep(event.target.value);
                    }}
                    InputLabelProps={{
                      shrink: Boolean(passrep !== ""),
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} s={4}>
                  <Collapse in={errors.password}>
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
            </>
          ) : (
            <></>
          )}
        </Grid>
      </CardContent>
    </>
  );
});

export default FormInfo;
