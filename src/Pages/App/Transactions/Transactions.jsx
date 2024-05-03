import CustomTabs from "../../../Components/CustomTabs/CustomTabs";
import DepositTab from "./Tabs/Deposit/DepositTab";
import LoanTab from "./Tabs/Loan/LoanTab";
import TransferMoneyTab from "./Tabs/Transfer/TransferMoneyTab";
import WithdrawTab from "./Tabs/Withdraw/WithdrawTab";

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
  return (
    <div style={{ height: "78dvh" }}>
      <CustomTabs content={content} />
    </div>
  );
}

export default Transactions;
