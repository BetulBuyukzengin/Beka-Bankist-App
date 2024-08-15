import { Grid, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import CustomTextField from "../../../../Components/CustomTextField/CustomTextField";
// import { formatDate } from "../../../../utils/utils";
import { useCurrentUserContext } from "../../../../Contexts/CurrentUserContext";
import { useUpdateUser } from "../../../../services/userServices";
import { supabase } from "../../../../Supabase/supabase";

const StyledMuiTelInput = styled(MuiTelInput)`
  width: 100%;
  & > label {
    color: var(--color-text) !important;
  }

  & > div {
    color: var(--color-text);
  }

  & > div > fieldset {
    border-color: var(--color-border-2) !important;
  }
  &:hover > div > fieldset {
    border-color: var(--color-gray) !important;
  }
  //! conditional style
  ${({ error }) =>
    error &&
    `
  & > div > fieldset {
    border-color: red !important;
  }
`}
`;
function UpdatePersonalInformationForm({ setOpen }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  // const { user } = useUser();
  // const { data: users, isLoading } = useGetUsers();
  const { register, handleSubmit } = useForm();
  const { isLoading: isUpdating, mutateAsync: updateUser } = useUpdateUser();

  // const currentUser = users.find((u) => u.id === user.id);
  function handleChangePhone(phone) {
    setPhoneNumber(phone);
  }
  const { currentUser } = useCurrentUserContext();

  const { id } = currentUser;

  // yup ekle
  const onSubmit = async (data) => {
    // const user = { ...data };
    // users tablosundaki user id ile user metadatadakı user id ile aynı olan userin
    //  tc,phone number,birthday,adress i al
    // 2 yerde de teli update le
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();
    // const authUserMail = user?.email;
    // await supabase.auth.updateUser({
    //   email: "kadirht@hotmail.com",
    // });
    await updateUser({ id, user: data });
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          backgroundColor: "var(--color-background)",
          border: "1px solid var(--color-gray)",
          color: "var(--color-text)",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            paddingBottom: "1rem",
            paddingRight: "1rem",
          }}
        >
          <Grid item xs={6}>
            <CustomTextField
              id="identificationNumber"
              label="Identification number"
              // value
              register={{
                ...register("identificationNumber"),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              id="adress"
              label="Adress"
              register={{
                ...register("applicantAdress"),
              }}
              // helperText={errors?.applicantAdress?.message}
              // error={errors?.applicantAdress}
            />
          </Grid>
          <Grid item xs={6}>
            <StyledMuiTelInput
              label="Phone number"
              preferredCountries={["TR", "US", "KR"]}
              defaultCountry="TR"
              value={phoneNumber}
              // defaultValue={selectedAccount?.phoneNumber}
              {...register("applicantPhoneNumber")}
              onChange={(phone) => handleChangePhone(phone)}
              // helperText={errors?.applicantPhoneNumber?.message}
              // error={errors?.applicantPhoneNumber}
            />
          </Grid>

          <Grid item xs={6}>
            <DatePicker
              width="tall"
              label="Birthday"
              value={birthday}
              // {...register("birthday")}
              slotProps={{
                popper: { placement: "right-start" },
              }}
              // helperText={errors?.birthday?.message}
              // error={errors}
              onChange={(date) => setBirthday(date)}
              // sx={{
              //   width: "100%",
              //   "&:hover > div > fieldset": {
              //     borderColor: "var(--color-text)!important",
              //   },
              //   "&>label": {
              //     color: "var(--color-text)",
              //   },
              //   "& > div": {
              //     color: "var(--color-text)",

              //     "& > fieldset": {
              //       borderColor: isError
              //         ? "red !important"
              //         : "var(--color-border-2) !important",
              //     },
              //   },
              // }}
            />
            {/* {errors?.birthday && (
              <FormHelperText error sx={{ marginLeft: ".8rem" }}>
                {errors?.birthday?.message}
              </FormHelperText>
            )} */}
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <CustomButton type={handleSubmit} buttonText="Update User" />
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}

export default UpdatePersonalInformationForm;
