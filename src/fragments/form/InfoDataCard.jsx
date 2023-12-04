import {
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
  Button,
} from "@mui/material";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useInfoDataCardString } from "../../contexts/TextProvider.jsx";
import { datecontrol, doformatCUIL } from "../../utiles.js";

const genders = [
  { label: "Femenino", id: 1 },
  { label: "Masculino", id: 2 },
  { label: "X", id: 3 },
  { label: "Ninguno", id: 4 },
];

const DataContext = createContext();

const InfoDataCard = React.forwardRef((props, ref) => {
  const labels = useInfoDataCardString();

  const [formattedCUIL, setFormattedCUIL] = useState("");
  const [errorCUIL, setCUILError] = useState(false);
  const handleCUIL = (event) => {
    const inputValue = event.target.value;
    let formatted = doformatCUIL(inputValue);
    setCUILError(!inputValue.trim());
    setFormattedCUIL(formatted);
  };

  const [selectedBirthdate, setSelectedBirthdate] = useState(false);
  const [errorBirthdate, setErrorBirthdate] = useState(false);
  const handleBirthdate = (event) => {
    let selectedDate = new Date(event.target.value);
    setSelectedBirthdate(selectedDate);
    let isValid = true;
    isValid = datecontrol(selectedDate);
    setErrorBirthdate(!isValid);
  };

  const [selectedGender, setSelectedGender] = useState("Ninguno");
  const [errorGender, setErrorGender] = useState(false);
  const handleGenderChange = (event) => {
    const newGender = event.target.value;
    setSelectedGender(newGender);
    let error = newGender === "Ninguno";
    setErrorGender(error);
  };

  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setUserName(value);
    setNameError(!value.trim());
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setUserLastName(value);
    setLastNameError(!value.trim());
  };

  const handleErrors = useCallback(() => {
    let hasErrors = false;

    switch (true) {
      case !userName.trim():
        setNameError(true);
        hasErrors = true;
        break;
      case !userLastName.trim():
        setLastNameError(true);
        hasErrors = true;
        break;
      case !formattedCUIL.trim():
        setCUILError(true);
        hasErrors = true;
        break;
      case !datecontrol(selectedBirthdate):
        setErrorBirthdate(true);
        hasErrors = true;
        break;
      case selectedGender === "Ninguno":
        setErrorGender(true);
        hasErrors = true;
        break;
      default:
        // No errors
        break;
    }

    return hasErrors;
  }, [
    userName,
    userLastName,
    formattedCUIL,
    selectedBirthdate,
    selectedGender,
    setNameError,
    setLastNameError,
    setCUILError,
    setErrorBirthdate,
    setErrorGender,
    datecontrol,
  ]);

  return (
    <CardContent ref={ref}>
      <Grid
        container
        padding={3}
        direction={{ xs: "row", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
      >
        <Grid item xs={12} sm={4}>
          <TextField
            id="name"
            label={labels.name}
            required
            disabled={false}
            error={nameError}
            onChange={handleNameChange}
            helperText={null}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="lastname"
            label={labels.lastname}
            required
            disabled={false}
            error={lastNameError}
            helperText={null}
            onChange={handleLastNameChange}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="cuil"
            label={labels.cuil}
            required
            disabled={false}
            error={false}
            helperText={null}
            value={formattedCUIL}
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
            error={errorBirthdate}
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
              value={selectedGender}
              onChange={handleGenderChange}
              error={errorGender}
              inputProps={{
                name: "gender",
                id: "gender-select",
              }}
            >
              {genders.map((g) => (
                <option key={g.id} value={g.label}>
                  {g.label}
                </option>
              ))}
            </NativeSelect>
            <FormHelperText>{/** ERROR label */}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </CardContent>
  );
});

export default InfoDataCard;
