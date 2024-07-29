import { useForm, FormProvider } from "react-hook-form";
import CustomRadio from "../../../Components/CustomRadio/CustomRadio";
import { useSearchParams } from "react-router-dom";

function AccountDelete() {
  const methods = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(value) {
    searchParams.set("selectedAccount", value);
    setSearchParams(searchParams);
  }
  function onSubmit() {}
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CustomRadio
          // border={border}
          value={searchParams.get("selectedAccount")}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          register={{ ...methods.register("selectedAccount") }}
        />
      </form>
    </FormProvider>
  );
}

export default AccountDelete;
