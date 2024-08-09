import { Grid } from "@mui/material";
import CustomTextField from "../../../../Components/CustomTextField/CustomTextField";
import { useForm } from "react-hook-form";
import CustomButton from "../../../../Components/CustomButton/CustomButton";

function UpdatePasswordForm() {
  const { register } = useForm();
  return (
    <form>
      <Grid
        container
        gap={3}
        sx={{ justifyContent: "center", textAlign: "center" }}
      >
        <Grid item xs={6}>
          <h4
            style={{
              fontWeight: "bold",
            }}
          >
            Update Password
          </h4>
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="oldPassword"
            // type="text"
            label="Old Password"
            register={{
              ...register("oldPassword"),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="newPassword"
            // type="text"
            label="New Password"
            register={{
              ...register("newPassword"),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="repeatNewPassword"
            // type="text"
            label="Repeat New Password"
            register={{
              ...register("repeatNewPassword"),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomButton buttonText="Update Password" />
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdatePasswordForm;
