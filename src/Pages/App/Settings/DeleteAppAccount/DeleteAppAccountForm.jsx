import { useForm } from "react-hook-form";
import CustomTextField from "../../../../Components/CustomTextField/CustomTextField";
import { Grid } from "@mui/material";
import CustomButton from "../../../../Components/CustomButton/CustomButton";

function DeleteAppAccountForm() {
  const { register } = useForm();
  return (
    <form>
      <Grid
        container
        gap={3}
        sx={{
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Grid item xs={6}>
          <h4
            style={{
              fontWeight: "bold",
            }}
          >
            Delete Account
          </h4>
        </Grid>
        <Grid item xs={12}>
          <p>
            Deleted users cannot be restored, are you sure you want to delete
            them?
          </p>
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="password"
            // type="text"
            label="Password"
            register={{
              ...register("password"),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomButton buttonText="Delete Account" />
        </Grid>
      </Grid>
    </form>
  );
}

export default DeleteAppAccountForm;
