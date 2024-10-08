import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import CustomTextField from "../../../../Components/CustomTextField/CustomTextField";
import { useLogout, useUser } from "../../../../services/userServices";
import {
  useUpdateUserInformation,
  verifyUserPassword,
} from "../../../../services/authServices";
import styled from "styled-components";
import { media31_25em, media48em } from "../../../../Constants/constants";
import { useGetAccounts } from "../../../../services/accountServices";
import { toast } from "react-toastify";

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
  const canBeDeleted = accounts?.every((account) => account?.balance === 0);
  const onSubmit = async (formDatas) => {
    //! Current password is true or not
    const isCorrectPassword = await verifyUserPassword(
      user.email,
      formDatas.password
    );
    if (!canBeDeleted)
      return toast.error(
        "You cannot close your account because there is a remaining balance. Please clear your balance!"
      );
    // Hesabınızda kalan bakiye bulunduğu için hesabınızı kapatamazsınız. Lütfen hesabınızdaki bakiyeyi sıfırlayın
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
          <CustomTextField
            id="password"
            label="Password"
            type="password"
            textFieldStyles={{ width: "100%" }}
            register={{
              ...register("password", {
                required: "Password is required!",
              }),
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
