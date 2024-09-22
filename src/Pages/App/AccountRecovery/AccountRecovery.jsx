import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginIcon from "@mui/icons-material/Login";
import { Grid, Paper } from "@mui/material";
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
    font-size: 0.9rem;
  }
  ${media48em} {
    font-size: 0.8rem;
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
    font-size: 0.8rem;
  }
  ${media31_25em} {
    font-size: 0.7rem;
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
            {/* <StyledTextField */}
            <CustomTextField
              disabled={isRecovering}
              texttransform="basic"
              textFieldStyles={{ width: "100%" }}
              label="Email"
              //   variant={isDarkMode ? "filled" : "outlined"}
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
            {/* <StyledTextField
             */}
            <CustomTextField
              disabled={isRecovering}
              textFieldStyles={{ width: "100%" }}
              texttransform="basic"
              type="password"
              label="Password"
              //   variant={isDarkMode ? "filled" : "outlined"}
              register={{
                ...register("password", {
                  required: "This field is required!",
                }),
              }}
              id="password"
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
