import { useMovements } from "../../../services/movementsServices";
import MovementsNotification from "./MovementsNotification";
import MovementsTable from "./MovementsTable";
import Loader from "../../../Components/Loader/Loader";
import { Typography } from "@mui/material";
import { media31_25em, media48em } from "../../../Constants/constants";

function Movements() {
  const { isLoading, movements } = useMovements();
  if (isLoading) return <Loader />;
  return (
    <>
      {/* <h3
        style={{
          backgroundColor: "transparent",
          color: "var(--color-text)",
          textAlign: "center",
          marginBottom: 0,
          paddingTop: "1rem",
          fontSize: "1.5rem",
        }}
      >
        MOVEMENTS
      </h3> */}
      <Typography
        component="h3"
        sx={{
          backgroundColor: "transparent",
          color: "var(--color-text)",
          // marginRight: "auto",
          // marginLeft: "auto",
          // marginBottom: 0,
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",

          [media48em]: {
            fontSize: "1.2rem",
          },
          [media31_25em]: {
            fontSize: "1rem",
          },
        }}
      >
        MOVEMENTS
      </Typography>
      {movements?.length ? <MovementsTable /> : <MovementsNotification />}
    </>
  );
}

export default Movements;
