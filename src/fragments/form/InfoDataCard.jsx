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
import React, {
  createContext,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useInfoDataCardString } from "../../contexts/TextProvider.jsx";
import { datecontrol, doformatCUIL } from "../../utiles.js";

const genders = [
  { label: "Femenino", id: 1 },
  { label: "Masculino", id: 2 },
  { label: "X", id: 3 },
  { label: "Ninguno", id: 4 },
];

const InfoDataCard = React.forwardRef((props, ref) => {
  const labels = useInfoDataCardString();

  const [userData, setUserData] = useState({
    name: props.name,
    lastName: props.lastName,
    formattedCUIL: props.cuil,
    selectedBirthdate: props.birthdate,
    selectedGender: props.gender,
  });

  const [errors, setErrors] = useState({
    name: false,
    lastName: false,
    formattedCUIL: false,
    selectedBirthdate: false,
    selectedGender: false,
  });

  const handleInputChange = (field, value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: !value.trim() }));
  };

  const handleCUIL = (event) => {
    const inputValue = event.target.value;
    const formatted = doformatCUIL(inputValue);
    setUserData((prevData) => ({ ...prevData, formattedCUIL: formatted }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      formattedCUIL: !inputValue.trim(),
    }));
  };

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

  const handleGenderChange = (event) => {
    const newGender = event.target.value;
    setUserData((prevData) => ({ ...prevData, selectedGender: newGender }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      selectedGender: newGender === "Ninguno",
    }));
  };

  const handleErrors = useCallback(() => {
    const { name, lastName, formattedCUIL, selectedBirthdate, selectedGender } =
      userData;

    const errors = {
      name: !name.trim(),
      lastName: !lastName.trim(),
      formattedCUIL: !formattedCUIL.trim() || formattedCUIL.length !== 13,
      selectedBirthdate:
        !datecontrol(new Date(selectedBirthdate)) || !selectedBirthdate.trim(),
      selectedGender: selectedGender === "Ninguno",
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
    <CardContent>
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
            value={userData.name}
            error={errors.name}
            onChange={(event) => handleInputChange("name", event.target.value)}
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
                <option key={g.id} value={g.label}>
                  {g.label}
                </option>
              ))}
            </NativeSelect>
            <FormHelperText>{/* ERROR label */}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </CardContent>
  );
});

export default InfoDataCard;
