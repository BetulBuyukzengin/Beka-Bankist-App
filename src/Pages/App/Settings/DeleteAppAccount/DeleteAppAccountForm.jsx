import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import { useLogout, useUser } from "../../../../services/userServices";
import {
  useUpdateUserInformation,
  verifyUserPassword,
} from "../../../../services/authServices";
import styled from "styled-components";
import { media31_25em, media48em } from "../../../../Constants/constants";
import { useGetAccounts } from "../../../../services/accountServices";
import { toast } from "react-toastify";
import { useGetLoan } from "../../../../services/loanServices";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const toastMessage = {
  success: "Account deleted successfully!",
  error: "An error occured during deleting account! ",
};
const StyledDeleteAppAccountTitle = styled.h4`
  font-weight: "bold";
  ${media48em} {
    font-size: 1.2rem;
  }
  ${media31_25em} {
    font-size: 1rem;
  }
`;
const StyledDeleteAppAccountContent = styled.p`
  ${media48em} {
    font-size: 0.9rem;
  }
  ${media31_25em} {
    font-size: 0.8rem;
  }
`;
const StyledTextField = styled(TextField)`
  width: 100%;

  &:hover > div > fieldset {
    border-color: var(--color-gray) !important;
  }
  & > label {
    color: var(--color-text) !important;
    @media (max-width: 48em) {
      font-size: 0.9rem;
    }
    @media (max-width: 31.25em) {
      font-size: 0.8rem;
    }
  }
  & > div {
    color: var(--color-text);
    & > fieldset {
      border-color: var(--color-border-2);
    }
  }
  & div > input {
    &:disabled {
      -webkit-text-fill-color: var(--color-text) !important;
      color: var(--color-text) !important;
    }
    &:disabled + fieldset {
      border-color: var(--color-border-2) !important;
      background-color: var(--color-background-3);
    }
    @media (max-width: 48em) {
      font-size: 1rem;
    }
    @media (max-width: 31.25em) {
      font-size: 0.9rem;
    }
  }
`;

function DeleteAppAccountForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutateAsync: logOut } = useLogout();
  const { user } = useUser();
  const { mutateAsync: updateUser } = useUpdateUserInformation();
  const { accounts, isLoading } = useGetAccounts();
  const { data: loans } = useGetLoan();
  const isBalance = accounts?.every((account) => account?.balance === 0);
  const isAllCreditPaid = loans?.every((loan) => loan?.isCreditPaid);
  const canBeDeleted = isBalance && isAllCreditPaid;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (formDatas) => {
    //! Current password is true or not
    const isCorrectPassword = await verifyUserPassword(
      user.email,
      formDatas.password
    );
    if (!canBeDeleted && !isBalance)
      return toast.error(
        "You cannot close your account because there is a remaining balance. Please clear your balance!"
      );
    // Hesabınızda kalan bakiye bulunduğu için hesabınızı kapatamazsınız. Lütfen hesabınızdaki bakiyeyi sıfırlayın
    if (!canBeDeleted && !isAllCreditPaid)
      return toast.error(
        "You cannot close your account because you have an unpaid loan debt. Please try again after paying your debt!"
      );
    if (canBeDeleted && isCorrectPassword) {
      // if (isCorrectPassword) {
      await updateUser({
        updatedUser: { data: { isAccountDeleted: true } },
        toastMessage,
      });
      await logOut();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        gap={3}
        sx={{
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Grid item xs={6}>
          <StyledDeleteAppAccountTitle>
            Delete Account
          </StyledDeleteAppAccountTitle>
        </Grid>
        <Grid item xs={12}>
          <StyledDeleteAppAccountContent>
            Deleted users cannot be restored, are you sure you want to delete
            them?
          </StyledDeleteAppAccountContent>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            "&>div>p": {
              [media48em]: {
                fontSize: ".8rem",
              },
              [media31_25em]: {
                fontSize: ".7rem",
              },
            },
          }}
        >
          <StyledTextField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required!",
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{
                      "& > .MuiSvgIcon-root": {
                        [media48em]: {
                          width: ".7em",
                          height: ".7em",
                        },
                        [media31_25em]: {
                          width: ".7em",
                          height: ".7em",
                        },
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={errors?.password?.message}
            error={errors?.password}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomButton
            style={{
              [media48em]: {
                fontSize: ".7rem",
              },
              [media31_25em]: {
                fontSize: ".6rem",
              },
            }}
            buttonText="Delete"
            type="submit"
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default DeleteAppAccountForm;
