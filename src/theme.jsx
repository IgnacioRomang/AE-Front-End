import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  spacing: [0, 2, 4, 9, 15, 20, 30],
});

// Constantes de estilo comunes
const displayXl = {
  xs: "none",
  md: "none",
  lg: "flex",
};

const displaySm = {
  xs: "column",
  md: "column",
  lg: "none",
};

const displaySm2 = {
  xs: "flex",
  md: "flex",
  lg: "none",
};

export const centeringStyles = {
  alignItems: "center",
  justifyContent: "center",
};

export const textJustifyStyle = {
  textAlign: "justify",
};

const spacingStyles = (multiplier) => ({
  margin: theme.spacing(multiplier),
});

// Estilos generales
export const Xl = { display: displayXl };
export const Sm = { display: displaySm };
export const Sm2 = { display: displaySm2 };

// Estilos del footer
export const imgLogoProvStyle = {
  padding: "25px",
  maxWidtn: "50px",
  height: "50px",
  marginRight: "8px",
};

export const imgLogoLoteStyle = {
  padding: "15px",
  maxWidtn: "70px",
  height: "70px",
  marginRight: "8px",
};

export const imgLogoStyle = {
  padding: "25px",
  maxWidtn: "50px",
  height: "50px",
  marginRight: "8px",
};

export const containerChipsFooterStyle = {
  ...centeringStyles,
  flexWrap: "wrap",
  "& > *": {
    ...spacingStyles(6),
  },
  ...Xl,
};

export const containerChipsFooterStyleSm = {
  ...centeringStyles,
  flexWrap: "wrap",
  "& > *": {
    ...spacingStyles(6),
  },
  ...Sm,
};

export const footerPaperStyle = {
  position: "relative",
  bottom: 0,
  height: "15vh",
  width: "100%",
};

export const infoCArdStyle = {
  width: "100%",
  "@media (max-width: 600px)": {
    width: "100vw",
    maxWidth: "90vw",
    maxHeight: "30vh",
  },
  "@media (min-width: 601px) and (max-width: 960px)": {
    maxWidth: "90vw",
    maxHeight: "30vh",
  },
  "@media (min-width: 961px) and (max-width: 1280px)": {
    maxWidth: "25vw",
    maxHeight: "75vh",
  },
  "@media (min-width: 1281px) and (max-width: 1920px)": {
    maxWidth: "25vw",
    maxHeight: "60vh",
  },
  "@media (min-width: 1921px)": {
    maxWidth: "70vw",
    maxHeight: "60vh",
  },
};

export const cardLoginStyle = {
  width: "50vw", // Altura por defecto
  "@media (max-width: 600px)": {
    width: "100vw", // Altura para tamaños pequeños de pantalla (xs)
  },
  "@media (min-width: 601px) and (max-width: 960px)": {
    width: "100vw", // Altura para tamaños medianos de pantalla (sm)
  },
  "@media (min-width: 961px) and (max-width: 1280px)": {
    width: "35vw", // Altura para tamaños grandes de pantalla (md),
  },
  "@media (min-width: 1281px) and (max-width: 1920px)": {
    width: "30vw", // Altura para tamaños extra grandes de pantalla (lg)
  },
  "@media (min-width: 1921px)": {
    width: "25vw", // Altura para tamaños muy grandes de pantalla (xl)
  },
};

export const backdropLoginStyle = {
  color: "#ffff",
  zIndex: (theme) => theme.zIndex.drawer + 1,
};
export const centerButtonsStyle = {
  justifyContent: "space-between",
};

// Estilos de los enlaces
export const linksStyle = {
  pointerEvents: "none",
  color: grey[400],
};

// Estilos de la tarjeta de registro
export const cardRegisterStyle = {
  width: "50vw", // Altura por defecto
  "@media (max-width: 600px)": {
    width: "100vw", // Altura para tamaños pequeños de pantalla (xs)
  },
  "@media (min-width: 601px) and (max-width: 960px)": {
    width: "100vw", // Altura para tamaños medianos de pantalla (sm)
  },
  "@media (min-width: 961px) and (max-width: 1280px)": {
    width: "50vw", // Altura para tamaños grandes de pantalla (md)
  },
  "@media (min-width: 1281px) and (max-width: 1920px)": {
    width: "50vw", // Altura para tamaños extra grandes de pantalla (lg)
  },
  "@media (min-width: 1921px)": {
    width: "45vw", // Altura para tamaños muy grandes de pantalla (xl)
  },
};

export const containerPersonalInfoStyle = {
  ...centeringStyles,
  flexWrap: "wrap",
  "& > *": {
    ...spacingStyles(4),
  },
  ...Sm,
};

// Estilos de la barra superior
export const logoTopStyle = {
  maxWidtn: "50px",
  height: "50px",
  transform: "scale(1)",
  marginRight: "8px",
};

export const buttonTopStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

export const iconButtonTopStyle = {
  size: "large",
  "aria-label": "account of current user",
  "aria-controls": "menu-appbar",
  "aria-haspopup": "true",
  color: "inherit",
};

export const boxXLmenu = {
  ...centeringStyles,
  ...Xl,
};

export const boxSMmenu = {
  ...centeringStyles,
  ...Sm2,
};
export const transformMOnted = {
  keepMounted: true,
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
};

export const menuStyles = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  ...transformMOnted,
};

export const menuStylesIcon = {
  anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  },
  mt: "5px",
  edge: "end",
  ...transformMOnted,
};
// RegisterCard
export const finalboxStyle = {
  display: "flex",
  flexDirection: "row",
  pt: 2,
};
export const boxbottonsSteppStyle = {
  display: "flex",
  flexDirection: "row",
  pt: 2,
};

export const stepStyle = {
  "& .MuiStepLabel-root .Mui-completed": {
    color: "success.main", // circle color (COMPLETED)
  },
  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
    color: "grey.600", // Just text label (COMPLETED)
  },
  "& .MuiStepLabel-root .Mui-active": {
    color: "primary", // circle color (ACTIVE)
  },
  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
    color: "primary", // Just text label (ACTIVE)
  },
  "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
    fill: "primary", // circle's number (ACTIVE)
  },
};

// Userbadge
export const boxUserbadgeStyle = {
  display: "flex",
  alignItems: "center",
  paddingTop: 5,
};
export const badgeUserAnchorStyle = {
  vertical: "bottom",
  horizontal: "right",
};
//successAE
export const superCenter = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  ...centeringStyles,
};
export const boxSuccessAESyle = {
  padding: 2,
  ...superCenter,
};
// errorAE

export const boxErrorAESyle = { ...boxSuccessAESyle, padding: "50px" };
export const boxUnRegisterLogSyle = boxSuccessAESyle;
export const boxLoginSyle = superCenter;
// Profile
export const gridProfileStyle = {
  ...centeringStyles,
  width: "50vw", // Altura por defecto

  // Ajusta la altura para tamaños de pantalla específicos
  "@media (max-width: 600px)": {
    width: "90vw", // Altura para tamaños pequeños de pantalla (xs)
  },

  "@media (min-width: 601px) and (max-width: 960px)": {
    width: "10vw", // Altura para tamaños medianos de pantalla (sm)
  },

  "@media (min-width: 961px) and (max-width: 1280px)": {
    width: "10vw", // Altura para tamaños grandes de pantalla (md)
  },

  "@media (min-width: 1281px) and (max-width: 1920px)": {
    // pantalla 1080
    width: "10vw", // Altura para tamaños extra grandes de pantalla (lg)
  },

  "@media (min-width: 1921px)": {
    width: "55vw", // Altura para tamaños muy grandes de pantalla (xl)
  },
  // Otros estilos personalizados si es necesario
};
export const gridProfileInfoStyle = {
  width: "50vw", // Altura por defecto

  // Ajusta la altura para tamaños de pantalla específicos
  "@media (max-width: 600px)": {
    width: "80vw", // Altura para tamaños pequeños de pantalla (xs)
  },

  "@media (min-width: 601px) and (max-width: 960px)": {
    width: "30vw", // Altura para tamaños medianos de pantalla (sm)
  },

  "@media (min-width: 961px) and (max-width: 1280px)": {
    width: "20vw", // Altura para tamaños grandes de pantalla (md)
  },

  "@media (min-width: 1281px) and (max-width: 1920px)": {
    // pantalla 1080
    width: "20vw", // Altura para tamaños extra grandes de pantalla (lg)
  },

  "@media (min-width: 1921px)": {
    width: "25vw", // Altura para tamaños muy grandes de pantalla (xl)
  },
  // Otros estilos personalizados si es necesario
};
// AddressDataCArd fragment
// Exportar todas las constantes
export default {
  Xl,
  Sm,
  imgLogoStyle,
  containerChipsFooterStyle,
  containerChipsFooterStyleSm,
  footerPaperStyle,
  cardLoginStyle,
  backdropLoginStyle,
  linksStyle,
  cardRegisterStyle,
  containerPersonalInfoStyle,
  logoTopStyle,
  buttonTopStyle,
  iconButtonTopStyle,
  menuStyles,
  centeringStyles,
  centerButtonsStyle,
  finalboxStyle,
  boxbottonsSteppStyle,
  stepStyle,
  boxUserbadgeStyle,
  textJustifyStyle,
  badgeUserAnchorStyle,
  boxUnRegisterLogSyle,
  boxErrorAESyle,
  superCenter,
  gridProfileInfoStyle,
};
