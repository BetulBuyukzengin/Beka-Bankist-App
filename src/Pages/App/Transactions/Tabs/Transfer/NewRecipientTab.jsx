import CustomTabs from "../../../../../Components/CustomTabs/CustomTabs";
import WithIbanTab from "./WithIbanTab";
import AccountNumberTab from "./AccountNumberTab";
import { useSearchParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
const content = [
  {
    label: "With Iban",
    component: <WithIbanTab />,
  },
  { label: "With Account Numbers", component: <AccountNumberTab /> },
];
// can make with use qr code

function NewRecipientTab() {
  const orientation = "vertical";
  const [searchParams, setSearchParams] = useSearchParams();
  const { resetField } = useFormContext();

  useEffect(
    function () {
      if (searchParams.get("new-recipient-tab") === "1") {
        resetField("iban", { defaultValue: "" });
        resetField("fullNameWithIban", { defaultValue: "" });
        resetField("shortName", { defaultValue: "" });
        // resetField("saveAsRegisteredWithAccount", { defaultValue: false });
      }
      if (searchParams.get("new-recipient-tab") === "0") {
        resetField("bankName", { defaultValue: "" });
        searchParams.delete("selected-bank");
        resetField("bankBranch", { defaultValue: "" });
        searchParams.delete("selected-branch");
        resetField("accountNumber", { defaultValue: "" });
        resetField("fullNameWithAccount", { defaultValue: "" });
        resetField("shortName", { defaultValue: "" });
        // resetField("saveAsRegisteredWithIban", { defaultValue: false });
        setSearchParams(searchParams);
      }
    },
    [searchParams, resetField]
  );

  return (
    <>
      <CustomTabs
        tabName="newRecipientTab"
        orientation={orientation}
        content={content}
      />
    </>
  );
}

export default NewRecipientTab;
