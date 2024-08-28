import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import CustomRadio from "../../../Components/CustomRadio/CustomRadio";
import DeleteAccountConfirmationScreen from "./DeleteAccountConfirmationScreen";

// Test
import { useDeleteAccount } from "../../../services/accountServices";

function AccountDelete() {
  const methods = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const accountToDelete = JSON.parse(searchParams.get("selectedAccount"));
  const accountId = accountToDelete.id;

  const { mutateAsync: deleteAccount, isPending } = useDeleteAccount();

  const onSubmit = async () => {
    await deleteAccount(accountId, {
      onSuccess: () => {
        setOpen(false);
        clearSearchParams();
      },
    });
  };

  function handleChange(value) {
    searchParams.set("selectedAccount", value);
    setSearchParams(searchParams);
    setOpen(true);
  }
  function clearSearchParams() {
    if (searchParams.has("selectedAccount")) {
      searchParams.delete("selectedAccount");
      setSearchParams(searchParams);
    }
  }
  if (isPending) return console.log("siliiniyor");
  return (
    <FormProvider {...methods}>
      <CustomRadio
        value={searchParams.get("selectedAccount")}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <CustomModal
        open={open}
        setOpen={setOpen}
        title="Confirm Delete"
        clearParamsCallBack={clearSearchParams}
        shouldClearParamsOnClose
      >
        <DeleteAccountConfirmationScreen
          setOpen={setOpen}
          onSubmit={onSubmit}
          clearParamsCallBack={clearSearchParams}
        />
      </CustomModal>
    </FormProvider>
  );
}

export default AccountDelete;
