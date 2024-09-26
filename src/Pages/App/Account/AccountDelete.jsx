import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import CustomRadio from "../../../Components/CustomRadio/CustomRadio";
import DeleteAccountConfirmationScreen from "./DeleteAccountConfirmationScreen";
import { useDeleteAccount } from "../../../services/accountServices";
import Loader from "../../../Components/Loader/Loader";

function AccountDelete() {
  const methods = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const accountToDelete = JSON.parse(searchParams.get("selectedAccount"));
  const { mutateAsync: deleteAccount, isPending } = useDeleteAccount();

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
  const onSubmit = async () => {
    await deleteAccount(accountToDelete?.id, {
      onSuccess: () => {
        setOpen(false);
        clearSearchParams();
      },
    });
  };

  if (isPending) return <Loader />;
  return (
    <FormProvider {...methods}>
      <CustomRadio
        border="standard"
        value={searchParams.get("selectedAccount")}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        customRadioStyles={{
          gap: ".5rem",
        }}
      />
      <CustomModal
        open={open}
        setOpen={setOpen}
        title="Confirm Delete"
        clearParamsCallBack={clearSearchParams}
        shouldClearParamsOnClose
        modalBoxStyles={{
          maxHeight: "60dvh",
          maxWidth: "43rem",
          padding: "3rem 1rem",
        }}
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
