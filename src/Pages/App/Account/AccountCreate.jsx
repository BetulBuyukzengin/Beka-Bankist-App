import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import CustomDatePicker from "../../../Components/CustomDatePicker/CustomDatePicker";
import { useState } from "react";
import { Box, Checkbox, Grid, Modal, Typography } from "@mui/material";
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
import {
  useCreateAccount,
  useGetAccounts,
} from "../../../services/accountServices";
import Loader from "../../../Components/Loader/Loader";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import AccountConsentForm from "./AccountConsentForm";

const bankContent = [
  {
    content: "Select Bank",
    value: "",
  },
  {
    content: "Ziraat Bank",
    value: "ziraatBank",
  },
  {
    content: "Akbank Bank",
    value: "akbankBank",
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
  // const { register, handleSubmit, setValue } = useForm();
  const [birthday, setBirthday] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState();
  const [open, setOpen] = useState(false);
  const { isLoading, mutateAsync } = useCreateAccount();

  function handleChangePhone(phone) {
    setPhoneNumber(phone);
  }
  async function onSubmit(data) {
    const iban = generateRandomIBAN();
    //hesaplar tablosundan ibanları, hesap no kıyasla
    const accountNumber = generateRandomBankAccountNumber();
    const formDatas = { ...data, phoneNumber, iban, accountNumber, balance: 0 };
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
                register={methods.register("fullName")}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id="address"
                label="Address"
                register={methods.register("address")}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomSelect
                data={bankContent}
                defaultValue=""
                register={methods.register("bankName")}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomSelect
                data={branchContent}
                defaultValue=""
                register={methods.register("bankBranch")}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomDatePicker
                width="tall"
                label="Birthday"
                value={birthday}
                onChange={(date) => {
                  setBirthday(date);
                  methods.setValue("birthday", date);
                  if (calcAge(date) < 18) {
                    toast.error("You are younger than 18 ");
                  }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <StyledMuiTelInput
                preferredCountries={["TR", "US", "KR"]}
                defaultCountry="TR"
                value={phoneNumber}
                onChange={(phone) => handleChangePhone(phone)}
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
                <Checkbox />
                <StyledLabel onClick={() => setOpen(true)}>
                  ASRŞLSKSAFŞSKMFŞ
                </StyledLabel>
              </StyledContainer>
              <CustomButton type="submit" buttonText="create" />
            </Grid>
          </Grid>
          <CustomModal
            open={open}
            setOpen={setOpen}
            title="Bank Account Opening Disclosure and Approval Form"
          >
            <AccountConsentForm phoneNumber={phoneNumber} />
          </CustomModal>
        </form>
      </FormProvider>
    </>
  );
}

export default AccountCreate;

// // dogum tarihi (eğer 18 yas altııse hesap acamasın)
// // sözleşme formu
