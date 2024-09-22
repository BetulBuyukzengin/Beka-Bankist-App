import { Grid, Paper } from "@mui/material";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import { useForm } from "react-hook-form";
import {
  emailRegex,
  media31_25em,
  media48em,
} from "../../../Constants/constants";
import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import styled from "styled-components";
import { supabase } from "../../../Supabase/supabase";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
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
function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
  
    //???????? redirect to fix?
    await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: "http://localhost:5173/recreatePassword",
    });
  };

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
          [media48em]: {
            padding: "1rem",
          },
        }}
      >
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
          <Grid item xs={12}>
            <StyledSignInFormTitle>Forgot Password</StyledSignInFormTitle>
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
              textFieldStyles={{ width: "100%" }}
              label="Email"
              texttransform="basic"
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
              textAlign: "center",
            }}
          >
            <StyledButton type="submit">Send</StyledButton>
          </Grid>
        </Grid>
      </Paper>
    </StyledForm>
  );
}

export default ForgotPassword;
