/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
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

export default function PersonalInformation({ phoneNumber, setPhoneNumber }) {
  const [searchParams] = useSearchParams();
  const selectedAccount = JSON.parse(searchParams.get("selectedAccount"));
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
          disabled={user.user_metadata.fullName ? true : false}
          label="Full Name"
          register={{
            ...register("applicantFullName"),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          id="identificationNumber"
          label="Identification number"
          value={selectedAccount?.identificationNumber}
          disabled={selectedAccount?.identificationNumber ? true : false}
          register={{
            ...register("applicantIdentificationNumber", {}),
          }}
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
          {...register("applicantPhoneNumber")}
          onChange={(phone) => handleChangePhone(phone)}
          helperText={errors?.applicantPhoneNumber?.message}
          error={errors?.applicantPhoneNumber}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          id="birthday"
          label="Birthday"
          value={formatDate(selectedAccount?.birthday)}
          disabled={!!selectedAccount?.birthday}
        />
      </Grid>
    </Grid>
  );
}
