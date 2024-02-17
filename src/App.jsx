import styled from "styled-components";
import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
import Navbar from "./Navbar/Navbar";
import GlobalStyles from "./styles/GlobalStyles";

const StyledMain = styled.main`
    height: 100vh;
    background-color: var(--color-background);
`;

import Home from "./Components/Home/Home";
function App() {
    return (
        <DarkModeProvider>
            <StyledMain>
                <GlobalStyles />
                <Navbar />
            </StyledMain>
        </DarkModeProvider>
    );
    return (
        <>
            <Home />
        </>
    );
}

export default App;
