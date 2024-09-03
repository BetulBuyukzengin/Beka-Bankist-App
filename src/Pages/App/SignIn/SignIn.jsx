import LoginIcon from "@mui/icons-material/Login";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useDarkMode } from "../../../Contexts/DarkModeContext";
import { useLogout, useSignIn } from "../../../services/userServices";
import { emailRegex } from "../../../Constants/constants";

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

const StyledLink = styled(Link)`
  align-self: center;
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
// const toastMessage = {
//   error:
//     "Your account is deleted as you requested. If you wish to activate your account again, you can visit account recovery page",
// };
function SignIn() {
  const { isDarkMode } = useDarkMode();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { mutateAsync: signIn, isLoading } = useSignIn();
  const navigate = useNavigate();
  const { mutateAsync: logout } = useLogout();

  async function onSubmit(data) {
    try {
      const signInUser = await signIn(data, {});
      if (signInUser.user.user_metadata.isAccountDeleted) {
        await logout();
        return toast.error(
          "Your account is deleted as you requested. If you wish to activate your account again, you can visit account recovery page"
        );
      }
      toast.success("Sign in successful");
      navigate("/applayout/account");
    } catch (error) {
      throw new Error(error.message);
    }
  }
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
        }}
      >
        <StyledSignInFormTitle>Sign In</StyledSignInFormTitle>
        <Grid container spacing={2}>
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
              })}
              id="password"
              helperText={errors?.password?.message}
              error={Boolean(errors?.password)}
            />
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <StyledButton disabled={isLoading} type="submit">
            Sign in
          </StyledButton>
          <StyledLink to="/signup">
            <StyledButton disabled={isLoading}>Sign Up</StyledButton>
          </StyledLink>
        </div>
        <StyledLink to="/accountRecovery">
          <StyledButton>Account Recovery</StyledButton>
        </StyledLink>
        <StyledLink
          to="/forgotPassword"
          style={{ color: "var(--color-text)", textDecoration: "underline" }}
        >
          Forgot Password
        </StyledLink>
      </Paper>
    </StyledForm>
  );
}

export default SignIn;
