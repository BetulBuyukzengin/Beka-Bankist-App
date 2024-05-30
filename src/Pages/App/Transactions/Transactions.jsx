import { useEffect, useRef } from "react";
import CustomTabs from "../../../Components/CustomTabs/CustomTabs";
import DepositTab from "./Tabs/Deposit/DepositTab";
import LoanTab from "./Tabs/Loan/LoanTab";
import TransferMoneyTab from "./Tabs/Transfer/TransferMoneyTab";
import WithdrawTab from "./Tabs/Withdraw/WithdrawTab";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const prevParamValueRef = useRef(null);
  const navigate = useNavigate();
  const currentParamValue = searchParams.get("transactions-tab");

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
  useEffect(function () {
    searchParams.set("transactions-tab", 0);
    searchParams.set("recipient-account-tab", 0);
    searchParams.set("status", content[0].label);
    setSearchParams(searchParams);
  }, []);

  return (
    <div style={{ height: "78dvh" }}>
      <CustomTabs tabName="transactionsTab" content={content} />
    </div>
  );
}

export default Transactions;
