import { useMovements } from "../../../services/movementsServices";
import MovementsNotification from "./MovementsNotification";
import MovementsTable from "./MovementsTable";
import Loader from "../../../Components/Loader/Loader";

function Movements() {
  const { isLoading, movements } = useMovements();
  if (isLoading) return <Loader />;
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
      {movements.length ? <MovementsTable /> : <MovementsNotification />}
    </>
  );
}

export default Movements;
