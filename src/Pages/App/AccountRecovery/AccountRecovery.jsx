import LoginIcon from "@mui/icons-material/Login";
import { Grid, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUpdateUserInformation } from "../../../services/authServices";
import { useSignIn, useUser } from "../../../services/userServices";
import { supabase } from "../../../Supabase/supabase";
import { toast } from "react-toastify";

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
const StyledLink = styled(Link)`
  align-self: center;
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

  const onSubmit = async (formData) => {
    // const usersignIn = await signIn(formData, { error: "hata" });
    //toast message gonder

    const usersignIn = await signIn(formData);
    if (usersignIn.user.user_metadata.isAccountDeleted) {
      await updateUser({
        updatedUser: { data: { isAccountDeleted: false } },
        toastMessage,
      });
    }
    usersignIn();
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
        }}
      >
        <StyledSignInFormTitle>Account Recovery</StyledSignInFormTitle>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledTextField
              disabled={isRecovering}
              label="Email"
              //   variant={isDarkMode ? "filled" : "outlined"}
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
              disabled={isRecovering}
              type="password"
              label="Password"
              //   variant={isDarkMode ? "filled" : "outlined"}
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
          <StyledLink to="/signIn">
            <StyledButton disabled={isRecovering}>Sign In</StyledButton>
          </StyledLink>
          <StyledLink to="/signUp">
            <StyledButton disabled={isRecovering}>Sign Up</StyledButton>
          </StyledLink>
        </div>
        <StyledButton type="submit">Account Recovery</StyledButton>
      </Paper>
    </StyledForm>
  );
}
export default AccountRecovery;