import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  useCommonsButtonString,
  useComponentAECreateString,
  useComponentAuthRegisterString,
} from "../contexts/TextProvider.jsx";

import { ExpandMore, HowToReg } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext.js";
import { cardRegisterStyle, centerButtonsStyle } from "../theme.jsx";
import { formatDate } from "../utiles.js";

import AlertFragment from "../fragments/AlertFragmet.jsx";
import FormAddress from "../fragments/form/FormAddress.jsx";
import FormExtra from "../fragments/form/FormExtra.jsx";
import FormFileAttach from "../fragments/form/FormFileAttach.jsx";
import FormInfo from "../fragments/form/FormInfo.jsx";
import FormMessageError from "../fragments/form/FormMessageError.jsx";
import FormMessageSuccess from "../fragments/form/FormMessageSuccess.jsx";

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
const AECreate = () => {
  const buttonlabels = useCommonsButtonString();
  const aecreatelabels = useComponentAECreateString();
  const onlytitles = useComponentAuthRegisterString()["step-title"];

  const [expanded, setExpanded] = useState("");
  const [open, setOpen] = useState(false);
  const [errorSend, setSendError] = useState(false);
  const [stepData, setStepData] = useState([
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

  const refs = useRef(null);
  const { User, fetch_user_data, start_ae_n } = useService();
  const navigate = useNavigate();

  useEffect(() => {
    if (User === null) {
      navigate("/");
    }
    fetch_user_data().then((response) => {
      if (response) {
        let user_data = response;
        setStepData([
          {
            name: user_data.name,
            lastName: user_data.lastname,
            formattedCUIL: user_data.cuil,
            selectedBirthdate: user_data.birthdate,
            selectedGender: user_data.gender,
          },
          {
            address: `${
              user_data.address
            }, ${user_data.nro_address.toString()}`,
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
          title={aecreatelabels.title}
        />
        <CardContent>
          {open ? (
            <>
              {!errorSend ? (
                <FormMessageSuccess first={false} />
              ) : (
                <FormMessageError />
              )}
            </>
          ) : (
            <>
              <AlertFragment
                type="info"
                title={aecreatelabels.alert_info.title}
                body={aecreatelabels.alert_info.body}
              />

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
                    {onlytitles[0]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={sx_de}>
                  {expanded === 0 && (
                    <FormInfo
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
                    {onlytitles[1]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={sx_de}>
                  {expanded === 1 && (
                    <FormAddress
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
                    {onlytitles[2]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={sx_de}>
                  {expanded === 2 && (
                    <FormExtra
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
                    {onlytitles[3]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={sx_de}>
                  {expanded === 3 && (
                    <FormFileAttach ref={refs} files={stepData[3].files} />
                  )}
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </CardContent>

        <CardActions sx={centerButtonsStyle}>
          <Button size="small" color="inherit" onClick={handleBack}>
            {buttonlabels.cancel}
          </Button>

          <Button
            size="small"
            onClick={
              (!errorSend && open) || (errorSend && !open)
                ? handleClose
                : handleSend
            }
          >
            {errorSend ? buttonlabels.restart : buttonlabels.ok}
          </Button>
        </CardActions>
      </Card>
    </Suspense>
  );
};

export default AECreate;
