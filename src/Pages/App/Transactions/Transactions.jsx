import CustomTabs from "./Tabs/CustomTabs";
import DepositTab from "./Tabs/DepositTab";
import LoanTab from "./Tabs/LoanTab";
import TransferMoneyTab from "./Tabs/TransferMoneyTab";
import WithdrawTab from "./Tabs/WithdrawTab";

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
