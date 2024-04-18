import MovementsTable from "./MovementsTable";

function Movements() {
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
        MOVEMENTS
      </h3>
      <MovementsTable />
    </>
  );
}

export default Movements;
