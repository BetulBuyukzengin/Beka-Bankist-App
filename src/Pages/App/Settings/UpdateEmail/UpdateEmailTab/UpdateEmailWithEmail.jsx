import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import CustomButton from "../../../../../Components/CustomButton/CustomButton";
function UpdateEmailWithEmail() {
  const { register } = useForm();
  return (
    <form>
      <Grid
        container
        gap={2}
        sx={{ textAlign: "center", justifyContent: "center" }}
      >
        <Grid item xs={6}>
          <h4
            style={{
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            Update Email With Email
          </h4>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: ".5rem" }}>
          <p>
            We will send a confirmation mail to your new email account for the
            email update.
          </p>
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="yourEmail"
            // type="text"
            label="Your Email Address"
            register={{
              ...register("yourEmailAddress"),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="newEmail"
            type="text"
            label="New Email Address"
            register={{
              ...register("newEmailAddress"),
            }}
          />
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
          <CustomButton buttonText="Send verification email" />
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdateEmailWithEmail;
