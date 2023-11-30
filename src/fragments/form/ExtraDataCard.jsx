import {
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import React from "react";
import { useExtraDataCardString } from "../../contexts/TextProvider";

const occupations = [
  { label: "Estudiante", id: 11 },
  { label: "Profesional", id: 12 },
  { label: "Trabajador", id: 13 },
  { label: "Otro", id: 14 },
];
const capacitys = [
  { label: "Primaria", id: 21 },
  { label: "Secundaria", id: 22 },
  { label: "Tercearua", id: 23 },
  { label: "Universitaria", id: 24 },
  { label: "Otra", id: 25 },
  { label: "No contesta", id: 26 },
];

const ExtraDataCard = () => {
  const labels = useExtraDataCardString();
  return (
    <CardContent>
      <Grid container padding={5} spacing={3}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor="occupation">{labels.occupation}</InputLabel>
            <NativeSelect
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
              inputProps={{
                name: "Study",
                id: "Study",
              }}
            >
              {capacitys.map((c) => (
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
            error={false}
            onChange={null}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="email"
            label={labels.email}
            required
            disabled={false}
            error={false}
            onChange={null}
            variant="standard"
          />
        </Grid>
      </Grid>
    </CardContent>
  );
};
export default ExtraDataCard;
