import { Grid, Paper } from "@mui/material";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import { useForm } from "react-hook-form";
import { emailRegex } from "../../../Constants/constants";
import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import styled from "styled-components";
import { supabase } from "../../../Supabase/supabase";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

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
`;
function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // console.log(data);
    //????????redirect to çalışmıyor!!!!!!!!!!!!
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
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ArrowBackIcon onClick={() => navigate("/signIn")} />
          </Grid>
          <Grid item xs={12}>
            <StyledSignInFormTitle>Forgot Password</StyledSignInFormTitle>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              // disabled={isLoading}
              label="Email"
              texttransform="basic"
              // variant={isDarkMode ? "filled" : "outlined"}
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
          <Grid item xs={12}>
            <CustomButton buttonText="Send" type="submit" />
          </Grid>
        </Grid>
      </Paper>
    </StyledForm>
  );
}

export default ForgotPassword;
