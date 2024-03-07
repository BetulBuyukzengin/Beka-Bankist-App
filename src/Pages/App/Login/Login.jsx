import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { useDarkMode } from "../../../Contexts/DarkModeContext";
import { Link } from "react-router-dom";

const StyledForm = styled.form`
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  color: var(--color-text);
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
const StyledLoginFormTitle = styled.h2`
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
const StyledCreateAccountButton = styled.button`
  color: var(--color-text);
  /* background-color: var(--color-secondary); */
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
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const { isDarkMode } = useDarkMode();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  function onSubmit() {
    reset();
    console.log("submitlendi");
  }
  console.log(errors?.message?.message);
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
        <StyledLoginFormTitle>Login</StyledLoginFormTitle>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledTextField
              label="Email"
              variant={isDarkMode ? "filled" : "outlined"}
              {...register("eMail", {
                required: "This field is required!",
                validate: (value) =>
                  emailRegex.test(value) || "Format does not match email",
              })}
              id="eMail"
              helperText={errors?.eMail?.message}
              error={Boolean(errors?.eMail)}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              type="password"
              label="Password"
              variant={isDarkMode ? "filled" : "outlined"}
              {...register("password", {
                required: "This field is required!",
              })}
              id="password"
              helperText={errors?.password?.message}
              error={Boolean(errors?.password)}
            />
          </Grid>
        </Grid>
        <StyledButton> Login </StyledButton>
        <StyledLink to="/createaccount">
          <StyledCreateAccountButton>Create Account</StyledCreateAccountButton>
        </StyledLink>
      </Paper>
    </StyledForm>
  );
}

export default Login;
