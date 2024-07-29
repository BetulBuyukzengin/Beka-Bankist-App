import { useEffect } from "react";
import CustomTabs from "../../../../../Components/CustomTabs/CustomTabs";
import NewRecipientTab from "./NewRecipientTab";
import RegisteredRecipientsTab from "./RegisteredRecipientsTab";
import { useSearchParams } from "react-router-dom";
import { useForm, useFormContext } from "react-hook-form";

const content = [
  {
    label: "Registered Recipients",
    component: <RegisteredRecipientsTab />,
  },
  {
    label: "New Recipient",
    component: <NewRecipientTab />,
  },
];
function RecipientAccount({ iban, setIban }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { resetField } = useFormContext();
  // const mainTabLabel = [];

  // if (content.length === 4) {
  //   content.map((tab) => {
  //     mainTabLabel.push(tab.label);
  //   });
  // }
  const mainTabLabel = content.map((tab) => tab.label);
  useEffect(
    function () {
      if (searchParams.get("recipient-account-tab") === "0") {
        resetField("recipientIban", { defaultValue: "" });
        resetField("recipientFullNameWithIban", { defaultValue: "" });
        resetField("shortName", { defaultValue: "" });
        setIban("TR");
        resetField("recipientBankName", { defaultValue: "" });
        searchParams.delete("selected-bank");
        resetField("recipientBankBranch", { defaultValue: "" });
        searchParams.delete("selected-branch");
        resetField("recipientAccountNumber", { defaultValue: "" });
        resetField("recipientFullNameWithAccount", { defaultValue: "" });
        resetField("shortName", { defaultValue: "" });
        setSearchParams(searchParams);
      }
      // if (searchParams.get("recipient-account-tab") === "1") {
      // }
    },
    [searchParams]
  );
  return (
    <CustomTabs
      tabName="recipientAccountTab"
      mainTabLabel={mainTabLabel}
      content={content.map((cont, i) =>
        cont.label === "New Recipient"
          ? {
              ...cont,
              component: (
                <NewRecipientTab iban={iban} setIban={setIban} key={i} />
              ),
            }
          : cont
      )}
    />
  );
}

export default RecipientAccount;
