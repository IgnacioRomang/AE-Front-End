import { Chip, Paper, useTheme } from "@mui/material";
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

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import { isMobileDevice } from "../utiles.js";

/**
 * React functional component for the Footer component
 * @returns {JSX.Element} The footer component
 */
const RootFooter = () => {
  const theme = useTheme();
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
      if (isMobileDevice()) {
        // Si es un dispositivo móvil, abrir la aplicación de teléfono
        window.open("tel:" + contact_info.phone);
      } else {
        // Si es un escritorio, abrir WhatsApp
        window.open(
          "https://web.whatsapp.com/send?phone=" + contact_info.phone
        );
      }
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
            icon={
              <PlaceIcon
                style={{
                  color: hoveredChip === "address" ? "#ffffff" : "inherit",
                }}
              />
            }
            label={contact_info.address}
            onMouseEnter={() => handleMouseEnter("address")}
            onClick={() => handleSendMessage("address")}
            onMouseLeave={handleMouseLeave}
            style={{
              marginRight: "5px",
              backgroundColor:
                hoveredChip === "address"
                  ? theme.palette.primary.main
                  : "inherit",
              color: hoveredChip === "address" ? "#ffffff" : "inherit",
            }}
          />
          <Chip
            icon={
              <PhoneIcon
                style={{
                  color: hoveredChip === "phone" ? "#ffffff" : "inherit",
                }}
              />
            }
            label={contact_info.phone}
            onMouseEnter={() => handleMouseEnter("phone")}
            onClick={() => handleSendMessage("phone")}
            onMouseLeave={handleMouseLeave}
            style={{
              marginRight: "5px",
              backgroundColor:
                hoveredChip === "phone"
                  ? theme.palette.primary.main
                  : "inherit",
              color: hoveredChip === "phone" ? "#ffffff" : "inherit",
            }}
          />
          <Chip
            icon={
              <EmailIcon
                style={{
                  color: hoveredChip === "email" ? "#ffffff" : "inherit",
                }}
              />
            }
            label={contact_info.email}
            onMouseEnter={() => handleMouseEnter("email")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleSendMessage("email")}
            style={{
              marginRight: "5px",
              backgroundColor:
                hoveredChip === "email"
                  ? theme.palette.primary.main
                  : "inherit",
              color: hoveredChip === "email" ? "#ffffff" : "inherit",
            }}
          />
        </Container>
      </Container>
      {/** Footer pantalla pequeña */}
      <Container>
        <Container sx={containerChipsFooterStyleSm}>
          <Chip
            icon={
              <PlaceIcon
                style={{
                  color: hoveredChip === "address" ? "#ffffff" : "inherit",
                }}
              />
            }
            label={contact_info.address}
            onMouseEnter={() => handleMouseEnter("address")}
            onClick={() => handleSendMessage("address")}
            onMouseLeave={handleMouseLeave}
            style={{
              marginRight: "5px",
              backgroundColor:
                hoveredChip === "address"
                  ? theme.palette.primary.main
                  : "inherit",
              color: hoveredChip === "address" ? "#ffffff" : "inherit",
            }}
          />
          <Chip
            icon={
              <PhoneIcon
                style={{
                  color: hoveredChip === "phone" ? "#ffffff" : "inherit",
                }}
              />
            }
            label={contact_info.phone}
            onMouseEnter={() => handleMouseEnter("phone")}
            onClick={() => handleSendMessage("phone")}
            onMouseLeave={handleMouseLeave}
            style={{
              marginRight: "5px",
              backgroundColor:
                hoveredChip === "phone"
                  ? theme.palette.primary.main
                  : "inherit",
              color: hoveredChip === "phone" ? "#ffffff" : "inherit",
            }}
          />
          <Chip
            icon={
              <EmailIcon
                style={{
                  color: hoveredChip === "email" ? "#ffffff" : "inherit",
                }}
              />
            }
            label={contact_info.email}
            onClick={() => handleSendMessage("email")}
            onMouseEnter={() => handleMouseEnter("email")}
            onMouseLeave={handleMouseLeave}
            style={{
              marginRight: "5px",
              backgroundColor:
                hoveredChip === "email"
                  ? theme.palette.primary.main
                  : "inherit",
              color: hoveredChip === "email" ? "#ffffff" : "inherit",
            }}
          />
        </Container>
      </Container>
    </Paper>
  );
};

export default RootFooter;
