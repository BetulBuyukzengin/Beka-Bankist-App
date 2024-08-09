import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import CustomButton from "../../../../../Components/CustomButton/CustomButton";

function UpdateEmailWithPhoneNumber() {
  const { register } = useForm();
  return (
    <form>
      <Grid
        container
        gap={2}
        sx={{ textAlign: "center", justifyContent: "center" }}
      >
        <Grid item xs={12}>
          <h4
            style={{
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            Update Email With Phone Number
          </h4>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: ".5rem" }}>
          <p>
            Your phone number for email updates. We will send you a confirmation
            link.
          </p>
        </Grid>

        <Grid item xs={6}>
          <CustomTextField
            id="newEmail"
            // type="text"
            label="New Email Address"
            register={{
              ...register("newEmailAddress"),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="phoneNumber"
            // type="text"
            label="Phone Number"
            register={{
              ...register("phoneNumber"),
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
          <CustomButton buttonText="Send verification code" />
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdateEmailWithPhoneNumber;
