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

function NewRecipientTab({ iban, setIban }) {
  const orientation = "vertical";
  const [searchParams, setSearchParams] = useSearchParams();
  const { resetField, watch } = useFormContext();
  const watchSaveAsRegisteredWithIban = watch("saveAsRegisteredWithIban");

  const watchSaveAsRegisteredWithAccount = watch("saveAsRegisteredWithAccount");

  const mainTabLabel = content.map((tab) => {
    return tab.label;
  });

  useEffect(
    function () {
      if (searchParams.get("new-recipient-tab") === "1") {
        resetField("recipientIban", { defaultValue: "" });
        resetField("recipientFullNameWithIban", { defaultValue: "" });
        resetField("shortName", { defaultValue: "" });
        setIban("TR");
      }
      if (searchParams.get("new-recipient-tab") === "0") {
        resetField("recipientBankName", { defaultValue: "" });
        searchParams.delete("selected-bank");
        resetField("recipientBankBranch", { defaultValue: "" });
        searchParams.delete("selected-branch");
        resetField("recipientAccountNumber", { defaultValue: "" });
        resetField("recipientFullNameWithAccount", { defaultValue: "" });
        resetField("shortName", { defaultValue: "" });
        setSearchParams(searchParams);
      }

      if (
        searchParams.get("status") === "New Recipient" ||
        searchParams.get("status") === "With Iban"
      ) {
        searchParams.set(
          "saveAsRegisteredWithIban",
          watchSaveAsRegisteredWithIban
        );
        setSearchParams(searchParams);
      } else {
        searchParams.delete("saveAsRegisteredWithIban");
        setSearchParams(searchParams);
      }

      if (searchParams.get("status") === "With Account Numbers") {
        searchParams.set(
          "saveAsRegisteredWithAccount",
          watchSaveAsRegisteredWithAccount
        );
        setSearchParams(searchParams);
      } else {
        searchParams.delete("saveAsRegisteredWithAccount");
        setSearchParams(searchParams);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      searchParams,
      watchSaveAsRegisteredWithAccount,
      watchSaveAsRegisteredWithIban,
    ]
  );

  return (
    <>
      <CustomTabs
        tabName="newRecipientTab"
        orientation={orientation}
        mainTabLabel={mainTabLabel}
        content={content.map((cont) =>
          cont.label === "With Iban"
            ? {
                ...cont,
                component: <WithIbanTab iban={iban} setIban={setIban} />,
              }
            : cont
        )}
      />
    </>
  );
}

export default NewRecipientTab;
