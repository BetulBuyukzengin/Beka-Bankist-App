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
    @media (max-width: 48em) {
      font-size: 0.8rem;
    }
    @media (max-width: 31.25em) {
      font-size: 0.7rem;
    }
  }

  & > div {
    color: var(--color-text);
    @media (max-width: 48em) {
      font-size: 0.8rem;
    }
    @media (max-width: 31.25em) {
      font-size: 0.7rem;
    }
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
      <Grid
        item
        // xs={6}
        xs={12}
        sm={6}
        sx={{
          "&>div": {
            "@media (max-width:48em)": {
              width: "100%!important",
            },
          },
        }}
      >
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
      <Grid
        item
        // xs={6}
        xs={12}
        sm={6}
        sx={{
          "&>div": {
            "@media (max-width:48em)": {
              width: "100%!important",
            },
          },
        }}
      >
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
      <Grid
        item
        // xs={6}
        xs={12}
        sm={6}
        sx={{
          "&>div": {
            "@media (max-width:48em)": {
              width: "100%!important",
            },
            "&>p": {
              "@media (max-width:48em)": {
                fontSize: ".7rem",
              },
              "@media (max-width:31.25em)": {
                fontSize: ".6rem",
              },
            },
          },
        }}
      >
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
      <Grid
        item
        // xs={6}
        xs={12}
        sm={6}
        sx={{
          "&>div": {
            "&>p": {
              "@media (max-width:48em)": {
                fontSize: ".7rem",
              },
              "@media (max-width:31.25em)": {
                fontSize: ".6rem",
              },
            },
          },
        }}
      >
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
      <Grid
        item
        // xs={6}
        xs={12}
        sm={6}
        sx={{
          "&>div": {
            "@media (max-width:48em)": {
              width: "100%!important",
            },
          },
        }}
      >
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
