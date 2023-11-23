import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {
    Accordion, AccordionDetails,
    AccordionSummary, Alert,
    AlertTitle, Button,
    Card,
    CardActions, CardContent, CardHeader,
    Typography
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import {
    useCommonsString, useRegisterCardString, useRenewalCardString
} from "../contexts/TextProvider.jsx";
import ErrorAE from "../fragments/ErrorAE.jsx";
import SuccessAE from "../fragments/SuccessAE.jsx";
import { AddressDataCard, ExtraDataCard, FileAttachCard, InfoDataCard } from "../fragments/form";

import { cardRegisterStyle, centerBottonsStyle } from "../theme.jsx";

const RenewalCard = () => {
    const [registerSend, setRegisterSend] = useState(false);
    const labels = useRegisterCardString();
    const commonlabels = useCommonsString();
    const renewalstring = useRenewalCardString();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [expanded, setExpanded] = React.useState("null");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleSend = () => {
        setRegisterSend(true);
        setOpen(!open)
    };


    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Card style={cardRegisterStyle}>
                <CardHeader
                    avatar={<HowToRegIcon />}
                    titleTypographyProps={{ variant: "h6" }}
                    title={renewalstring.mainTitle}
                />
                <CardContent>
                    {open ? <>
                        {(!error) ? <SuccessAE first={false} /> : <ErrorAE />}
                    </> :
                        <>
                            <Alert severity="info">
                                <AlertTitle>{renewalstring.info.title}</AlertTitle>
                                <Typography>{renewalstring.info.body[0]}</Typography>
                                <Typography>{renewalstring.info.body[1]}</Typography>
                                <Typography>{renewalstring.info.body[2]}</Typography>
                            </Alert>

                            <Accordion
                                expanded={expanded === "panel1"}
                                onChange={handleChange("panel1")}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1d-content"
                                    id="panel1d-header"
                                >
                                    <Typography
                                        variant="h7"
                                        color={grey[600]}
                                        component="div"
                                    >
                                        {labels.titles[0]}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <InfoDataCard />
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                expanded={expanded === "panel2"}
                                onChange={handleChange("panel2")}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2d-content"
                                    id="panel2d-header"
                                >
                                    <Typography
                                        variant="h7"
                                        color={grey[600]}
                                        component="div"
                                    >
                                        {labels.titles[1]}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <AddressDataCard />
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                expanded={expanded === "panel3"}
                                onChange={handleChange("panel3")}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3d-content"
                                    id="panel3d-header"
                                >
                                    <Typography
                                        variant="h7"
                                        color={grey[600]}
                                        component="div"
                                    >
                                        {labels.titles[2]}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ExtraDataCard />
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                expanded={expanded === "panel5"}
                                onChange={handleChange("panel5")}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3d-content"
                                    id="panel5d-header"
                                >
                                    <Typography
                                        variant="h7"
                                        color={grey[600]}
                                        component="div"
                                    >
                                        {labels.titles[3]}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FileAttachCard />
                                </AccordionDetails>
                            </Accordion>
                        </>

                    }


                </CardContent>

                <CardActions sx={centerBottonsStyle}>
                    <Button size="small" color="inherit">
                        {commonlabels.button.cancel}
                    </Button>
                    <Button size="small" onClick={handleSend}>
                        {commonlabels.button.ok}
                    </Button>
                </CardActions>

            </Card>
        </>
    );
};

export default RenewalCard;
