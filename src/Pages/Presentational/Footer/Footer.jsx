import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { Grid } from "@mui/material";
import styled from "styled-components";
import FooterTitle from "../../../Components/FooterTitle/FooterTitle";
import FooterList from "./FooterList";

import Divider from "@mui/material/Divider";
import {
  media31_25em,
  media48em,
  media62_5em,
  media84_37em,
} from "../../../Constants/constants";
import { composeInitialProps } from "react-i18next";

const StyledFooter = styled.footer`
  background-color: var(--color-background);
  width: 100%;
  padding: 2rem 3rem;
  ${media84_37em} {
    padding: 2rem;
  }
  ${media62_5em} {
    padding: 1.5rem;
  }
  ${media48em} {
    padding: 1rem;
  }
  ${media31_25em} {
    padding: 0.6rem;
  }
`;

const StyledCopyright = styled.p`
  display: flex;
  color: var(--color-text);

  font-size: 1.5rem;

  ${media84_37em} {
    font-size: 1.1rem;
  }
  ${media62_5em} {
    font-size: 1rem;
  }
  ${media48em} {
    font-size: 0.9rem;
  }
  /* ${media31_25em} {
    font-size: 0.9rem;
  } */
`;
const StyledGrid = styled(Grid)`
  align-items: center;
  display: flex;
  flex-direction: column !important;
  ${media48em} {
    /* flex-direction: column !important; */
    padding-left: 0;
    padding-top: 10px;
  }
`;

//? ----------------------objeler dizisine dönüştür, href ekle-----------------------quick listede yap
// const socialIcons = [

//   <InstagramIcon key="instagram" />,
//   <XIcon key="x" />,
//   <FacebookIcon key="facebook" />,
//   <LinkedInIcon key="linkedin" />,
// ];

const socialMediaObjects = [
  {
    component: <InstagramIcon key="instagram" />,
    href: "https://www.instagram.com/",
  },
  {
    component: <XIcon key="x" />,
    href: "https://www.instagram.com",
  },
  {
    component: <FacebookIcon key="facebook" />,
    href: "https://www.facebook.com",
  },
  {
    component: <LinkedInIcon key="linkedin" />,
    href: "https://www.linkedin.com",
  },
];
function Footer() {
  return (
    <StyledFooter>
      <Grid
        container
        sx={{
          justifyContent: "center",
        }}
      >
        <StyledGrid item xs={12} sm={3}>
          <FooterTitle>Follow Us</FooterTitle>
          <FooterList direction="row" data={socialMediaObjects} />
        </StyledGrid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <StyledCopyright>
            Copyright © 2024 All rights reserved.
          </StyledCopyright>
        </Grid>
      </Grid>
    </StyledFooter>
  );
}

export default Footer;
