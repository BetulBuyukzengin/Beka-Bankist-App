import { useEffect, useRef } from "react";
import CustomTabs from "../../../Components/CustomTabs/CustomTabs";
import DepositTab from "./Tabs/Deposit/DepositTab";
import LoanTab from "./Tabs/Loan/LoanTab";
import TransferMoneyTab from "./Tabs/Transfer/TransferMoneyTab";
import WithdrawTab from "./Tabs/Withdraw/WithdrawTab";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { useGetRegisteredRecipients } from "../../../services/registeredRecipientsServices";
import styled from "styled-components";

const StyledDiv = styled.div`
  /* height: 78dvh; */
  /* background-color: red; */
  /* max-height: 500px; */
  overflow-y: scroll;
  @media (max-width: 48em) {
    height: 100dvh;
  }
`;
const StyledH3 = styled.h3`
  background-color: transparent;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 0.5rem;
  padding-top: 1rem;
  font-size: 1.5rem;
  @media (max-width: 48em) {
    padding-top: 0rem;

    font-size: 0.8rem !important;
  }
  @media (max-width: 31.25em) {
    font-size: 0.7rem;
  }
`;
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
    <StyledDiv>
      <StyledH3>TRANSACTIONS</StyledH3>
      <CustomTabs
        tabName="transactionsTab"
        content={content}
        mainTabLabel={mainTabLabel}
      />
    </StyledDiv>
  );
}

export default Transactions;
