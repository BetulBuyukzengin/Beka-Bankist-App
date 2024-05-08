import { FormControlLabel, Grid, Switch } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";

function WithIbanTab() {
  const { register, watch } = useFormContext();
  const watchSaveAsRegisteredWithIban = watch("saveAsRegisteredWithIban");

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
            register={{ ...register("fullNameWithIban") }}
          />
        </Grid>

        {watchSaveAsRegisteredWithIban && (
          <Grid item xs={6}>
            <CustomTextField
              id="shortName"
              label="Short Name"
              register={{ ...register("shortName") }}
            />
          </Grid>
        )}
        <Grid
          item
          xs={watchSaveAsRegisteredWithIban ? 6 : 12}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <FormControlLabel
            control={<Switch />}
            label="Add as registered recipient"
            {...register("saveAsRegisteredWithIban")}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default WithIbanTab;
