import AppSlider from "../../../Components/AppSlider/AppSlider";
import CustomButton from "../../../Components/CustomButton/CustomButton";

function CurrentAccounts() {
  return (
    <>
      <h3
        style={{
          backgroundColor: "var(--color-background)",
          color: "var(--color-text)",
          textAlign: "center",
          marginBottom: 0,
          paddingTop: "1rem",
        }}
      >
        MY ACCOUNTS
      </h3>
      <AppSlider />
      <CustomButton buttonText="New Account" />
    </>
  );
}

export default CurrentAccounts;
