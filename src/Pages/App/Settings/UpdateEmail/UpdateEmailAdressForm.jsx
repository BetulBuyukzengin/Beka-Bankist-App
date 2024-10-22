/* eslint-disable react/prop-types */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import CustomTextField from "../../../../Components/CustomTextField/CustomTextField";
import {
  emailRegex,
  media31_25em,
  media48em,
} from "../../../../Constants/constants";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import { verifyUserPassword } from "../../../../services/authServices";
import { useUpdateUser, useUser } from "../../../../services/userServices";
import { supabase } from "../../../../Supabase/supabase";

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
const StyledUpdateEmailTitle = styled.h4`
  font-weight: bold;
  margin-top: 1rem;
  ${media48em} {
    font-size: 1.2rem;
  }
  ${media31_25em} {
    font-size: 1rem;
  }
`;
const StyledUpdateEmailContent = styled.p`
  ${media48em} {
    font-size: 0.9rem;
  }
  ${media31_25em} {
    font-size: 0.8rem;
  }
`;
function UpdateEmailAdressForm({ setOpenModal }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowOldPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //! Get the authenticated user and the user from the users table whose id is the same
  const { currentUser } = useCurrentUser();

  const { user } = useUser();
  const { mutateAsync: updateUser } = useUpdateUser();

  //? Doesn't working cuz of dates are not updated correctly
  // const sentAt = new Date(user.email_change_sent_at);
  // const updatedAt = new Date(user.updated_at);
  // const isSentAtBeforeUpdatedAt = isBefore(sentAt, updatedAt);

  // useEffect(() => {
  //   async function updateUsersTableUser() {
  //     await updateUser({
  //       id: currentUser.id,
  //       user: { ...currentUser, email: user.email },
  //     });

  // await supabase.auth.updateUser({
  //   data: { email_verified: true },
  // });
  //? user.user_metadata.email_verified not updating by supabase
  //   }
  // if (user.user_metadata.email_verified && user.new_email) {
  //     console.log("Email confirmed. Proceeding with the operation...");
  //     updateUsersTableUser();
  //   }
  //   // }
  // }, [user.user_metadata.email_verified, user.new_email, currentUser]);

  const onSubmit = async (data) => {
    try {
      //! Current password is true or not
      const isCorrectPassword = await verifyUserPassword(
        user.email,
        data.password
      );
      if (isCorrectPassword) {
        //! Update email in authenticated
        await supabase.auth.updateUser({
          email: data.newEmailAddress,
        });

        toast.success("Please check your email!");
        //? Burada mail onaylanmadan users tablosundaki mail direkt güncelleniyor ama authentication daki değişmiyor sadece onaylandığında değişiyor...
        await updateUser({
          id: currentUser.id,
          user: { ...currentUser, email: data.newEmailAddress },
        });
        setOpenModal(false);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        gap={2}
        sx={{ textAlign: "center", justifyContent: "center" }}
      >
        <Grid item xs={6}>
          <StyledUpdateEmailTitle>Update Email</StyledUpdateEmailTitle>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: ".5rem" }}>
          <StyledUpdateEmailContent>
            We will send a confirmation mail to your new email account for the
            email update.
          </StyledUpdateEmailContent>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="yourEmail"
            textFieldStyles={{ width: "100%" }}
            label="Your Email Address"
            defaultValue={user.email}
            disabled
            texttransform="basic"
            register={{
              ...register("yourEmailAddress"),
            }}
            helperText={errors?.yourEmailAddress?.message}
            error={errors?.yourEmailAddress}
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
          <CustomTextField
            texttransform="basic"
            id="newEmail"
            textFieldStyles={{ width: "100%" }}
            type="text"
            label="New Email Address"
            register={{
              ...register("newEmailAddress", {
                required: "New email address is required!",
                validate: (value) =>
                  emailRegex.test(value) || "Format does not match email",
              }),
            }}
            helperText={errors?.newEmailAddress?.message}
            error={errors?.newEmailAddress}
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
            texttransform="basic"
            id="password"
            type={showPassword ? "text" : "password"}
            textFieldStyles={{ width: "100%" }}
            label="Password"
            register={{
              ...register("password", {
                required: "Password is required!",
              }),
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
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={errors?.password?.message}
            error={errors?.password}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomButton
            style={{
              [media48em]: {
                fontSize: ".8rem",
              },
              [media31_25em]: {
                fontSize: ".7rem",
              },
            }}
            type="submit"
            buttonText="Send verification email"
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdateEmailAdressForm;
