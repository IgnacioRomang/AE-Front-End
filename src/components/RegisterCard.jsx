import React, { useRef, useState } from "react";

// Material-UI Components
import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";

// Icons
import HowToRegIcon from "@mui/icons-material/HowToReg";

// Material-UI Components

// Contexts
import {
  useCommonsString,
  useRegisterCardString,
} from "../contexts/TextProvider.jsx";

// Fragments
import { ErrorAE, SuccessAE } from "../fragments";
import {
  AddressDataCard,
  DatePlanAE,
  ExtraDataCard,
  FileAttachCard,
  InfoDataCard,
} from "../fragments/form";
// Styles
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  boxbottonsSteppStyle,
  cardRegisterStyle,
  centeringStyles,
  finalboxStyle,
  stepStyle,
} from "../theme.jsx";
/**
 * The RegisterCard component is a multi-step form that allows users to register by providing various information.
 * The component uses state hooks to manage the current step, errors, skipped steps, and step data. It also uses refs to access data and handle errors in child components.
 * @function
 * @returns {JSX.Element} The RegisterCard component.
 */
const RegisterCard = () => {
  const labels = useRegisterCardString();
  const bottonslabel = useCommonsString();
  const navigate = useNavigate();

  const steps = labels.titles;

  const [errors, setErrors] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [sendError, setSendError] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const stepperRef = useRef(null);

  const dataRef = useRef(null);

  const [stepData, setStepData] = useState([
    {
      name: "",
      lastName: "",
      formattedCUIL: "",
      selectedBirthdate: "",
      selectedGender: 4,
      password: "",
    },
    {
      address: "",
      floor: "0",
      apartment: "0",
      province: "",
      city: "",
      postalCode: "",
    },
    { occupation: 14, study: 26, phone: "", email: "" },
    { files: [] },
    {
      startDay: "",
      fthMonth: "",
      sixMonth: "",
      lastMonth: "",
    },
  ]);

  /**
   * The getStepperStage function is a helper function that determines which component to render based
   * on the current step of the stepper.
   *
   * @param {number} viewid - the current step of the stepper
   * @param {object} labels - an object containing the translated strings for the component
   * @returns {JSX.Element} the component to render for the current step
   */
  const getStepperStage = (viewid, labels) => {
    switch (viewid) {
      case 0:
        return (
          <InfoDataCard
            name={stepData[0].name}
            registerState={true}
            lastName={stepData[0].lastName}
            cuil={stepData[0].formattedCUIL}
            birthdate={stepData[0].selectedBirthdate}
            gender={stepData[0].selectedGender}
            password={stepData[0].password}
            ref={dataRef}
          />
        );
      case 1:
        return (
          <AddressDataCard
            address={stepData[1].address}
            floor={stepData[1].floor}
            apartment={stepData[1].apartment}
            province={stepData[1].province}
            city={stepData[1].city}
            postalCode={stepData[1].postalCode}
            ref={dataRef}
          />
        );
      case 2:
        return (
          <ExtraDataCard
            occupation={stepData[2].occupation}
            study={stepData[2].study}
            phone={stepData[2].phone}
            email={stepData[2].email}
            ref={dataRef}
          />
        );
      case 3:
        return <FileAttachCard ref={dataRef} files={stepData[3].files} />;
      case 4:
        return (
          <DatePlanAE first={false} ref={dataRef} email={stepData[2].email} />
        );
      case 5:
        if (!errors[5]) {
          return <SuccessAE first={true} />;
        } else {
          return <ErrorAE padding={8} />;
        }
      default:
        return <CircularProgress padding={15} />;
    }
  };
  /**
   * The handleBack function is a click handler that decrements the activeStep state by 1.
   * @function
   */
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /**
   * The isStepSkipped function is a helper function that returns a boolean indicating whether the specified step is skipped.
   * @param {number} step - the step to check
   * @returns {boolean} true if the step is skipped, false otherwise
   */
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  /**
   * The updateErrorAtIndex function is a helper function that updates the errors state array at the specified index with the specified value.
   * @param {number} index - the index of the error to update
   * @param {boolean} value - the new value of the error
   */
  const updateErrorAtIndex = (index, value) => {
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = value;
      return newErrors;
    });
  };
  /**
   * The function `handleNext` is used to handle the next step in a multi-step form, updating the step
   * data, checking for errors, and sending data to a server if it is the last step.
   *
   * @param {Set} skipped - the set of steps that have been skipped
   * @param {number} activeStep - the current step of the stepper
   * @param {function} setStepData - a function that updates the step data
   * @param {function} setErrors - a function that updates the errors state array
   * @param {function} setSendError - a function that updates the sendError state
   * @param {object} stepData - the current step data
   * @param {object} dataRef - a ref to the current step component
   * @param {boolean} sendError - a boolean indicating if there was an error sending data to the server
   * @returns {void}
   */
  const handleNext = () => {
    // Copia el conjunto de pasos omitidos para evitar mutaciones directas
    let newSkipped = new Set(skipped);

    // Evaluar errores
    let error = false;
    /**
     * Checks if the current step has any errors and returns a boolean indicating if there are any errors.
     *
     * @returns {boolean} A boolean indicating if there are any errors in the current step.
     */
    if (dataRef.current && typeof dataRef.current.handleErrors === "function") {
      error = dataRef.current.handleErrors();
    }

    if (error) {
      updateErrorAtIndex(activeStep, true);
    } else {
      updateErrorAtIndex(activeStep, false);
      /* This code block is handling the data received from the current step of the form. */
      if (activeStep <= 4) {
        const receivedData = dataRef.current.getData();
        setStepData((prevStepData) => {
          const newStepData = [...prevStepData];
          newStepData[activeStep] = { ...receivedData };
          return newStepData;
        });
      }
      if (isStepSkipped(activeStep)) {
        newSkipped.delete(activeStep);
      }
      if (activeStep === 4) {
        let url = process.env.REACT_APP_BACK_URL;
        let register_user = {
          name: stepData[0].name + " " + stepData[0].lastName,
          cuil: stepData[0].formattedCUIL,
          email: stepData[2].email,
          password: stepData[0].password,
        };
        axios
          .post(`${url}/api/auth/register`, register_user)
          .then((response) => {
            console.log("Datos enviados correctamente");
          })
          .catch((e) => {
            updateErrorAtIndex(5, true);
            setSendError(true);
          });
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };
  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleRestart = (url, register_user) => {
    axios
      .post(`${url}/api/auth/register`, register_user)
      .then((response) => {
        console.log("Datos enviados correctamente");
      })
      .catch((e) => {
        updateErrorAtIndex(5, true);
        setSendError(true);
      });
  };

  return (
    <>
      <Card sx={cardRegisterStyle}>
        <CardHeader
          avatar={<HowToRegIcon />}
          titleTypographyProps={{ variant: "h6" }}
          title={labels.mainTitle}
        />
        {getStepperStage(activeStep, labels)}
        <Box sx={{ width: "100%" }}>
          <Stepper
            ref={stepperRef}
            activeStep={activeStep}
            alternativeLabel
            sx={centeringStyles}
          >
            {!errors[5] &&
              steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                labelProps.error = errors[index];
                return (
                  <Step key={label} sx={stepStyle}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Box sx={finalboxStyle}>
                <Box sx={{ flex: "1 1 auto" }} />
                {errors[5] ? (
                  <Button
                    size="small"
                    disabled={activeStep === 0}
                    onClick={handleRestart}
                    sx={{ mr: 1 }}
                  >
                    {bottonslabel.button.restart}
                  </Button>
                ) : (
                  <Button
                    size="small"
                    disabled={activeStep === 0}
                    onClick={handleLogin}
                    sx={{ mr: 1 }}
                  >
                    {bottonslabel.button.login}
                  </Button>
                )}
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={boxbottonsSteppStyle}>
                <Button
                  size="small"
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  {bottonslabel.button.back}
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button size="small" onClick={handleNext}>
                  {activeStep === steps.length - 1
                    ? bottonslabel.button.ok
                    : bottonslabel.button.next}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Card>
    </>
  );
};

export default RegisterCard;
