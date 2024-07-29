/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
// import { useState } from "react";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { MuiTelInput } from "mui-tel-input";
import { useUser } from "../../../../../services/userServices";
import { useSearchParams } from "react-router-dom";
import { formatDate } from "../../../../../utils/utils";

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
// const DatePickerWrapper = styled.div`
//   width: 100%;
//   .MuiOutlinedInput-root {
//     width: 100%;
//     & fieldset {
//       border-color: ${({ error }) =>
//         error ? "red !important" : "var(--color-border-2) !important"};
//     }
//     &:hover fieldset {
//       border-color: ${({ error }) =>
//         error ? "red !important" : "var(--color-gray) !important"};
//     }
//   }
//   .MuiInputLabel-root {
//     color: var(--color-text);
//   }
//   .MuiInputBase-input {
//     color: var(--color-text);
//   }
// `;
//????????  birthDate değerini varsayılan olarak ver ve date picker ı disabled yap

export default function PersonalInformation({ phoneNumber, setPhoneNumber }) {
  const [searchParams] = useSearchParams();
  const selectedAccount = JSON.parse(searchParams.get("selectedAccount"));
  // const birthDate = formatDate(selectedAccount?.birthday).split(" ").at(0);
  // const [date, setDate] = useState();
  const { register, formState } = useFormContext();
  const { errors } = formState;
  const { user } = useUser();
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
          value={user.user_metadata.fullName}
          // defaultValue={user.user_metadata.fullName}
          disabled={user.user_metadata.fullName ? true : false}
          label="Full Name"
          register={{
            ...register("applicantFullName"),
          }}
          helperText={errors?.applicantFullName?.message}
          error={errors?.applicantFullName}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          id="identificationNumber"
          label="Identification number"
          value={selectedAccount?.identificationNumber}
          // defaultValue={selectedAccount?.identificationNumber}
          disabled={selectedAccount?.identificationNumber ? true : false}
          register={{
            ...register("applicantIdentificationNumber", {}),
          }}
          helperText={errors?.applicantIdentificationNumber?.message}
          error={errors?.applicantIdentificationNumber}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          id="adress"
          label="Adress"
          defaultValue={selectedAccount?.address}
          register={{
            ...register("applicantAdress", {}),
          }}
          helperText={errors?.applicantAdress?.message}
          error={errors?.applicantAdress}
        />
      </Grid>
      <Grid item xs={6}>
        <StyledMuiTelInput
          label="Phone number"
          preferredCountries={["TR", "US", "KR"]}
          defaultCountry="TR"
          value={phoneNumber || selectedAccount?.phoneNumber}
          defaultValue={selectedAccount?.phoneNumber}
          // disabled={selectedAccount?.phoneNumber}
          {...register("applicantPhoneNumber")}
          onChange={(phone) => handleChangePhone(phone)}
          helperText={errors?.applicantPhoneNumber?.message}
          error={errors?.applicantPhoneNumber}
        />
      </Grid>
      {/* <Grid item xs={6}>
        <DatePickerWrapper error={errors?.applicantBirthday}>
          <DatePicker
            label="Birthday"
            value={formatDate(selectedAccount?.birthday) || date}
            // value={selectedAccount?.birthday}
            defaultValue={selectedAccount?.birthday}
            onChange={(newDate) => {
              setDate(newDate);
              setValue("applicantBirthday", newDate);
            }}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors?.applicantBirthday
                    ? "red !important"
                    : "var(--color-border-2) !important",
                },
                "&:hover fieldset": {
                  borderColor: errors?.applicantBirthday
                    ? "red !important"
                    : "var(--color-gray) !important",
                },
              },
              "& .MuiInputLabel-root": {
                color: "var(--color-text)",
              },
              "& .MuiInputBase-input": {
                color: "var(--color-text)",
              },
            }}
          />
          {errors?.applicantBirthday && (
            <FormHelperText error>
              {errors?.applicantBirthday?.message || "This field is required"}
            </FormHelperText>
          )}
        </DatePickerWrapper>
      </Grid> */}
      <Grid item xs={6}>
        <CustomTextField
          id="birthday"
          label="Birthday"
          value={formatDate(selectedAccount?.birthday)}
          disabled={selectedAccount?.birthday ? true : false}
          // register={{
          //   ...register("applicantBirthday"),
          // }}
          helperText={errors?.applicantBirthday?.message}
          error={errors?.applicantBirthday}
        />
      </Grid>
    </Grid>
  );
}
