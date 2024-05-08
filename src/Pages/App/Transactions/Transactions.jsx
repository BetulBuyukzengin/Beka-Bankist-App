import { useEffect } from "react";
import CustomTabs from "../../../Components/CustomTabs/CustomTabs";
import DepositTab from "./Tabs/Deposit/DepositTab";
import LoanTab from "./Tabs/Loan/LoanTab";
import TransferMoneyTab from "./Tabs/Transfer/TransferMoneyTab";
import WithdrawTab from "./Tabs/Withdraw/WithdrawTab";
import { useLocation, useSearchParams } from "react-router-dom";

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
function Transactions() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(function () {
    if (pathname === "/applayout/transactions") {
      searchParams.set("transactions-tab", 0);
      searchParams.set("recipient-account-tab", 0);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <div style={{ height: "78dvh" }}>
      <CustomTabs tabName="transactionsTab" content={content} />
    </div>
  );
}

export default Transactions;
