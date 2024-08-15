/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomButton from "../../../../../Components/CustomButton/CustomButton";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useUpdateUser, useUser } from "../../../../../services/userServices";
import { supabase } from "../../../../../Supabase/supabase";
import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../../../../../Contexts/CurrentUserContext";

function UpdateEmailWithEmail({ setOpen }) {
  const { register, handleSubmit } = useForm();
  // Get the authenticated user and the user from the users table whose id is the same
  const { currentUser } = useCurrentUserContext();

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
      // Update email in authenticated
      await supabase.auth.updateUser(
        {
          email: data.newEmailAddress,
          // data: { email_verified: false },
        }
        // { emailRedirectTo: data.newEmailAddress }
      );

      toast.success("Please check your email!");

      //! Burada mail onaylanmadan direkt güncelleniyor...
      await updateUser({
        id: currentUser.id,
        user: { ...currentUser, email: data.newEmailAddress },
      });

      setOpen(false);
    } catch (error) {
      console.log(error.message);
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
            textTransform="basic"
            id="yourEmail"
            // type="text"
            label="Your Email Address"
            defaultValue={user.email}
            disabled
            register={{
              ...register("yourEmailAddress"),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            textTransform="basic"
            id="newEmail"
            type="text"
            label="New Email Address"
            register={{
              ...register("newEmailAddress"),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            textTransform="basic"
            id="password"
            // type="text"
            label="Password"
            register={{
              ...register("password"),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomButton
            type={handleSubmit}
            buttonText="Send verification email"
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdateEmailWithEmail;
