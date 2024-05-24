import { Grid } from "@mui/material";
import { useState } from "react";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import styled from "styled-components";
import { MuiTelInput } from "mui-tel-input";

const StyledMuiTelInput = styled(MuiTelInput)`
  width: 100%;
  & > div {
    color: var(--color-text);
  }
  & > div > fieldset {
    border-color: var(--color-border-2) !important;
  }
  &:hover > div > fieldset {
    border-color: var(--color-gray) !important;
  }
`;
export default function PersonalInformation() {
  const [date, setDate] = useState("");
  const { register, setValue, formState } = useFormContext();
  const { errors } = formState;
  const [phoneNumber, setPhoneNumber] = useState();

  function handleChangePhone(phone) {
    setPhoneNumber(phone);
  }
  return (
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
          id="fullName"
          label="Full Name"
          register={{
            ...register("applicantFullName", {
              required: "This field is required!",
            }),
          }}
          helperText={errors?.applicantFullName?.message}
          error={errors?.applicantFullName}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          id="identificationNumber"
          label="Identification number"
          register={{
            ...register("applicantIdentificationNumber", {
              required: "This field is required!",
            }),
          }}
          helperText={errors?.applicantIdentificationNumber?.message}
          error={errors?.applicantIdentificationNumber}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          id="adress"
          label="Adress"
          register={{
            ...register("applicantAdress", {
              required: "This field is requied!",
            }),
          }}
          helperText={errors?.applicantAdress?.message}
          error={errors?.applicantAdress}
        />
      </Grid>
      <Grid item xs={6}>
        {/* <CustomTextField
          id="phoneNumber"
          label="Phone number"
          register={{ ...register("applicantPhoneNumber") }}
        /> */}
        <StyledMuiTelInput
          preferredCountries={["TR", "US", "KR"]}
          defaultCountry="TR"
          value={phoneNumber}
          {...register("applicantPhoneNumber", {
            required: "This field is required!",
          })}
          onChange={(phone) => handleChangePhone(phone)}
          //! required ekle
        />
      </Grid>
      <Grid item xs={6}>
        <DatePicker
          label="Birthday"
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            setValue("applicantBirthday", newDate);
          }}
          // slotProps={{
          //   popper: { placement: "right-start" },
          //   textField: {
          //     required: "This field is required!",
          //   },
          // }}
          sx={{
            marginTop: "1rem",
            width: "100%",
            "&:hover > div > fieldset": {
              borderColor: "var(--color-text)!important",
            },
            "&>label": {
              color: "var(--color-text)",
            },
            "& > div": {
              color: "var(--color-text)",

              "& > fieldset": {
                // borderColor: isError
                // ? "red !important"
                borderColor: "var(--color-border-2) !important",
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
