/* eslint-disable react/prop-types */
import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import { useState } from "react";
import { Checkbox, FormHelperText, Grid } from "@mui/material";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import CustomSelect from "../../../Components/CustomSelect/CustomSelect";
import { FormProvider, useForm } from "react-hook-form";
import { calcAge, calcNextDay, generateRandomIBAN } from "../../../utils/utils";
import { toast } from "react-toastify";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import styled from "styled-components";
import { useCreateAccount } from "../../../services/accountServices";
import Loader from "../../../Components/Loader/Loader";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import AccountConsentForm from "./AccountConsentForm";
import { useUser } from "../../../services/userServices";
import { DatePicker } from "@mui/x-date-pickers";
import {
  starterBalance,
  dailyTransferLimit,
  dailyDepositLimit,
  dailyWithdrawLimit,
  identificationNumberCharacter,
} from "../../../Constants/constants";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const bankContent = [
  {
    content: "Select Bank",
    value: "",
  },
  {
    content: "Ziraat ",
    value: "ziraat",
  },
  {
    content: "Akbank ",
    value: "akbank",
  },
];

const branchContent = [
  {
    content: "Select Branch",
    value: "",
  },
  {
    content: "Meram-200",
    value: "meram",
  },
  {
    content: "Merkezefendi-300",
    value: "merkezefendi",
  },
];
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
const StyledContainer = styled.div``;
const StyledLabel = styled.label``;

function AccountCreate({ setOpenCreateModal }) {
  const [birthday, setBirthday] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState();
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { isLoading, mutateAsync } = useCreateAccount();
  const [checked, setChecked] = useState(false);
  function handleChangePhone(phone) {
    setPhoneNumber(phone);
  }

  // console.log(birthday);
  const validationSchema = yup.object({
    fullName: yup.string().required("This field is required!"),
    identificationNumber: yup
      .string()
      .required("This field is required!")
      .test(
        "is-valid-identificationNumber",
        "Identification number is invalid, should be 11 characters long!",
        (value) => value && value.length === identificationNumberCharacter
      ),
    address: yup.string().required("This field is required!"),
    bankName: yup.string().required("This field is required!"),
    bankBranch: yup.string().required("This field is required!"),
    birthday: yup
      .date()
      .required("This field is required!")
      //???????????? TEKRAR BAK !!!!!!!!!!!!!!!!!!!!!!
      //? başlangıç değeri "MM/dd/yyyy   iken typeError her turlu hata gösteriyor o yüzden new Date verdim
      //? AYRICA bu sayede bir gun öncesindeki tarih setleniyordu o hata cozulmus oldu
      .typeError("Birthday must be a valid date in the format MM/DD/YYYY"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .test("is-valid-phone", "Phone number is invalid", (value) =>
        matchIsValidTel(value)
      ),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const { errors } = methods.formState;
  const isError = errors?.birthday || !birthday;

  async function onSubmit(data) {
    const iban = generateRandomIBAN();
    //! Hesaplar tablosundan ibanları, hesap no kıyasla

    const formDatas = {
      ...data,
      phoneNumber,
      iban,
      accountNumber: iban.slice(-16),
      birthday,
      balance: starterBalance,
      remainingTransferLimit: dailyTransferLimit,
      remainingDepositLimit: dailyDepositLimit,
      remainingWithdrawLimit: dailyWithdrawLimit,
      isFormApproved: checked || "",
      user_id: user.id,
    };
    if (calcAge(formDatas.birthday) < 18)
      return toast.error("You are younger than 18");
    await mutateAsync(formDatas);
    setOpenCreateModal(false);
  }
  if (isLoading) return <Loader />;
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                register={methods.register("fullName")}
                helperText={errors?.fullName?.message}
                error={errors?.fullName}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id="identificationNumber"
                label="Identification number"
                register={methods.register("identificationNumber")}
                helperText={errors?.identificationNumber?.message}
                error={errors?.identificationNumber}
                inputProps={{ maxLength: identificationNumberCharacter }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id="address"
                label="Address"
                register={methods.register("address")}
                helperText={errors?.address?.message}
                error={errors?.address}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomSelect
                data={bankContent}
                defaultValue=""
                register={methods.register("bankName")}
                error={errors?.bankName}
              />
              {errors?.bankName && (
                <FormHelperText error sx={{ marginLeft: ".8rem" }}>
                  {errors?.bankName?.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <CustomSelect
                data={branchContent}
                defaultValue=""
                register={methods.register("bankBranch")}
                helperText={errors?.bankBranch?.message}
                error={errors?.bankBranch}
              />
              {errors?.bankBranch && (
                <FormHelperText error sx={{ marginLeft: ".8rem" }}>
                  {errors?.bankBranch?.message}
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={6}>
              <DatePicker
                width="tall"
                label="Birthday"
                value={birthday}
                {...methods.register("birthday")}
                slotProps={{
                  popper: { placement: "right-start" },
                }}
                helperText={errors?.birthday?.message}
                error={errors}
                onChange={(date) => {
                  // console.log(date);
                  setBirthday(date);
                }}
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
                      borderColor: isError
                        ? "red !important"
                        : "var(--color-border-2) !important",
                    },
                  },
                }}
              />
              {errors?.birthday && (
                <FormHelperText error sx={{ marginLeft: ".8rem" }}>
                  {errors?.birthday?.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <StyledMuiTelInput
                preferredCountries={["TR", "US", "KR"]}
                defaultCountry="TR"
                value={phoneNumber}
                {...methods.register("phoneNumber")}
                onChange={(phone) => handleChangePhone(phone)}
              />
              {errors?.phoneNumber && (
                <FormHelperText error sx={{ marginLeft: ".8rem" }}>
                  {errors?.phoneNumber?.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <StyledContainer>
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <StyledLabel onClick={() => setOpen(true)}>
                  <strong>
                    I approve the bank account opening information and approval
                    form
                  </strong>
                </StyledLabel>
              </StyledContainer>
              <CustomButton
                disabled={!checked}
                type="submit"
                buttonText="create"
              />
            </Grid>
          </Grid>
          <CustomModal
            open={open}
            setOpen={setOpen}
            title="Bank Account Opening Disclosure and Approval Form"
          >
            <AccountConsentForm
              setOpen={setOpen}
              phoneNumber={phoneNumber}
              setChecked={setChecked}
            />
          </CustomModal>
        </form>
      </FormProvider>
    </>
  );
}

export default AccountCreate;

// // dogum tarihi (eğer 18 yas altııse hesap acamasın)
// // sözleşme formu
