import CustomTabs from "./CustomTabs";
import DepositTab from "./DepositTab";
import LoanTab from "./LoanTab";
import TransferMoneyTab from "./TransferMoneyTab";
import WithdrawTab from "./WithdrawTab";

function Transactions() {
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
  return (
    <>
      <CustomTabs content={content} />
    </>
  );
}

export default Transactions;
