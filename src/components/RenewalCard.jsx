import React, { useState, Suspense } from "react";
import {
  useCommonsString,
  useRegisterCardString,
  useRenewalCardString,
} from "../contexts/TextProvider.jsx";

import { ExpandMore, HowToReg } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Button,
  Card,
  CircularProgress,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext.js";
import { cardRegisterStyle, centerButtonsStyle } from "../theme.jsx";
import { formatDate } from "../utiles.js";

const InfoDataCard = React.lazy(() => import("../fragments/form/InfoDataCard"));
const AddressDataCard = React.lazy(() =>
  import("../fragments/form/AddressDataCard")
);
const ExtraDataCard = React.lazy(() =>
  import("../fragments/form/ExtraDataCard")
);
const FileAttachCard = React.lazy(() =>
  import("../fragments/form/FileAttachCard")
);
const SuccessAE = React.lazy(() => import("../fragments/SuccessFragment"));
const ErrorAE = React.lazy(() => import("../fragments/ErrorFragment"));

const sx = {
  border: `1px solid #999999`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
};
const sx_summ = { background: "rgba(0, 0, 0, .03)" };

const sx_de = {
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  alignItems: "justify",
  justifyContent: "justify",
  textAlign: "justify",
};
/**fs
 * @brief This component is a form for registering a new user.
 *
 * @param {object} props The properties of the component.
 * @return {JSX.Element} The component.
 */
