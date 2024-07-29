import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { useDarkMode } from "../../../Contexts/DarkModeContext";
import { Link } from "react-router-dom";
import { useSignUp } from "../../../services/userServices";
import LogoutIcon from "@mui/icons-material/Logout";

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
`;
const StyledLink = styled(Link)`
  align-self: center;
`;
const StyledSignUpButton = styled.button`
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SignUp() {
  const { isDarkMode } = useDarkMode();
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors } = formState;
  const { isLoading, mutate: signUp } = useSignUp();

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
        }}
      >
        <StyledSignInFormTitle>Sign Up</StyledSignInFormTitle>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledTextField
              disabled={isLoading}
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

          <Grid item xs={12}>
            <StyledTextField
              disabled={isLoading}
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

          <Grid item xs={12}>
            <StyledTextField
              disabled={isLoading}
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
          <Grid item xs={12}>
            <StyledTextField
              disabled={isLoading}
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
        <StyledSignUpButton type="submit" disabled={isLoading}>
          Sign Up
        </StyledSignUpButton>
        <StyledLink to="/signIn">
          <StyledButton disabled={isLoading}> Sign In </StyledButton>
        </StyledLink>
      </Paper>
    </StyledForm>
  );
}

export default SignUp;
