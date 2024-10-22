import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginIcon from "@mui/icons-material/Login";
import {
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import {
  emailRegex,
  media31_25em,
  media48em,
} from "../../../Constants/constants";
import { useUpdateUserInformation } from "../../../services/authServices";
import { useSignIn } from "../../../services/userServices";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const StyledTextField = styled(TextField)`
  border: 1px solid var(--color-text);
  width: 100%;
  & > label {
    font-family: "Kanit", sans-serif;
    color: var(--color-text);

    & + div {
      color: var(--color-text);
      font-family: "Kanit", sans-serif;
    }
  }
`;
const StyledForm = styled.form`
  width: 100%;
  height: 100dvh;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  color: var(--color-text);
  background-color: var(--color-background);
  font-size: 1rem;
`;

const StyledSignInFormTitle = styled.h2`
  margin-bottom: 1rem;
  letter-spacing: 0.1rem;
  color: var(--color-text);
  ${media48em} {
    font-size: 1.5rem;
  }
  ${media48em} {
    font-size: 1.3rem;
  }
`;
const StyledButton = styled.button`
  color: var(--color-text);
  background-color: var(--color-secondary);
  padding: 0.6rem 1rem;
  margin-top: 1rem;
  border-radius: 2px;
  border: none;
  align-self: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  ${media48em} {
    padding: 0.5rem;
    font-size: 1rem;
  }
  ${media31_25em} {
    font-size: 0.9rem;
  }
`;

const StyledLinkTo = styled(Link)`
  border: none;
  color: var(--color-text);
  background-color: transparent;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: end;

  &:hover {
    color: var(--color-primary);
    transform: translateY(-2px);
    cursor: pointer;
  }

  &:active {
    transform: translateY(0);
  }
`;
const StyledNavbar = styled.nav`
  width: 100%;
  position: fixed;
  z-index: 111;
  backdrop-filter: blur(5px);
  top: 0;
`;

const toastMessage = {
  success: "Account successfully recovered!",
  error: "An error occurred during account recovery!",
};

function AccountRecovery() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { mutateAsync: signIn } = useSignIn();
  const { mutateAsync: updateUser, isPending: isRecovering } =
    useUpdateUserInformation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (formData) => {
    const usersignIn = await signIn(formData);
    if (usersignIn.user.user_metadata.isAccountDeleted) {
      await updateUser({
        updatedUser: { data: { isAccountDeleted: false } },
        toastMessage,
      });
    }
    navigate("/signIn");

    if (!usersignIn.user.user_metadata.isAccountDeleted)
      toast.info("Account is already active!");
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledNavbar>
        <StyledLinkTo to="/">
          <LoginIcon />
        </StyledLinkTo>
      </StyledNavbar>
      <Paper
        elevation={2}
        sx={{
          p: "2rem 4rem ",
          m: "1rem",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          [media48em]: {
            padding: "1rem",
          },
        }}
      >
        <StyledSignInFormTitle>Account Recovery</StyledSignInFormTitle>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ArrowBackIcon
              onClick={() => navigate("/signIn")}
              sx={{
                cursor: "pointer",
                [media48em]: {
                  fontSize: "0.9rem",
                },
                [media31_25em]: {
                  fontSize: "0.8rem",
                },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
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
              disabled={isRecovering}
              texttransform="basic"
              textFieldStyles={{ width: "100%" }}
              label="Email"
              register={{
                ...register("email", {
                  required: "This field is required!",
                  validate: (value) =>
                    emailRegex.test(value) || "Format does not match email",
                }),
              }}
              id="email"
              helperText={errors?.email?.message}
              error={Boolean(errors?.email)}
            />
          </Grid>

          <Grid
            item
            xs={12}
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
              disabled={isRecovering}
              type={showPassword ? "text" : "password"}
              label="Password"
              {...register("password", {
                required: "This field is required!",
              })}
              id="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
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
              error={Boolean(errors?.password)}
            />
          </Grid>
        </Grid>

        <StyledButton type="submit">Account Recovery</StyledButton>
      </Paper>
    </StyledForm>
  );
}
export default AccountRecovery;
