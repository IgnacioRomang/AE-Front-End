import {
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
  Button,
  Collapse,
  Alert,
  AlertTitle,
} from "@mui/material";
import React, {
  createContext,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  useInfoDataCardString,
  useResetPasswordCardString,
} from "../../contexts/TextProvider.jsx";
import { datecontrol, doformatCUIL, testpassword } from "../../utiles.js";
import { centeringStyles } from "../../theme.jsx";

const genders = [
  { label: "Femenino", id: 1 },
  { label: "Masculino", id: 2 },
  { label: "X", id: 3 },
  { label: "Ninguno", id: 4 },
];

const InfoDataCard = React.forwardRef((props, ref) => {
  const labels = useInfoDataCardString();

  const labelAlert = useResetPasswordCardString().alert;

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
      selectedGender: newGender === 4,
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
      formattedCUIL: !formattedCUIL.trim() || formattedCUIL.length !== 13,
      selectedBirthdate:
        !datecontrol(new Date(selectedBirthdate)) || !selectedBirthdate.trim(),
      selectedGender: selectedGender === 4,
      password: !testpassword(passrep, password),
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
              label={labels.name}
              required
              disabled={false}
              value={userData.name}
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
              label={labels.lastname}
              required
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

          <Grid item xs={12} sm={4}>
            <TextField
              id="cuil"
              label={labels.cuil}
              required
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
          <Grid item xs={12} sm={4}>
            <TextField
              id="dates"
              label={labels.birthdate}
              required
              disabled={false}
              value={userData.selectedBirthdate}
              error={errors.selectedBirthdate}
              helperText={null}
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleBirthdate}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl>
              <InputLabel variant="standard" htmlFor="gender">
                {labels.gender}
              </InputLabel>
              <NativeSelect
                value={userData.selectedGender}
                onChange={handleGenderChange}
                error={errors.selectedGender}
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
                    label={labels.password}
                    required
                    type="password"
                    error={errors.password}
                    value={userData.password}
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
                    label={"Repita la " + labels.password}
                    required
                    error={errors.password}
                    value={passrep}
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
                      <AlertTitle>{labelAlert.title}</AlertTitle>
                      <ul>
                        <li>{labelAlert.body[0]}</li>
                        <li>{labelAlert.body[1]}</li>
                        <li>{labelAlert.body[2]}</li>
                        <li>{labelAlert.body[3]}</li>
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

export default InfoDataCard;
