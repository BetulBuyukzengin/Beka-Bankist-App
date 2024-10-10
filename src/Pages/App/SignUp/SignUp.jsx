import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  emailRegex,
  media31_25em,
  media48em,
} from "../../../Constants/constants";
import { useDarkMode } from "../../../Contexts/DarkModeContext";
import { useSignUp } from "../../../services/userServices";

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
const StyledSignInFormTitle = styled.h2`
  margin-bottom: 1rem;
  letter-spacing: 0.1rem;
  color: var(--color-text);
  ${media48em} {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 2rem;
  }
  ${media31_25em} {
    font-size: 1.3rem;
  }
`;

const StyledLink = styled(Link)`
  align-self: center;
  /* ${media48em} {
    font-size: 0.8rem;
  }
  ${media31_25em} {
    font-size: 0.7rem;
  } */
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

function SignUp() {
  const { isDarkMode } = useDarkMode();
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors } = formState;
  const { isLoading, mutate: signUp } = useSignUp();
  const navigate = useNavigate();

  function onSubmit(data) {
    signUp(data);
    reset();
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledNavbar>
        <StyledLinkTo to="/">
          <LogoutIcon />
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
          width: "50%",
          [media48em]: {
            height: "85dvh",
            width: "95%",
            padding: "1rem",
          },
        }}
      >
        <StyledSignInFormTitle>Sign Up</StyledSignInFormTitle>
        <Grid
          container
          // spacing={2}
          sx={{
            gap: "1rem",
            [media48em]: {
              gap: ".4rem",
            },
          }}
        >
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
            <StyledTextField
              disabled={isLoading}
              textFieldStyles={{ width: "100%" }}
              label="Full Name"
              variant={isDarkMode ? "filled" : "outlined"}
              {...register("fullName", {
                required: "This field is required!",
              })}
              id="fullName"
              helperText={errors?.fullName?.message}
              error={Boolean(errors?.fullName)}
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
              disabled={isLoading}
              texttransform="basic"
              textFieldStyles={{ width: "100%" }}
              label="Email"
              variant={isDarkMode ? "filled" : "outlined"}
              {...register("email", {
                required: "This field is required!",
                validate: (value) =>
                  emailRegex.test(value) || "Format does not match email",
              })}
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
              disabled={isLoading}
              texttransform="basic"
              textFieldStyles={{ width: "100%" }}
              type="password"
              label="Password"
              variant={isDarkMode ? "filled" : "outlined"}
              {...register("password", {
                required: "This field is required!",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/, // En az bir büyük harf ve bir sayı içermesi
                  message:
                    "Password must contain at least one uppercase letter, one number and English characters.",
                },
              })}
              id="password"
              helperText={errors?.password?.message}
              error={Boolean(errors?.password)}
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
              disabled={isLoading}
              textFieldStyles={{ width: "100%" }}
              type="password"
              label="Repeat password"
              variant={isDarkMode ? "filled" : "outlined"}
              {...register("repeatPassword", {
                required: "This field is required!",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/, // En az bir büyük harf ve bir sayı içermesi
                  message:
                    "Password must contain at least one uppercase letter, one number and English characters.",
                },
                validate: (value) =>
                  getValues().password === value || "Passwords do not match",
              })}
              id="repeatPassword"
              helperText={errors?.repeatPassword?.message}
              error={Boolean(errors?.repeatPassword)}
            />
          </Grid>
        </Grid>
        <StyledButton type="submit" disabled={isLoading}>
          Sign Up
        </StyledButton>
      </Paper>
    </StyledForm>
  );
}

export default SignUp;
