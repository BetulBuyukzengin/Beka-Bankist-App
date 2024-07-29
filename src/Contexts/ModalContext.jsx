/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
// context apı for loan payment modal
const LoanPaymentModalContext = createContext();
function LoanPaymentModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <LoanPaymentModalContext.Provider value={{ open, setOpen }}>
      {children}
    </LoanPaymentModalContext.Provider>
  );
}
function useLoanPaymentModal() {
  const context = useContext(LoanPaymentModalContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}
export { useLoanPaymentModal, LoanPaymentModalProvider };
