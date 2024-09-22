/* eslint-disable react/prop-types */
import { FormHelperText, Grid, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { subYears } from "date-fns";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import CustomTextField from "../../../../Components/CustomTextField/CustomTextField";
import {
  addressRegex,
  identificationNumberCharacter,
  media31_25em,
} from "../../../../Constants/constants";
import { useUpdateUser } from "../../../../services/userServices";
import { calcAge } from "../../../../utils/utils";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import { media48em } from "../../../../Constants/constants";

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
function UpdatePersonalInformationForm({ isPersonalDatas, setOpenModal }) {
  const { currentUser } = useCurrentUser();

  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.applicantPhoneNumber || ""
  );
  //! So the border won't be red initially - subYears(new Date(), 18)
  const [birthday, setBirthday] = useState(
    new Date(currentUser?.birthday) || subYears(new Date(), 18)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser();

  function handleChangePhone(phone) {
    setPhoneNumber(phone);
  }

  const id = currentUser?.id;
  const onSubmit = async (data) => {
    if (calcAge(birthday) < 18) return;

    const personalData = {
      ...data,
      birthday,
      applicantPhoneNumber: phoneNumber,
    };
    await updateUser({ id, user: personalData });
    setOpenModal(false);
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
          // border: "1px solid var(--color-gray)",
          color: "var(--color-text)",
          [media48em]: {
            padding: ".3rem",
          },
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
          <Grid item xs={12} sm={6}>
            <CustomTextField
              id="identificationNumber"
              label="Identification number"
              disabled={isUpdating}
              type="number"
              textFieldStyles={{ width: "100%" }}
              defaultValue={currentUser?.identificationNumber}
              register={{
                ...register("identificationNumber", {
                  required: "Identification number is required!",
                  validate: (value) =>
                    value.length === identificationNumberCharacter ||
                    "Identification number should be 11 characters long!",
                }),
              }}
              inputProps={{
                onInput: (e) => {
                  if (e.target.value.length > identificationNumberCharacter) {
                    e.target.value = e.target.value.slice(
                      0,
                      identificationNumberCharacter
                    );
                  }
                },
              }}
              helperText={errors?.identificationNumber?.message}
              error={errors?.identificationNumber}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              id="adress"
              disabled={isUpdating}
              label="Adress"
              textFieldStyles={{ width: "100%" }}
              defaultValue={currentUser?.applicantAddress}
              // for test
              // defaultValue="Ankara Çankaya Kavaklı Mah. Atatürk Sok. No: 5"
              placeholder="E.G. Ankara Çankaya Kavaklı Mah. Atatürk Sok. No: 5"
              register={{
                ...register("applicantAddress", {
                  required: "Address is required!",
                  pattern: {
                    value: addressRegex,
                    message:
                      "Address format should match city,district,neighbourhood,street,door number without commas",
                  },
                }),
              }}
              helperText={errors?.applicantAddress?.message}
              error={errors?.applicantAddress}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledMuiTelInput
              disabled={isUpdating}
              label="Phone number"
              preferredCountries={["TR", "US", "KR"]}
              value={phoneNumber}
              {...register("applicantPhoneNumber", {
                validate: (value) =>
                  matchIsValidTel(value) || "Phone Number is not valid!",
              })}
              onChange={handleChangePhone}
            />
            {errors?.applicantPhoneNumber && (
              <FormHelperText error sx={{ marginLeft: ".8rem" }}>
                {errors?.applicantPhoneNumber?.message}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              width="tall"
              label="Birthday"
              disabled={isUpdating}
              value={birthday}
              slotProps={{
                popper: { placement: "right-start" },
              }}
              format="dd/MM/yyyy"
              onChange={(date) => setBirthday(date)}
              sx={{
                width: "100%",
                "&:hover > div > fieldset": {
                  borderColor: "var(--color-text)!important",
                },
                "&>label": {
                  color: "var(--color-text)",
                  "@media (max-width: 48em)": {
                    fontSize: "0.8rem",
                  },
                  "@media (max-width: 31.25em)": {
                    fontSize: "0.7rem",
                  },
                },
                "& > div": {
                  color: "var(--color-text)",
                  "@media (max-width: 48em)": {
                    fontSize: "0.8rem",
                  },
                  "@media (max-width: 31.25em)": {
                    fontSize: "0.7rem",
                  },

                  "& > fieldset": {
                    borderColor:
                      !birthday || calcAge(birthday) < 18
                        ? "red !important"
                        : "var(--color-border-2) !important",
                  },
                },
              }}
            />
            {calcAge(birthday) < 18 && (
              <FormHelperText error sx={{ marginLeft: ".8rem" }}>
                You are younger than 18!
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <CustomButton
              disabled={isUpdating}
              style={{
                [media48em]: {
                  fontSize: ".8rem",
                },
                [media31_25em]: {
                  fontSize: ".7rem",
                },
              }}
              type="submit"
              buttonText={isPersonalDatas ? "Update " : "Add "}
            />
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}

export default UpdatePersonalInformationForm;
