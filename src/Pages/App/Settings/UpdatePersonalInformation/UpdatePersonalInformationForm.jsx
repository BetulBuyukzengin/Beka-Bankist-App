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
} from "../../../../Constants/constants";
import { useUpdateUser } from "../../../../services/userServices";
import { calcAge } from "../../../../utils/utils";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";

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
function UpdatePersonalInformationForm({ setOpen, isPersonalDatas }) {
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
  const { mutateAsync: updateUser } = useUpdateUser();

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
              type="number"
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

          <Grid item xs={6}>
            <CustomTextField
              id="adress"
              label="Adress"
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
          <Grid item xs={6}>
            <StyledMuiTelInput
              label="Phone number"
              preferredCountries={["TR", "US", "KR"]}
              value={phoneNumber}
              {...register("applicantPhoneNumber", {
                // required: "Phone Number is required!",
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

          <Grid item xs={6}>
            <DatePicker
              width="tall"
              label="Birthday"
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
                },
                "& > div": {
                  color: "var(--color-text)",

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
