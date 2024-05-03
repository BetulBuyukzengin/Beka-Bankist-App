import { Grid } from "@mui/material";
import { useState } from "react";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import CustomDatePicker from "../../../../../Components/CustomDatePicker/CustomDatePicker";

export default function PersonalInformation() {
  const [value, setValue] = useState(new Date());

  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
        paddingBottom: "1rem",
        paddingRight: "1rem",
      }}
    >
      <Grid item xs={6}>
        <CustomTextField id="fullName" label="Full Name" />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          id="identificationNumber"
          label="Identification number"
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField id="adress" label="Adress" />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField id="phoneNumber" label="Phone number" />
      </Grid>
      <Grid item xs={6}>
        <CustomDatePicker
          width="tall"
          label="Birthday"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </Grid>
    </Grid>
  );
}
