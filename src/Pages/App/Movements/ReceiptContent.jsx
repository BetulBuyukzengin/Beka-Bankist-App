import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import MenuIcon from "../../../Components/MenuIcon/MenuIcon";

const StyledLabel = styled.label`
  width: 50%;
`;
const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 55%;
  background-color: var(--color-background-2);
  color: var(--color-text);
  padding: 2rem 1rem;
  border-radius: 5px;
`;
const StyledDescription = styled.p`
  font-size: 14px;
`;
export default function ReceiptContent() {
  return (
    <StyledBox sx={{ flexGrow: 1 }}>
      <MenuIcon />
      <Box mb={4}>
        <h5>BEKA BANKİST</h5>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            marginBottom: "2rem",
            border: "1px solid var(--color-text)",
            padding: "1rem",
            borderRadius: "5px",
            marginLeft: "0!important",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              paddingLeft: "0!important",
              display: "flex",
            }}
          >
            <StyledLabel>ŞUBE KODU/ADI: </StyledLabel>
            <StyledLabel>Meram/Konya</StyledLabel>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              paddingLeft: "0!important",
              display: "flex",
            }}
          >
            <StyledLabel>IBAN: </StyledLabel>
            <StyledLabel>TR15415534535315</StyledLabel>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              paddingLeft: "0!important",
              display: "flex",
            }}
          >
            <StyledLabel>İŞLEM TARİHİ: </StyledLabel>
            <StyledLabel>14/04/2024-11.22.12</StyledLabel>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            marginBottom: "2rem",
            marginLeft: "2rem",
            border: "1px solid var(--color-text)",
            borderRadius: "5px",
          }}
        >
          <Grid item xs={12}>
            SAYIN BETÜL BZ
          </Grid>
          <Grid item xs={12} sx={{ paddingTop: "0!important" }}>
            adres adres adres adsersf sdklflskf adres adres adres adsersf
            sdklflskf
          </Grid>
        </Grid>
      </Box>
      <Grid container>
        <Grid item xs={6}>
          <StyledDescription>
            Withdrawn 60TL from your accouunt
          </StyledDescription>
          <StyledDescription>
            fatura oluşturulma tarihi 15/04/2024-15.30.05
          </StyledDescription>
        </Grid>
        <Grid item xs={6} sx={{ paddingLeft: "3%" }}>
          <StyledDescription>
            REGARDS BEKA BANKIST ETHERNET BRANCH
          </StyledDescription>
        </Grid>
      </Grid>
    </StyledBox>
  );
}
