import { CardContent, Grid, TextField } from "@mui/material";
import React from "react";
import { useAddressDataCardString } from "../../contexts/TextProvider.jsx";

const AddressDataCard = () => {
  const labels = useAddressDataCardString();
  //TOOD: API DE LUGARES EN ARGENTINA
  //https://datosgobar.github.io/georef-ar-api/georef-api-development/
  const handleAddressOnChange = () => {};

  const handleFloorOnChange = () => {};

  return (
    <CardContent>
      <Grid container spacing={3} padding={5}>
        <Grid item xs={12} sm={4}>
          <TextField
            id="address"
            label={labels.street}
            required
            disabled={false}
            error={false}
            onChange={handleAddressOnChange}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="floor"
            label={labels.floor}
            disabled={false}
            error={false}
            onChange={handleFloorOnChange}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="apartment"
            label={labels.apartment}
            disabled={false}
            error={false}
            onChange={null}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="province"
            label={labels.province}
            required
            disabled={false}
            error={false}
            onChange={null}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="city"
            label={labels.city}
            required
            disabled={false}
            error={false}
            onChange={null}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="postalCode"
            label={labels.postalCode}
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
export default AddressDataCard;
