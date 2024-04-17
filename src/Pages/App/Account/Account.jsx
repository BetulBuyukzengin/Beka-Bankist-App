import AppSlider from "../../../Components/AppSlider/AppSlider";

function Account() {
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
    </>
  );
}

export default Account;