const RenewalCard = (props) => {
  const labels = useRegisterCardString();
  const commonlabels = useCommonsString();
  const renewalstring = useRenewalCardString();

  const [expanded, setExpanded] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [errorSend, setSendError] = React.useState(false);
  const [stepData, setStepData] = React.useState([
    {
      name: "",
      lastName: "",
      formattedCUIL: "",
      selectedBirthdate: "",
      selectedGender: -1,
    },
    {
      address: "",
      floor: "",
      apartment: "",
      state: "",
      city: "",
      postalCode: "",
    },
    {
      occupation: "NC",
      study: "NC",
      phone: "",
      email: "",
    },
    { files: [] },
  ]);

  const refs = React.useRef(null);
  const { User, fetch_user_data, start_ae_n } = useService();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (User === null) {
      navigate("/");
    }
    fetch_user_data().then((response) => {
      let user_data = response.data;
      if (response.data !== null) {
        //console.log(user_data);
        setStepData([
          {
            name: user_data.name,
            lastName: user_data.lastname,
            formattedCUIL: user_data.cuil,
            selectedBirthdate: user_data.birthdate,
            selectedGender: user_data.gender,
          },
          {
            address:
              user_data.address + ", " + user_data.nro_address.toString(),
            floor: user_data.floor,
            apartment: user_data.apartment,
            state: user_data.state,
            city: user_data.city,
            postalCode: user_data.postalCode,
          },
          {
            occupation: user_data.occupation,
            study: user_data.study,
            phone: user_data.phone,
            email: user_data.email,
          },
          { files: [] },
        ]);
      }
    });
  }, [User, navigate, setStepData, fetch_user_data]);

  /**
   * @brief This function is called when the user expands or collapses an accordion panel.
   *
   * @param {string} panel The name of the accordion panel that was expanded or collapsed.
   */
  const handleChange = (panel) => (event, newExpanded) => {
    if (expanded === "") {
      setExpanded(newExpanded ? panel : false);
    } else {
      let ref = refs.current;
      if (!ref.handleErrors()) {
        if (expanded !== panel) {
          setExpanded(newExpanded ? panel : false);
        } else {
          setExpanded("");
        }
      }
    }
  };

  const handleRegister = async () => {
    try {
      let register_user = {
        firstname: stepData[0].name,
        lastname: stepData[0].lastName,
        birthdate: formatDate(new Date(stepData[0].selectedBirthdate)),
        gender: stepData[0].selectedGender,
        address: stepData[1].address.split(", ")[0],
        address_number: stepData[1].address.split(", ")[1],
        floor: stepData[1].floor,
        apartment: stepData[1].apartment,
        postalcode: stepData[1].postalCode,
        city: stepData[1].city,
        state: stepData[1].state,
        phone: stepData[2].phone,
        startdate: formatDate(new Date()),
        occupation: stepData[2].occupation,
        study: stepData[2].study,
      };
      let result = await start_ae_n(register_user);
      setSendError(!result);
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * @brief This function is called when the user clicks the "Submit" button.
   */
  const handleSend = () => {
    setSendError(true);
    let ref = refs.current;
    let data_error = false;
    if (ref !== null) {
      data_error = ref.handleErrors();
    }
    if (!data_error) {
      handleRegister();
      setOpen(true);
    }
    //setSendError(false);
    //TODO SEND
  };

  /**
   * @brief This function is called when the user clicks the "Cancel" button.
   */
  const handleClose = () => {
    navigate("/user/profile");
  };

  const handleBack = () => {
    if (open) {
      setOpen(false);
    } else {
      navigate(-1);
    }
  };
  return (
    <Suspense
      fallback={
        <CardContent style={{ textAlign: "center" }}>
          <CircularProgress />
        </CardContent>
      }
    >
      <Card sx={cardRegisterStyle}>
        <CardHeader
          avatar={<HowToReg />}
          titleTypographyProps={{ variant: "h6" }}
          title={renewalstring.mainTitle}
        />
        <CardContent>
          {open ? (
            <>{!errorSend ? <SuccessAE first={false} /> : <ErrorAE />}</>
          ) : (
            <>
              <Alert severity={"info"}>
                <AlertTitle>{renewalstring.info.title}</AlertTitle>
                {renewalstring.info.body.map((line) => (
                  <>
                    <Typography>{line}</Typography>
                  </>
                ))}
              </Alert>

              <Accordion
                sx={sx}
                expanded={expanded === 0}
                onChange={handleChange(0)}
              >
                <AccordionSummary
                  sx={sx_summ}
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography variant="h7" color={grey[600]} component="div">
                    {labels.titles[0]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={sx_de}>
                  {expanded === 0 && (
                    <InfoDataCard
                      name={stepData[0].name}
                      lastName={stepData[0].lastName}
                      cuil={stepData[0].formattedCUIL}
                      birthdate={stepData[0].selectedBirthdate}
                      gender={stepData[0].selectedGender}
                      ref={refs}
                      registerState={false}
                    />
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion
                sx={sx}
                expanded={expanded === 1}
                onChange={handleChange(1)}
              >
                <AccordionSummary
                  sx={sx_summ}
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography variant="h7" color={grey[600]} component="div">
                    {labels.titles[1]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={sx_de}>
                  {expanded === 1 && (
                    <AddressDataCard
                      address={stepData[1].address}
                      floor={stepData[1].floor}
                      apartment={stepData[1].apartment}
                      province={stepData[1].state}
                      city={stepData[1].city}
                      postalCode={stepData[1].postalCode}
                      ref={refs}
                    />
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === 2}
                onChange={handleChange(2)}
                sx={sx}
              >
                <AccordionSummary
                  sx={sx_summ}
                  expandIcon={<ExpandMore />}
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <Typography variant="h7" color={grey[600]} component="div">
                    {labels.titles[2]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={sx_de}>
                  {expanded === 2 && (
                    <ExtraDataCard
                      occupation={stepData[2].occupation}
                      study={stepData[2].study}
                      phone={stepData[2].phone}
                      email={stepData[2].email}
                      ref={refs}
                    />
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion
                sx={sx}
                expanded={expanded === 3}
                onChange={handleChange(3)}
              >
                <AccordionSummary
                  sx={sx_summ}
                  expandIcon={<ExpandMore />}
                  aria-controls="panel3d-content"
                  id="panel5d-header"
                >
                  <Typography variant="h7" color={grey[600]} component="div">
                    {labels.titles[3]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={sx_de}>
                  {expanded === 3 && (
                    <FileAttachCard ref={refs} files={stepData[3].files} />
                  )}
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </CardContent>

        <CardActions sx={centerButtonsStyle}>
          <Button size="small" color="inherit" onClick={handleBack}>
            {commonlabels.button.cancel}
          </Button>

          <Button
            size="small"
            onClick={
              (!errorSend && open) || (errorSend && !open)
                ? handleClose
                : handleSend
            }
          >
            {errorSend ? commonlabels.button.restart : commonlabels.button.ok}
          </Button>
        </CardActions>
      </Card>
    </Suspense>
  );
};

export default RenewalCard;
