import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import CustomTextField from "../../../../Components/CustomTextField/CustomTextField";
import { useLogout, useUser } from "../../../../services/userServices";
import {
  useUpdateUserInformation,
  verifyUserPassword,
} from "../../../../services/authServices";

const toastMessage = {
  success: "Account deleted successfully!",
  error: "An error occured during deleting account! ",
};

function DeleteAppAccountForm() {
  const { register, handleSubmit } = useForm();
  const { mutateAsync: logOut } = useLogout();
  const { user } = useUser();
  const { mutateAsync: updateUser } = useUpdateUserInformation();

  const onSubmit = async (formDatas) => {
    //! Current password is true or not
    const isCorrectPassword = await verifyUserPassword(
      user.email,
      formDatas.password
    );
    if (isCorrectPassword) {
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
          <h4
            style={{
              fontWeight: "bold",
            }}
          >
            Delete Account
          </h4>
        </Grid>
        <Grid item xs={12}>
          <p>
            Deleted users cannot be restored, are you sure you want to delete
            them?
          </p>
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="password"
            label="Password"
            register={{
              ...register("password"),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomButton buttonText="Delete" type="submit" />
        </Grid>
      </Grid>
    </form>
  );
}

export default DeleteAppAccountForm;
