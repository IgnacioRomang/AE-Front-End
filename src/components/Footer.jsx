import { Chip, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useFooterString } from "../contexts/TextProvider.jsx";
import {
  Xl,
  containerChipsFooterStyle,
  containerChipsFooterStyleSm,
  footerPaperStyle,
  imgLogoProvStyle,
} from "../theme.jsx";

const EmailIcon = React.lazy(() => import("@mui/icons-material/Email"));
const PhoneIcon = React.lazy(() => import("@mui/icons-material/Phone"));
const PlaceIcon = React.lazy(() => import("@mui/icons-material/Place"));

/**
 * React functional component for the Footer component
 * @returns {JSX.Element} The footer component
 */
const Footer = () => {
  const [contact_info, assets] = useFooterString();

  const [hoveredChip, setHoveredChip] = React.useState(null);

  const handleMouseEnter = (chip) => {
    setHoveredChip(chip);
  };

  const handleMouseLeave = () => {
    setHoveredChip(null);
  };

  const handleSendMessage = (contactType) => {
    if (contactType === "email") {
      // Abre la aplicación de correo electrónico predeterminada
      window.open("mailto:" + contact_info.email);
    } else if (contactType === "phone") {
      // Abre la aplicación de teléfono
      window.open("tel:" + contact_info.phone);
    } else if (contactType === "address") {
      // Busca la dirección en Google Maps
      window.open(
        "https://www.google.com/maps/search/?api=1&query=" +
          contact_info.address
      );
    }
  };
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

        <Container sx={containerChipsFooterStyle}>
          <Chip
            icon={<PlaceIcon />}
            label={contact_info.address}
            onMouseEnter={() => handleMouseEnter("address")}
            onClick={() => handleSendMessage("address")}
            onMouseLeave={handleMouseLeave}
            style={{
              marginRight: "5px",
              backgroundColor:
                hoveredChip === "address" ? "lightblue" : "inherit",
            }}
          />
          <Chip
            icon={<PhoneIcon />}
            label={contact_info.phone}
            onMouseEnter={() => handleMouseEnter("phone")}
            onClick={() => handleSendMessage("phone")}
            onMouseLeave={handleMouseLeave}
            style={{
              marginRight: "5px",
              backgroundColor:
                hoveredChip === "phone" ? "lightblue" : "inherit",
            }}
          />
          <Chip
            icon={<EmailIcon />}
            label={contact_info.email}
            onMouseEnter={() => handleMouseEnter("email")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleSendMessage("email")}
            style={{
              marginRight: "5px",
              backgroundColor:
                hoveredChip === "email" ? "lightblue" : "inherit",
            }}
          />
        </Container>
      </Container>
      {/** Footer pantalla pequeña */}
      <Container>
        <Container sx={containerChipsFooterStyleSm}>
          <Chip
            icon={<PlaceIcon />}
            label={contact_info.address}
            onMouseEnter={() => handleMouseEnter("address")}
            onClick={() => handleSendMessage("address")}
            onMouseLeave={handleMouseLeave}
            style={{
              marginRight: "5px",
              backgroundColor:
                hoveredChip === "address" ? "lightblue" : "inherit",
            }}
          />
          <Chip
            icon={<PhoneIcon />}
            label={contact_info.phone}
            onMouseEnter={() => handleMouseEnter("phone")}
            onClick={() => handleSendMessage("phone")}
            onMouseLeave={handleMouseLeave}
            style={{
              marginRight: "5px",
              backgroundColor:
                hoveredChip === "phone" ? "lightblue" : "inherit",
            }}
          />
          <Chip
            icon={<EmailIcon />}
            label={contact_info.email}
            onClick={() => handleSendMessage("email")}
            onMouseEnter={() => handleMouseEnter("email")}
            onMouseLeave={handleMouseLeave}
            style={{
              marginRight: "5px",
              backgroundColor:
                hoveredChip === "email" ? "lightblue" : "inherit",
            }}
          />
        </Container>
      </Container>
    </Paper>
  );
};

export default Footer;
