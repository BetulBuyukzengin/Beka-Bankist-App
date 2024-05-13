import AccountCreate from "./AccountCreate";

function BankAccountCreate() {
  return (
    <>
      <h3
        style={{
          backgroundColor: "var(--color-background)",
          color: "var(--color-text)",
          textAlign: "center",
          paddingTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        Account Create
      </h3>
      <AccountCreate />
    </>
  );
}

export default BankAccountCreate;
