/* eslint-disable react/prop-types */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import { media31_25em, media48em } from "../../../../Constants/constants";
import {
  useUpdateUserInformation,
  verifyUserPassword,
} from "../../../../services/authServices";
import { useUser } from "../../../../services/userServices";

const toastMessage = {
  error: "Password cannot be changed!",
  success: "Password changed successfully!",
};
const StyledUpdatePasswordTitle = styled.h4`
  font-weight: "bold";
  width: 100%;
  ${media48em} {
    font-size: 1.2rem;
  }
  ${media31_25em} {
    font-size: 1rem;
  }
`;
const StyledTextField = styled(TextField)`
  width: 100%;
  &:hover > div > fieldset {
    border-color: var(--color-gray) !important;
  }
  & > label {
    color: var(--color-text) !important;
    @media (max-width: 48em) {
      font-size: 0.9rem;
    }
    @media (max-width: 31.25em) {
      font-size: 0.8rem;
    }
  }
  & > div {
    color: var(--color-text);
    & > fieldset {
      border-color: var(--color-border-2);
    }
  }
  & div > input {
    &:disabled {
      -webkit-text-fill-color: var(--color-text) !important;
      color: var(--color-text) !important;
    }
    &:disabled + fieldset {
      border-color: var(--color-border-2) !important;
      background-color: var(--color-background-3);
    }
    @media (max-width: 48em) {
      font-size: 1rem;
    }
    @media (max-width: 31.25em) {
      font-size: 0.9rem;
    }
  }
`;
function UpdatePasswordForm({ setOpenModal }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { isPending, mutateAsync: updatePassword } = useUpdateUserInformation();
  const { user } = useUser();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowOldPassword = () => {
    setShowOldPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (data) => {
    //! Current password is true or not
    const isPasswordValid = await verifyUserPassword(
      user.email,
      data.currentPassword
    );
    if (!isPasswordValid) {
      return;
    }
    if (data.currentPassword === data.newPassword)
      return toast.error(
        "Your new password cannot be the same as your current password."
      );
    //! if current password is true then update password
    await updatePassword({
      updatedUser: { password: data.newPassword },
      toastMessage,
    });
    setOpenModal(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        gap={3}
        sx={{ justifyContent: "center", textAlign: "center" }}
      >
        <Grid item xs={12}>
          <StyledUpdatePasswordTitle>Update Password</StyledUpdatePasswordTitle>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            "&>div>p": {
              [media48em]: {
                fontSize: ".7rem",
              },
              [media31_25em]: {
                fontSize: ".6rem",
              },
            },
          }}
        >
          <StyledTextField
            id="currentPassword"
            label="Current Password"
            type={showOldPassword ? "text" : "password"}
            textFieldStyles={{ width: "100%" }}
            {...register("currentPassword", {
              required: "Current password is required!",
            })}
            helperText={errors?.currentPassword?.message}
            error={errors?.currentPassword}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowOldPassword}
                    edge="end"
                    sx={{
                      "& > .MuiSvgIcon-root": {
                        [media48em]: {
                          width: ".7em",
                          height: ".7em",
                        },
                        [media31_25em]: {
                          width: ".7em",
                          height: ".7em",
                        },
                      },
                    }}
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            "&>div>p": {
              [media48em]: {
                fontSize: ".7rem",
              },
              [media31_25em]: {
                fontSize: ".6rem",
              },
            },
          }}
        >
          <StyledTextField
            id="newPassword"
            texttransform="basic"
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            textFieldStyles={{ width: "100%" }}
            {...register("newPassword", {
              required: "New password is required!",
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d).+$/, //! Contain at least one uppercase letter and one number
                message:
                  "Password must contain at least one uppercase letter, one number and English characters.",
              },
            })}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowNewPassword}
                    edge="end"
                    sx={{
                      "& > .MuiSvgIcon-root": {
                        [media48em]: {
                          width: ".7em",
                          height: ".7em",
                        },
                        [media31_25em]: {
                          width: ".7em",
                          height: ".7em",
                        },
                      },
                    }}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={errors?.newPassword?.message}
            error={errors?.newPassword}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            "&>div>p": {
              [media48em]: {
                fontSize: ".7rem",
              },
              [media31_25em]: {
                fontSize: ".6rem",
              },
            },
          }}
        >
          <StyledTextField
            id="repeatNewPassword"
            texttransform="basic"
            textFieldStyles={{ width: "100%" }}
            type={showRepeatPassword ? "text" : "password"}
            label="Repeat New Password"
            {...register("repeatNewPassword", {
              required: "Repeat password is required!",
              validate: (value) =>
                getValues().newPassword === value || "Passwords do not match",
            })}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowRepeatPassword}
                    edge="end"
                    sx={{
                      "& > .MuiSvgIcon-root": {
                        [media48em]: {
                          width: ".7em",
                          height: ".7em",
                        },
                        [media31_25em]: {
                          width: ".7em",
                          height: ".7em",
                        },
                      },
                    }}
                  >
                    {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
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
                fontSize: ".8rem",
              },
              [media31_25em]: {
                fontSize: ".7rem",
              },
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdatePasswordForm;
