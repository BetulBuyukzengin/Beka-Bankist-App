import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import { useState } from "react";
import { Checkbox, Grid } from "@mui/material";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import CustomSelect from "../../../Components/CustomSelect/CustomSelect";
import { FormProvider, useForm } from "react-hook-form";
import {
  calcAge,
  generateRandomBankAccountNumber,
  generateRandomIBAN,
} from "../../../utils/utils";
import { toast } from "react-toastify";
import { MuiTelInput } from "mui-tel-input";
import styled from "styled-components";
import { useCreateAccount } from "../../../services/accountServices";
import Loader from "../../../Components/Loader/Loader";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import AccountConsentForm from "./AccountConsentForm";
import { useUser } from "../../../services/userServices";
import { DatePicker } from "@mui/x-date-pickers";

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

function AccountCreate() {
  const methods = useForm();
  const [birthday, setBirthday] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { isLoading, mutateAsync } = useCreateAccount();
  const [checked, setChecked] = useState(false);
  const { errors } = methods.formState;
  const isError = errors?.birthday || !birthday;

  function handleChangePhone(phone) {
    setPhoneNumber(phone);
  }

  async function onSubmit(data) {
    const iban = generateRandomIBAN();
    //! Hesaplar tablosundan ibanları, hesap no kıyasla
    const accountNumber = generateRandomBankAccountNumber();
    const formDatas = {
      ...data,
      phoneNumber,
      iban,
      accountNumber,
      birthday,
      balance: 0,
      isFormApproved: checked || "",
    };

    if (calcAge(formDatas.birthday) < 18)
      return toast.error("You are younger than 18");
    await mutateAsync(formDatas);
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
                register={methods.register("fullName", {
                  required: "This field is required!",
                })}
                helperText={errors?.fullName?.message}
                error={errors?.fullName}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id="address"
                label="Address"
                register={methods.register("address", {
                  required: "This field is required!",
                })}
                helperText={errors?.address?.message}
                error={errors?.address}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomSelect
                data={bankContent}
                defaultValue=""
                register={methods.register("bankName", {
                  required: "This field is required!",
                })}
                helperText={errors?.bankName?.message}
                error={errors?.bankName}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomSelect
                data={branchContent}
                defaultValue=""
                register={methods.register("bankBranch", {
                  required: "This field is required!",
                })}
                helperText={errors?.bankBranch?.message}
                error={errors?.bankBranch}
              />
            </Grid>

            <Grid item xs={6}>
              <DatePicker
                //! required ekle
                width="tall"
                label="Birthday"
                value={birthday}
                {...methods.register("birthday", {
                  required: "This field is required!",
                })}
                slotProps={{
                  popper: { placement: "right-start" },
                  textField: {
                    required: "This field is required!",
                  },
                }}
                helperText={errors?.birthday?.message}
                error={errors}
                onChange={(date) => {
                  setBirthday(date);
                }}
                sx={{
                  // marginTop: margin === "small" && "1rem",
                  // width: width === "small" ? "70%" : "100%",
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
                      // borderColor: "var(--color-border-2)!important",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <StyledMuiTelInput
                preferredCountries={["TR", "US", "KR"]}
                defaultCountry="TR"
                value={phoneNumber}
                {...methods.register("phoneNumber", {
                  required: "This field is required!",
                })}
                onChange={(phone) => handleChangePhone(phone)}
                //! required ekle
              />
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
