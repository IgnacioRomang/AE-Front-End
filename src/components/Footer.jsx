import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import { Chip, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useFooterString } from "../contexts/TextProvider.jsx";
import {
  Xl,
  containerChipsFooterStyle,
  containerChipsFooterStyleSm,
  footerPaperStyle,
  imgLogoLoteStyle,
  imgLogoProvStyle,
} from "../theme.jsx";
/**
 * React functional component for the Footer component
 * @returns {JSX.Element} The footer component
 */
const Footer = () => {
  const [contact_info, assets] = useFooterString();
  return (
    <Paper elevation={2} sx={footerPaperStyle}>
      <Container sx={Xl}>
        <img
          src={assets.imgProv.src}
          loading="lazy"
          alt=""
          href={assets.imgProv.href}
          style={imgLogoProvStyle}
        />
        <img
          src={assets.imgLotes.src}
          loading="lazy"
          alt="" //todo alt
          href={assets.imgLotes.href}
          style={imgLogoLoteStyle}
        />
        <Container sx={containerChipsFooterStyle}>
          <Chip icon={<PlaceIcon />} label={contact_info.address} />
          <Chip icon={<PhoneIcon />} label={contact_info.phone} />
          <Chip icon={<EmailIcon />} label={contact_info.email} />
        </Container>
      </Container>
      {/** Footer pantalla pequeña */}
      <Container>
        <Container sx={containerChipsFooterStyleSm}>
          <Chip icon={<PlaceIcon />} label={contact_info.address} />
          <Chip icon={<PhoneIcon />} label={contact_info.phone} />
          <Chip icon={<EmailIcon />} label={contact_info.email} />
        </Container>
      </Container>
    </Paper>
  );
};

export default Footer;
