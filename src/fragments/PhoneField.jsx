import { FormControl, Stack } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";

export const PhoneField = ({ value, onChange }) => {
  const [areaCode, setareaCode] = useState("");
  const [number, setnumber] = useState();
  const [phone, setPhone] = useState("+54");

  const handleChange = (newPhone) => {
    setPhone(newPhone);
  };
  return (
    <>
      <Stack direction={"row"}>
        <FormControl sx={{ m: 1 }} variant="standard">
          <MuiTelInput
            id="area-code"
            size="small"
            variant="standard"
            defaultCountry={"AR"}
            value={phone}
            onChange={handleChange}
            label={"Numero"}
            helperText={"Sin el 15"}
          />
        </FormControl>
      </Stack>
    </>
  );
};

export default PhoneField;
