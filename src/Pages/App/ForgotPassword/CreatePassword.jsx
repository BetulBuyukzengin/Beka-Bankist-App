import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import { supabase } from "../../../Supabase/supabase";
import AccessDenied from "./AccessDenied";

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

  const onSubmit = async () => {
    if (!token)
      return toast.error("You don't have permission to submit this form");
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: data.newPassword,
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
        }}
      >
        <Grid
          container
          gap={3}
          sx={{ justifyContent: "center", textAlign: "center" }}
        >
          <Grid item xs={6}>
            <h4
              style={{
                fontWeight: "bold",
              }}
            >
              Create Password
            </h4>
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              id="newPassword"
              texttransform="basic"
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
          <Grid item xs={6}>
            <CustomTextField
              id="repeatNewPassword"
              texttransform="basic"
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
              // disabled={isPending}
            />
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}

export default CreatePassword;
