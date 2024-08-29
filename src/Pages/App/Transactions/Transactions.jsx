import { useEffect, useRef } from "react";
import CustomTabs from "../../../Components/CustomTabs/CustomTabs";
import DepositTab from "./Tabs/Deposit/DepositTab";
import LoanTab from "./Tabs/Loan/LoanTab";
import TransferMoneyTab from "./Tabs/Transfer/TransferMoneyTab";
import WithdrawTab from "./Tabs/Withdraw/WithdrawTab";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { useGetRegisteredRecipients } from "../../../services/registeredRecipientsServices";

const content = [
  {
    label: "Transfer",
    component: <TransferMoneyTab />,
  },
  {
    label: "Take out a loan",
    component: <LoanTab />,
  },
  {
    label: "Deposit",
    component: <DepositTab />,
  },
  {
    label: "Withdraw",
    component: <WithdrawTab />,
  },
];

const preserveParams = ["transactions-tab", "recipient-account-tab", "status"];
function Transactions() {
  const { search, pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const prevParamValueRef = useRef(null);
  const navigate = useNavigate();
  const currentParamValue = searchParams.get("transactions-tab");
  const { isLoading } = useGetRegisteredRecipients();
  const mainTabLabel = content.map((tab) => tab.label);

  //! Important
  useEffect(
    function () {
      const handleClearParams = () => {
        const params = new URLSearchParams(search);
        const newSearchParams = new URLSearchParams();
        preserveParams.forEach((param) => {
          if (params.has(param)) newSearchParams.set(param, params.get(param));
        });
        const newUrl = `${pathname}?${newSearchParams.toString()}`; // Sadece path'i al, search kısmını temizle

        navigate(newUrl, { replace: true }); // replace: true, history stack'ini değiştirmeden yönlendirme yapar
      };
      if (currentParamValue !== prevParamValueRef.current) {
        handleClearParams();
      }
      prevParamValueRef.current = currentParamValue;
    },
    [navigate, search, searchParams, currentParamValue, pathname]
  );

  if (isLoading) return <Loader />;

  return (
    <div style={{ height: "78dvh", overflowY: "scroll" }}>
      <CustomTabs
        tabName="transactionsTab"
        content={content}
        mainTabLabel={mainTabLabel}
      />
    </div>
  );
}

export default Transactions;
