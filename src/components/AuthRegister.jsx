import React, { useRef, useState } from "react";

// Material-UI Components
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";

// Icons
import HowToRegIcon from "@mui/icons-material/HowToReg";

// Material-UI Components

// Contexts
import {
  useCommonsButtonString,
  useComponentAuthRegisterString,
} from "../contexts/TextProvider.jsx";

// Fragments
import {
  FormAddress,
  FormDatePlan,
  FormExtra,
  FormFileAttach,
  FormInfo,
  FormMessageError,
  FormMessageSuccess,
} from "../fragments/form/index.js";
// Styles
import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext.js";
import {
  boxbottonsSteppStyle,
  cardRegisterStyle,
  centeringStyles,
  finalboxStyle,
  stepStyle,
} from "../theme.jsx";
import { formatDate } from "../utiles.js";
import { grey } from "@mui/material/colors";

/**
 * The RegisterCard component is a multi-step form that allows users to register by providing various information.
 * The component uses state hooks to manage the current step, errors, skipped steps, and step data. It also uses refs to access data and handle errors in child components.
 * @function
 * @returns {JSX.Element} The RegisterCard component.
 */
const AuthRegister = () => {
  const commonButtons = useCommonsButtonString();
  const authregisterlabels = useComponentAuthRegisterString();
  const navigate = useNavigate();

  const [errors, setErrors] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const stepperRef = useRef(null);

  const dataRef = useRef(null);
  const { registerRequest } = useService();

  const [stepData, setStepData] = useState([
    {
      name: "",
      lastName: "",
      formattedCUIL: "",
      selectedBirthdate: "",
      selectedGender: -1,
      password: "",
    },
    {
      state: "Ninguno",
      substate: "Ninguno",
      city: "Ninguno",
      address: "Ninguno",
      floor: "",
      number: "",
      apartment: "",
      postalCode: "",
    },
    { occupation: "NC", study: "NC", phone: "", email: "" },
    { files: [] },
    {
      startDay: "",
      fthMonth: "",
      sixMonth: "",
      lastMonth: "",
    },
  ]);

  const handleRegister = async () => {
    try {
      let register_user = {
        cuil: stepData[0].formattedCUIL,
        email: stepData[2].email,
        password: stepData[0].password,
        firstname: stepData[0].name,
        lastname: stepData[0].lastName,
        birthdate: formatDate(new Date(stepData[0].selectedBirthdate)),
        gender: stepData[0].selectedGender,
        address_number: stepData[1].number,
        floor: stepData[1].floor,
        apartment: stepData[1].apartment,
        postalcode: stepData[1].postalCode,
        province: stepData[1].state.nombre,
        city: stepData[1].city.nombre,
        address: stepData[1].address.nombre,
        phone: stepData[2].phone,
        startdate: formatDate(new Date()),
        occupation: stepData[2].occupation,
        study: stepData[2].study,
        dni1: stepData[3].files[0],
        dni2: stepData[3].files[1],
      };
      let result = await registerRequest(register_user);

      if (!result) {
        updateErrorAtIndex(5, true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * The getStepperStage function is a helper function that determines which component to render based
   * on the current step of the stepper.
   */
  const getStepperStage = (viewid) => {
    switch (viewid) {
      case 0:
        return (
          <FormInfo
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
          <FormAddress
            address={stepData[1].address}
            floor={stepData[1].floor}
            apartment={stepData[1].apartment}
            state={stepData[1].state}
            substate={stepData[1].substate}
            number={stepData[1].number}
            city={stepData[1].city}
            postalCode={stepData[1].postalCode}
            ref={dataRef}
          />
        );
      case 2:
        return (
          <FormExtra
            occupation={stepData[2].occupation}
            study={stepData[2].study}
            phone={stepData[2].phone}
            email={stepData[2].email}
            ref={dataRef}
          />
        );
      case 3:
        return <FormFileAttach ref={dataRef} files={stepData[3].files} />;
      case 4:
        return (
          <FormDatePlan first={true} ref={dataRef} email={stepData[2].email} />
        );
      case 5:
        if (!errors[5]) {
          return <FormMessageSuccess first={true} />;
        } else {
          return <FormMessageError padding={8} />;
        }
      default:
        return <CircularProgress padding={15} />;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

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
   */
  const handleNext = () => {
    // Copia el conjunto de pasos omitidos para evitar mutaciones directas
    let newSkipped = new Set(skipped);
    let error = false;
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
        handleRegister();
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleLogin = () => {
    navigate("/auth/login");
  };

  return (
    <>
      <Card sx={cardRegisterStyle}>
        <CardHeader
          avatar={<HowToRegIcon />}
          titleTypographyProps={{ variant: "h6" }}
          title={authregisterlabels.title}
        />
        <Divider />
        {getStepperStage(activeStep)}
        <Divider />
        <CardContent>
          <Stepper
            ref={stepperRef}
            activeStep={activeStep}
            alternativeLabel
            sx={centeringStyles}
          >
            {!errors[5] &&
              authregisterlabels.step_title.map((label, index) => {
                let labelProps = {};
                labelProps.error = errors[index];
                return (
                  <Step key={label} sx={stepStyle}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
          </Stepper>
        </CardContent>
        <CardActions>
          {activeStep === authregisterlabels.step_title.length ? (
            <>
              <Box sx={finalboxStyle}>
                <Box sx={{ flex: "1 1 auto" }} />
                {errors[5] ? (
                  <>
                    <Button
                      size="small"
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      {commonButtons.back}
                    </Button>
                    <Button
                      size="small"
                      disabled={activeStep === 0}
                      onClick={handleRegister}
                      sx={{ mr: 1 }}
                    >
                      {commonButtons.restart}
                    </Button>
                  </>
                ) : (
                  <Button
                    size="small"
                    disabled={activeStep === 0}
                    onClick={handleLogin}
                    sx={{ mr: 1 }}
                  >
                    {commonButtons.login}
                  </Button>
                )}
              </Box>
            </>
          ) : (
            <>
              <Box sx={boxbottonsSteppStyle}>
                <Button
                  size="small"
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  {commonButtons.back}
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button size="small" onClick={handleNext}>
                  {activeStep === authregisterlabels.step_title.length - 1
                    ? commonButtons.ok
                    : commonButtons.next}
                </Button>
              </Box>
            </>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default AuthRegister;
