import { Grid } from "@mui/material";
import UpdateEmail from "./UpdateEmail/UpdateEmail";
import UpdatePassword from "./UpdatePassword/UpdatePassword";
import DeleteAppAccount from "./DeleteAppAccount/DeleteAppAccount";
import PersonalInformationSettings from "./PersonalInformationSettings";
function Settings() {
  return (
    <Grid
      container
      gap={2}
      sx={{ justifyContent: "center", textAlign: "center" }}
    >
      <Grid item xs={6}>
        <PersonalInformationSettings />
      </Grid>
      <Grid item xs={6}>
        <UpdateEmail />
      </Grid>
      <Grid item xs={6}>
        <UpdatePassword />
      </Grid>
      <Grid item xs={6}>
        <DeleteAppAccount />
      </Grid>
    </Grid>
  );
}

export default Settings;
