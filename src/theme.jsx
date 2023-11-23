import { createTheme } from "@mui/material/styles";
import { cyan, grey } from "@mui/material/colors";

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
        ...spacingStyles(5),
    },
    ...Sm,
};

export const footerPaperStyle = {
    position: "relative",
    marginTop: "calc(10% + 60px)",
    bottom: 0,
    width: "100%",
};

// Estilos del login
export const cardLoginStyle = {
    maxWidth: 450,
};

export const backdropLoginStyle = {
    color: "#fff",
    zIndex: (theme) => theme.zIndex.drawer + 1,
};
export const centerBottonsStyle = {
    justifyContent: "space-between",
};

// Estilos de los enlaces
export const linksStyle = {
    pointerEvents: "none",
    color: grey[400],
};

// Estilos de la tarjeta de registro
export const cardRegisterStyle = {
    maxWidth: 800,
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
    ...spacingStyles(2),
    color: "white",
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

export const menuStyles = {
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
    },
    keepMounted: true,
    transformOrigin: {
        vertical: "top",
        horizontal: "left",
    },
};
// RegisterCard
export const finalboxStyle = {
    display: "flex",
    flexDirection: "row",
    pt: 2
}
export const boxbottonsSteppStyle = {
    display: "flex",
    flexDirection: "row",
    pt: 2,
}

export const stepStyle = {
    '& .MuiStepLabel-root .Mui-completed': {
        color: 'success.main', // circle color (COMPLETED)
    },
    '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
    {
        color: 'grey.600', // Just text label (COMPLETED)
    },
    '& .MuiStepLabel-root .Mui-active': {
        color: 'primary', // circle color (ACTIVE)
    },
    '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
    {
        color: 'primary', // Just text label (ACTIVE)
    },
    '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
        fill: 'primary', // circle's number (ACTIVE)
    },
}
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
    centerBottonsStyle,
    finalboxStyle,
    boxbottonsSteppStyle,
    stepStyle
};
