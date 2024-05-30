import { FormHelperText, Grid } from "@mui/material";
import { useState } from "react";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import styled from "styled-components";
import { MuiTelInput } from "mui-tel-input";
import { useUser } from "../../../../../services/userServices";

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
const DatePickerWrapper = styled.div`
  width: 100%;
  .MuiOutlinedInput-root {
    width: 100%;
    & fieldset {
      border-color: ${({ error }) =>
        error ? "red !important" : "var(--color-border-2) !important"};
    }
    &:hover fieldset {
      border-color: ${({ error }) =>
        error ? "red !important" : "var(--color-gray) !important"};
    }
  }
  .MuiInputLabel-root {
    color: var(--color-text);
  }
  .MuiInputBase-input {
    color: var(--color-text);
  }
`;
export default function PersonalInformation() {
  const [date, setDate] = useState("");
  const { register, setValue, formState } = useFormContext();
  const { errors } = formState;
  const [phoneNumber, setPhoneNumber] = useState();
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
          label="Full Name"
          defaultValue={user.user_metadata.fullName}
          register={{
            ...register("applicantFullName", {}),
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
          value={phoneNumber}
          {...register("applicantPhoneNumber")}
          helperText={errors?.applicantPhoneNumber?.message}
          error={errors?.applicantPhoneNumber}
          onChange={(phone) => handleChangePhone(phone)}
        />
      </Grid>
      <Grid item xs={6}>
        <DatePickerWrapper error={errors?.applicantBirthday}>
          <DatePicker
            label="Birthday"
            value={date}
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
      </Grid>
    </Grid>
  );
}
