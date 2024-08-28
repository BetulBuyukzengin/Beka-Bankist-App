/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import CustomTextField from "../../../../Components/CustomTextField/CustomTextField";
import {
  useUpdateUserInformation,
  verifyUserPassword,
} from "../../../../services/authServices";
import { useUser } from "../../../../services/userServices";

const toastMessage = {
  error: "Password cannot be changed!",
  success: "Password changed successfully!",
};

function UpdatePasswordForm({ setOpen }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { isPending, mutateAsync: updatePassword } = useUpdateUserInformation();
  const { user } = useUser();
  const onSubmit = async (data) => {
    // console.log(data);
    // current password is true or not
    await verifyUserPassword(user.email, data.currentPassword);
    // if current password is true then update password
    await updatePassword({
      updatedUser: { password: data.newPassword },
      toastMessage,
    });
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
            texttransform="basic"
            id="currentPassword"
            // type="text"
            label="Current Password"
            register={{
              ...register("currentPassword", {
                required: "Current password is required!",
              }),
            }}
            helperText={errors?.currentPassword?.message}
            error={errors?.currentPassword}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="newPassword"
            texttransform="basic"
            // type="text"
            label="New Password"
            register={{
              ...register("newPassword", {
                required: "New password is required!",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/, // En az bir büyük harf ve bir sayı içermesi
                  message:
                    "Password must contain at least one uppercase letter, one number and English characters.",
                },
              }),
            }}
            helperText={errors?.newPassword?.message}
            error={errors?.newPassword}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="repeatNewPassword"
            texttransform="basic"
            // type="text"
            label="Repeat New Password"
            register={{
              ...register("repeatNewPassword", {
                required: "Repeat password is required!",
                validate: (value) =>
                  getValues().newPassword === value || "Passwords do not match",
              }),
            }}
            helperText={errors?.repeatNewPassword?.message}
            error={errors?.repeatNewPassword}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomButton
            buttonText="Update Password"
            type="submit"
            disabled={isPending}
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdatePasswordForm;
