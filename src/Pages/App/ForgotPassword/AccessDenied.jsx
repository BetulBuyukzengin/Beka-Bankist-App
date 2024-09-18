import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { media31_25em, media48em } from "../../../Constants/constants";

function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100dvh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: "2rem 4rem ",
          width: "50%",
          m: "1rem",
          backgroundColor: "transparent",
          //   display: "flex",
        }}
      >
        <Grid
          container
          gap={1}
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Grid item xs={12}>
            <ArrowBackIcon onClick={() => navigate("/forgotPassword")} />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              //   alignSelf: "center",
              //   textAlign: "center",
              [media48em]: {
                fontSize: ".8rem",
              },
              [media31_25em]: {
                fontSize: ".7rem",
              },
            }}
          >
            You don &apos;t have permission to access this form !<br /> Write
            your e-mail address in the I forgot my password form and submit it.
            You can reset your password via the link sent to your e-mail.
            {/* Bu forma erişim izniniz yok!Şifremiunuttum formuna e-posta adresinizi yazın ve gönderin. E-postanıza
            gönderilen linkten şifrenizi sıfırlayabilirsiniz. */}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default AccessDenied;
