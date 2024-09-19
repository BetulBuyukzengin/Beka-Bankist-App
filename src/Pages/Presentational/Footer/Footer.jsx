import { Grid } from "@mui/material";
import styled from "styled-components";
import FooterTitle from "../../../Components/FooterTitle/FooterTitle";
import FooterList from "./FooterList";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import {
  media31_25em,
  media48em,
  media84_37em,
} from "../../../Constants/constants";

const StyledButton = styled.button`
  color: var(--color-text);
  background-color: var(--color-secondary);
  padding: 0.4rem 1rem;
  margin: 0.3rem;
  border-radius: 2px;
  border: none;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const StyledFooter = styled.footer`
  background-color: var(--color-background);
  width: 100%;
  padding: 2rem 3rem;

  ${media48em} {
    padding: 1rem 2rem;
  }
`;
const StyledParagraphy = styled.p`
  color: var(--color-text);
  font-size: 14px;
  ${media48em} {
    font-size: 0.8rem;
  }
  ${media31_25em} {
    font-size: 0.7rem;
  }
`;
const StyledCopyright = styled.p`
  display: flex;
  color: var(--color-text);
  font-size: 13px;
  ${media48em} {
    font-size: 0.8rem;
  }
  ${media31_25em} {
    font-size: 0.7rem;
  }
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
// const quickLinks = [
//   "Home",
//   "About Us",

//   "Services",
//   "Testimonials",
//   "Contact Us",
// ];

//? ----------------------objeler dizisine dönüştür, href ekle-----------------------quick listede yap
const socialIcons = [
  <InstagramIcon key="instagram" />,
  <XIcon key="x" />,
  <FacebookIcon key="facebook" />,
  <LinkedInIcon key="linkedin" />,
];

function Footer() {
  return (
    <StyledFooter>
      <Grid
        container
        sx={{
          [media84_37em]: {
            justifyContent: "center",
          },
        }}
      >
        <StyledGrid item xs={12} sm={3}>
          <FooterTitle>Follow Us</FooterTitle>
          <FooterList direction="row" data={socialIcons} />
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
