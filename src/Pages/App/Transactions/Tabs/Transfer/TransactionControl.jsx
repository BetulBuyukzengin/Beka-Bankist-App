import { styled as styledMui } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
const Item = styledMui(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const StyledBox = styled(Box)`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.8rem;
`;
const StyledGrid = styled(Grid)`
  border: 1px solid var(--color-border);
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column !important;
  margin: 0.5rem !important;
  padding-left: 0 !important;
  padding-top: 0 !important;
  padding: 1rem !important;
`;
const StyledLabel = styled.label`
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
const StyledItem = styled(Item)`
  width: 100%;
`;
export default function TransactionControl() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          width: "50%",
          justifyContent: "center",
        }}
      >
        <StyledGrid item xs={8}>
          <StyledItem>Alıcı Hesap</StyledItem>
          <StyledBox>
            <h6>Kadir Karabacak</h6>
            <div>Ziraat Bankası</div>
            <div>TR93840923840928</div>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Gönderen Hesap</StyledItem>
          <StyledBox>
            <h6>Meram-501</h6>
            <div>
              <label>Bakiye:</label>
              <label>125</label>
            </div>
          </StyledBox>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Tutar</StyledItem>
          <StyledLabel>10,00 TL</StyledLabel>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Para Gönderim Tipi</StyledItem>
          <StyledLabel>İş yeri kirası</StyledLabel>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Açıklama</StyledItem>
          <StyledLabel></StyledLabel>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>Para Transfer ücreti</StyledItem>
          <StyledLabel>2,00TL</StyledLabel>
        </StyledGrid>
        <StyledGrid item xs={8}>
          <StyledItem>İşlem Tarihi</StyledItem>
          <StyledLabel>30/05/2024</StyledLabel>
        </StyledGrid>
      </Grid>
    </Box>
  );
}
