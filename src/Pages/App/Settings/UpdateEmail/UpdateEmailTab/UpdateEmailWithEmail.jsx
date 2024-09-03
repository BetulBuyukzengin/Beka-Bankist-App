/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomButton from "../../../../../Components/CustomButton/CustomButton";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { emailRegex } from "../../../../../Constants/constants";
import { useCurrentUser } from "../../../../../Hooks/useCurrentUser";
import { verifyUserPassword } from "../../../../../services/authServices";
import { useUpdateUser, useUser } from "../../../../../services/userServices";
import { supabase } from "../../../../../Supabase/supabase";

function UpdateEmailWithEmail({ setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //! Get the authenticated user and the user from the users table whose id is the same
  const { currentUser } = useCurrentUser();

  const { user } = useUser();
  const { mutateAsync: updateUser } = useUpdateUser();

  //? Doesn't working cuz of dates are not updated correctly
  // const sentAt = new Date(user.email_change_sent_at);
  // const updatedAt = new Date(user.updated_at);
  // const isSentAtBeforeUpdatedAt = isBefore(sentAt, updatedAt);

  // useEffect(() => {
  //   async function updateUsersTableUser() {
  //     await updateUser({
  //       id: currentUser.id,
  //       user: { ...currentUser, email: user.email },
  //     });

  // await supabase.auth.updateUser({
  //   data: { email_verified: true },
  // });
  //? user.user_metadata.email_verified not updating by supabase
  //   }
  // if (user.user_metadata.email_verified && user.new_email) {
  //     console.log("Email confirmed. Proceeding with the operation...");
  //     updateUsersTableUser();
  //   }
  //   // }
  // }, [user.user_metadata.email_verified, user.new_email, currentUser]);

  const onSubmit = async (data) => {
    try {
      //! Current password is true or not
      const isCorrectPassword = await verifyUserPassword(
        user.email,
        data.password
      );
      if (isCorrectPassword) {
        //! Update email in authenticated
        await supabase.auth.updateUser({
          email: data.newEmailAddress,
        });

        toast.success("Please check your email!");
        //? Burada mail onaylanmadan users tablosundaki mail direkt güncelleniyor ama authentication daki değişmiyor sadece onaylandığında değişiyor...
        await updateUser({
          id: currentUser.id,
          user: { ...currentUser, email: data.newEmailAddress },
        });
        setOpen(false);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        gap={2}
        sx={{ textAlign: "center", justifyContent: "center" }}
      >
        <Grid item xs={6}>
          <h4
            style={{
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            Update Email With Email
          </h4>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: ".5rem" }}>
          <p>
            We will send a confirmation mail to your new email account for the
            email update.
          </p>
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            id="yourEmail"
            // type="text"
            label="Your Email Address"
            defaultValue={user.email}
            disabled
            texttransform="basic"
            register={{
              ...register("yourEmailAddress"),
            }}
            helperText={errors?.yourEmailAddress?.message}
            error={errors?.yourEmailAddress}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            texttransform="basic"
            id="newEmail"
            type="text"
            label="New Email Address"
            register={{
              ...register("newEmailAddress", {
                required: "New email address is required!",
                validate: (value) =>
                  emailRegex.test(value) || "Format does not match email",
              }),
            }}
            helperText={errors?.newEmailAddress?.message}
            error={errors?.newEmailAddress}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            texttransform="basic"
            id="password"
            // type="text"
            label="Password"
            register={{
              ...register("password", {
                required: "Password is required!",
              }),
            }}
            helperText={errors?.password?.message}
            error={errors?.password}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomButton type="submit" buttonText="Send verification email" />
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdateEmailWithEmail;
