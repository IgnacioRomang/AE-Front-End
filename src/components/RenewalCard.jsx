import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import {
  useCommonsString,
  useRegisterCardString,
  useRenewalCardString,
} from "../contexts/TextProvider.jsx";
import ErrorAE from "../fragments/ErrorFragment.jsx";
import SuccessAE from "../fragments/SuccessFragment.jsx";
import {
  AddressDataCard,
  ExtraDataCard,
  FileAttachCard,
  InfoDataCard,
} from "../fragments/form";

import AlertFragment from "../fragments/AlertFragmet.jsx";
import { cardRegisterStyle, centerBottonsStyle } from "../theme.jsx";
import { useAuth } from "../contexts/AuthContext.js";

const RenewalCard = () => {
  const [registerSend, setRegisterSend] = useState(false);
  const labels = useRegisterCardString();
  const commonlabels = useCommonsString();
  const renewalstring = useRenewalCardString();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = React.useState("null");
  const { User } = useAuth();
  const [stepData, setStepData] = useState([
    {
      name: User.name,
      lastName: User.lastname,
      formattedCUIL: User.cuil,
      selectedBirthdate: User.birthdate,
      selectedGender: User.gender,
    },
    {
      address: User.address.street,
      floor: User.address.floor,
      apartment: User.address.apartment,
      state: User.address.state,
      city: User.address.city,
      postalCode: User.address.postalCode,
    },
    {
      occupation: User.occupation,
      study: User.study,
      phone: User.phone,
      email: User.email,
    },
    { files: [] },
  ]);
  const infoDataCardRef = React.useRef(null);
  const addressDataCardRef = React.useRef(null);
  const extraDataCardRef = React.useRef(null);
  const fileAttachCardRef = React.useRef(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSend = () => {
    setRegisterSend(true);
    //TODO SEND
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card sx={cardRegisterStyle}>
        <CardHeader
          avatar={<HowToRegIcon />}
          titleTypographyProps={{ variant: "h6" }}
          title={renewalstring.mainTitle}
        />
        <CardContent>
          {open ? (
            <>{!error ? <SuccessAE first={false} /> : <ErrorAE />}</>
          ) : (
            <>
              <AlertFragment
                type={"info"}
                title={renewalstring.info.title}
                body={renewalstring.info.body}
              />
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography variant="h7" color={grey[600]} component="div">
                    {labels.titles[0]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <InfoDataCard
                    name={stepData[0].name}
                    lastName={stepData[0].lastName}
                    cuil={stepData[0].formattedCUIL}
                    regregisterStateister={false}
                    birthdate={stepData[0].selectedBirthdate}
                    gender={stepData[0].selectedGender}
                    ref={infoDataCardRef}
                  />
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
                  <Typography variant="h7" color={grey[600]} component="div">
                    {labels.titles[1]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <AddressDataCard
                    address={stepData[1].address}
                    floor={stepData[1].floor}
                    apartment={stepData[1].apartment}
                    province={stepData[1].state}
                    city={stepData[1].city}
                    postalCode={stepData[1].postalCode}
                    ref={addressDataCardRef}
                  />
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
                  <Typography variant="h7" color={grey[600]} component="div">
                    {labels.titles[2]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ExtraDataCard
                    occupation={stepData[2].occupation}
                    study={stepData[2].study}
                    phone={stepData[2].phone}
                    email={stepData[2].email}
                    ref={extraDataCardRef}
                  />
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
                  <Typography variant="h7" color={grey[600]} component="div">
                    {labels.titles[3]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FileAttachCard
                    ref={fileAttachCardRef}
                    files={stepData[3].files}
                  />
                </AccordionDetails>
              </Accordion>
            </>
          )}
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
