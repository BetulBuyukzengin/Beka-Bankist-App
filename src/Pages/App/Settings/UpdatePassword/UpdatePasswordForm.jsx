import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import CustomTextField from "../../../../Components/CustomTextField/CustomTextField";
import {
  useUpdateUserInformation,
  verifyUserPassword,
} from "../../../../services/authServices";
import { useUser } from "../../../../services/userServices";

function UpdatePasswordForm({ setOpen }) {
  const { register, handleSubmit } = useForm();
  const { isPending, mutateAsync: updatePassword } = useUpdateUserInformation();
  const { user } = useUser();
  const onSubmit = async (data) => {
    console.log(data);
    // current password is true or not
    await verifyUserPassword(user.email, data.currentPassword);
    // if current password is true then update password
    await updatePassword({ password: data.newPassword });
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            textTransform="basic"
            id="currentPassword"
            // type="text"
            label="Old Password"
            register={{
              ...register("currentPassword"),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="newPassword"
            textTransform="basic"
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
            textTransform="basic"
            // type="text"
            label="Repeat New Password"
            register={{
              ...register("repeatNewPassword"),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomButton
            buttonText="Update Password"
            type={handleSubmit}
            disabled={isPending}
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdatePasswordForm;
