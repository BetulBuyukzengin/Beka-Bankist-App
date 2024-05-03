import { FormControlLabel, Grid, Switch } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";

function WithIbanTab() {
  const { register } = useFormContext();
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          paddingBottom: "1rem",
          paddingRight: "1rem",
        }}
      >
        <Grid item xs={6} sx={{ display: "flex", gap: "1rem" }}>
          <CustomTextField
            id="iban"
            label="IBAN"
            defaultValue="TR"
            register={{ ...register("iban") }}
          />
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", gap: "1rem" }}>
          <CustomTextField
            id="fullName"
            label="Full Name"
            register={{ ...register("fullName") }}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
          <FormControlLabel
            control={<Switch />}
            label="Add as registered recipient"
            {...register("saveAsRegistered")}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default WithIbanTab;
