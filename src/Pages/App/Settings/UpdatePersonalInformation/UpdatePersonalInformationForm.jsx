/* eslint-disable react/prop-types */
import { FormHelperText, Grid, Paper, useMediaQuery } from "@mui/material";
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { subYears } from "date-fns";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import CustomButton from "../../../../Components/CustomButton/CustomButton";
import CustomTextField from "../../../../Components/CustomTextField/CustomTextField";
import {
  identificationNumberCharacter,
  media31_25em,
  media48em,
} from "../../../../Constants/constants";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import { useUpdateUser } from "../../../../services/userServices";
import { calcAge } from "../../../../utils/utils";

const StyledMuiTelInput = styled(MuiTelInput)`
  width: 100%;
  & > label {
    color: var(--color-text) !important;
    ${media48em} {
      font-size: 0.9rem;
    }
    ${media31_25em} {
      font-size: 0.8rem;
    }
  }

  & > div {
    color: var(--color-text);
    ${media48em} {
      font-size: 1rem;
    }
    ${media31_25em} {
      font-size: 0.9rem;
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
const StyledUpdateUserTitle = styled.h4`
  font-weight: bold;
  margin-top: 1rem;
  text-align: center;
  width: 100%;
  ${media48em} {
    font-size: 1.2rem;
  }
  ${media31_25em} {
    font-size: 1rem;
  }
`;
export default function UpdatePersonalInformationForm({
  isPersonalDatas,
  setOpenModal,
}) {
  const isMax48em = useMediaQuery("(max-width: 48em)");

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
          <Grid item xs={12}>
            <StyledUpdateUserTitle>
              {isPersonalDatas ? "Update Personal Info " : "Add Personal Info"}
            </StyledUpdateUserTitle>
          </Grid>
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
                  // pattern: {
                  //   value: addressRegex,
                  //   message:
                  //     "Address format should match city,district,neighbourhood,street,door number without commas",
                  // },
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
              value={phoneNumber || "+90"}
              // defaultValue="+90"
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

          {/* 280 px verdim en son  */}
          <Grid item xs={12} sm={6}>
            {isMax48em ? (
              <MobileDatePicker
                width="tall"
                label="Birthday"
                disabled={isUpdating}
                value={birthday}
                slotProps={{
                  popper: { placement: "right-start" },
                  layout: {
                    sx: {
                      color: "var(--color-text)",
                      borderRadius: "2px",
                      borderWidth: "1px",
                      backgroundColor: "var(--color-background)",
                      "&>div": {
                        alignItems: "center",
                        "&>div": {
                          width: "280px",
                          justifyContent: "center",
                          "&>div": {
                            padding: "16px 8px",
                            alignItems: "center",
                          },
                        },
                      },
                    },
                  },
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
                    [media48em]: {
                      fontSize: "0.9rem",
                    },
                    [media31_25em]: {
                      fontSize: "0.8rem",
                    },
                  },
                  "& > div": {
                    color: "var(--color-text)",
                    [media48em]: {
                      fontSize: "1rem",
                    },
                    [media31_25em]: {
                      fontSize: "0.9rem",
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
            ) : (
              <DatePicker
                // width="tall"
                label="Birthday"
                disabled={isUpdating}
                value={birthday}
                slotProps={{
                  popper: { placement: "right-start" },
                  layout: {
                    sx: {
                      color: "var(--color-text)",
                      borderRadius: "2px",
                      borderWidth: "1px",
                      backgroundColor: "var(--color-background)",
                    },
                  },
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
                    [media48em]: {
                      fontSize: "0.9rem",
                    },
                    [media31_25em]: {
                      fontSize: "0.8rem",
                    },
                  },
                  "& > div": {
                    color: "var(--color-text)",
                    [media48em]: {
                      fontSize: "1rem",
                    },
                    [media31_25em]: {
                      fontSize: "0.9rem",
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
            )}
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
