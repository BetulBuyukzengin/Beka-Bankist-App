/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, FormHelperText, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as yup from "yup";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import CustomSelect from "../../../Components/CustomSelect/CustomSelect";
import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import Loader from "../../../Components/Loader/Loader";
import {
  dailyDepositLimit,
  dailyTransferLimit,
  dailyWithdrawLimit,
  starterBalance,
} from "../../../Constants/constants";
import { useCurrentUser } from "../../../Hooks/useCurrentUser";
import {
  useCreateAccount,
  useGetAccounts,
} from "../../../services/accountServices";
import { useUser } from "../../../services/userServices";
import { calcAge, generateRandomIBAN } from "../../../utils/utils";
import AccountConsentForm from "./AccountConsentForm";

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
  {
    content: "Halkbank ",
    value: "halkbank",
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
  & div > input {
    &:disabled {
      -webkit-text-fill-color: var(--color-text) !important;
      color: var(--color-text) !important;
    }
    &:disabled + fieldset {
      border-color: var(--color-border-2) !important;
      background-color: var(--color-background-3);
    }
  }
`;
const StyledContainer = styled.div``;
const StyledLabel = styled.label``;

function AccountCreate({ setOpenCreateModal }) {
  const { currentUser } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { isPending, mutateAsync } = useCreateAccount();
  const [checked, setChecked] = useState(false);
  const { accounts } = useGetAccounts();
  const validationSchema = yup.object({
    bankName: yup.string().required("This field is required!"),
    bankBranch: yup.string().required("This field is required!"),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const { errors } = methods.formState;
  const openedBankNames = accounts
    .filter((account) => account.user_id === user.id)
    .map((account) => account.bankName);

  async function onSubmit(data) {
    const iban = generateRandomIBAN();
    const formDatas = {
      ...data,
      address: currentUser?.applicantAddress,
      fullName: currentUser?.fullName,
      identificationNumber: currentUser?.identificationNumber,
      birthday: currentUser?.birthday,
      phoneNumber: currentUser?.applicantPhoneNumber,
      iban,
      accountNumber: iban.slice(-16),
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
  if (isPending || !currentUser) return <Loader />;
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
                value={currentUser?.fullName}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id="identificationNumber"
                label="Identification number"
                value={currentUser?.identificationNumber}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id="address"
                label="Address"
                value={currentUser?.applicantAddress}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <StyledMuiTelInput
                value={currentUser?.applicantPhoneNumber}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <CustomSelect
                width="100%"
                openedBankNames={openedBankNames}
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
              width="100%"
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
                format="dd/MM/yyyy"
                value={new Date(currentUser?.birthday)}
                disabled
                sx={{
                  width: "100%",
                  "&:hover > div > fieldset": {
                    borderColor: "var(--color-text)!important",
                  },
                  "&>label": {
                    color: "var(--color-text)",
                  },
                  "& > .Mui-disabled": {
                    borderColor: "var(--color-border-2) !important",
                    backgroundColor: "var(--color-background-3)",
                  },

                  "& > div": {
                    color: "var(--color-text)",

                    "& > fieldset": {
                      borderColor: "var(--color-border-2) !important",
                    },
                  },
                  "& div > input": {
                    "&:disabled": {
                      WebkitTextFillColor: "var(--color-text) !important",
                      color: "var(--color-text) !important",
                    },
                  },
                }}
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
                disabled={!checked || isPending}
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
            <AccountConsentForm setOpen={setOpen} setChecked={setChecked} />
          </CustomModal>
        </form>
      </FormProvider>
    </>
  );
}

export default AccountCreate;
