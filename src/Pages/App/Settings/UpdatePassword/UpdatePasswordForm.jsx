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
import { media31_25em, media48em } from "../../../../Constants/constants";
import styled from "styled-components";

const toastMessage = {
  error: "Password cannot be changed!",
  success: "Password changed successfully!",
};
const StyledUpdatePasswordTitle = styled.h4`
  font-weight: "bold";
  ${media48em} {
    font-size: 0.9rem;
  }
  ${media31_25em} {
    font-size: 0.8rem;
  }
`;
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
    //! Current password is true or not
    await verifyUserPassword(user.email, data.currentPassword);
    //! if current password is true then update password
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
          <StyledUpdatePasswordTitle>Update Password</StyledUpdatePasswordTitle>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            texttransform="basic"
            id="currentPassword"
            label="Current Password"
            textFieldStyles={{ width: "100%" }}
            register={{
              ...register("currentPassword", {
                required: "Current password is required!",
              }),
            }}
            helperText={errors?.currentPassword?.message}
            error={errors?.currentPassword}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="newPassword"
            texttransform="basic"
            label="New Password"
            textFieldStyles={{ width: "100%" }}
            register={{
              ...register("newPassword", {
                required: "New password is required!",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/, //! Contain at least one uppercase letter and one number
                  message:
                    "Password must contain at least one uppercase letter, one number and English characters.",
                },
              }),
            }}
            helperText={errors?.newPassword?.message}
            error={errors?.newPassword}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="repeatNewPassword"
            texttransform="basic"
            textFieldStyles={{ width: "100%" }}
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
        <Grid item xs={12} sm={6}>
          <CustomButton
            buttonText="Update"
            type="submit"
            disabled={isPending}
            style={{
              [media48em]: {
                fontSize: ".7rem",
              },
              [media31_25em]: {
                fontSize: ".6rem",
              },
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdatePasswordForm;
