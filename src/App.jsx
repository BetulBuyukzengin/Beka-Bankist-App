import styled from "styled-components";
import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
import Navbar from "./Navbar/Navbar";
import GlobalStyles from "./styles/GlobalStyles";

const StyledMain = styled.main`
    height: 100vh;
    background-color: var(--color-background);
`;

function App() {
    return (
        <DarkModeProvider>
            <StyledMain>
                <GlobalStyles />
                <Navbar />
            </StyledMain>
        </DarkModeProvider>
    );
}

export default App;
