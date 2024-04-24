import { NavigateNext } from "@mui/icons-material";
import { Grid } from "@mui/material";
import styled from "styled-components";

const StyledAccountButton = styled.button`
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  color: var(--color-text);
  width: 35%;
  padding: 1.5rem 2rem;
  border: 1px solid var(--color-border-2);
  cursor: pointer;
`;
function SenderAccount() {
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        // component="button"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <StyledAccountButton>
          <div>
            <h5>Meram-500</h5>
            <label>Kullanılabilir bakiye:</label>
            <label>500</label>
          </div>
          <div>
            <NavigateNext />
          </div>
        </StyledAccountButton>
      </Grid>
      <Grid
        item
        xs={12}
        // component="button"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <StyledAccountButton>
          <div>
            <h5>Meram-500</h5>
            <label>Kullanılabilir bakiye:</label>
            <label>500</label>
          </div>
          <div>
            <NavigateNext />
          </div>
        </StyledAccountButton>
      </Grid>
    </Grid>
  );
}

export default SenderAccount;
