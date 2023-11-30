import {
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import React from "react";
import { useInfoDataCardString } from "../../contexts/TextProvider.jsx";

const genders = [
  { label: "Femenino", id: 1 },
  { label: "Masculino", id: 2 },
  { label: "X", id: 3 },
  { label: "Ninguno", id: 4 },
];

const InfoDataCard = () => {
  const labels = useInfoDataCardString();
  return (
    <CardContent>
      <Grid
        container
        padding={5}
        direction={{ xs: "row", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
      >
        <Grid item xs={12} sm={4}>
          <TextField
            id="name"
            label={labels.name}
            required
            disabled={false}
            error={false}
            onChange={null}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="lastname"
            label={labels.lastname}
            required
            disabled={false}
            error={false}
            onChange={null}
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
            onChange={null}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="dates"
            label={labels.birthdate}
            required
            disabled={false}
            error={false}
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={null}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl>
            <InputLabel variant="standard" htmlFor="gender">
              {labels.gender}
            </InputLabel>
            <NativeSelect
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
          </FormControl>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default InfoDataCard;
