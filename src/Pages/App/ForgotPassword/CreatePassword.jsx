import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import { supabase } from "../../../Supabase/supabase";
import AccessDenied from "./AccessDenied";
import styled from "styled-components";
import { media31_25em, media48em } from "../../../Constants/constants";

const StyledCreatePasswordTitle = styled.h4`
  font-weight: bold;
  ${media48em} {
    font-size: 0.8rem;
  }
  ${media31_25em} {
    font-size: 0.7rem;
  }
`;

function CreatePassword() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem(
      "sb-zztdmxtwnkykekxoupjl-auth-token"
    );
    return storedToken || "";
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem(
        "sb-zztdmxtwnkykekxoupjl-auth-token"
      );
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [token]);

  const onSubmit = async (formData) => {
    if (!token)
      return toast.error("You don't have permission to submit this form");
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });
      if (error) throw new Error(error.message);
      else {
        toast.success("Şifreniz başarılı oluştu");
        setToken("");
        localStorage.removeItem("sb-zztdmxtwnkykekxoupjl-auth-token");
        navigate("/signIn");
      }
    } catch (error) {
      // Yeni şifren eski şifrenden farklı olmalı!
      // toast.error("New password should be different from the old password.!");
      toast.error(error.message);
    }
  };
  if (!token) return <AccessDenied />;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: "2rem 4rem ",
          width: "50%",
          m: "1rem",
          backgroundColor: "transparent",
          [media48em]: {
            width: "100%",
            padding: "1rem",
          },
        }}
      >
        <Grid
          container
          gap={3}
          sx={{ justifyContent: "center", textAlign: "center" }}
        >
          <Grid item xs={12} sm={6}>
            <StyledCreatePasswordTitle>
              Create Password
            </StyledCreatePasswordTitle>
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
              id="newPassword"
              texttransform="basic"
              textFieldStyles={{ width: "100%" }}
              label="New Password"
              register={{
                ...register("newPassword", {
                  required: "New password is required!",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d).+$/, //! Contain at least one uppercase letter and one number
                    message:
                      "Password must contain at least one uppercase letter, one number and English characters.",
                  },
                }),
              }}
              helperText={errors?.newPassword?.message}
              error={errors?.newPassword}
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
              id="repeatNewPassword"
              texttransform="basic"
              textFieldStyles={{ width: "100%" }}
              label="Repeat New Password"
              register={{
                ...register("repeatNewPassword", {
                  required: "Repeat password is required!",
                  validate: (value) =>
                    getValues().newPassword === value ||
                    "Passwords do not match",
                }),
              }}
              helperText={errors?.repeatNewPassword?.message}
              error={errors?.repeatNewPassword}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomButton
              buttonText="Update"
              type="submit"
              style={{
                "@media (max-width:48em)": {
                  fontSize: ".6rem",
                },
                "@media (max-width:31.25em)": {
                  fontSize: ".5rem",
                },
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}

export default CreatePassword;
