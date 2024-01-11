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

/* The above code is a React component called `RegisterCard`. It is a multi-step form that allows users
to register by providing various information. The component uses state hooks to manage the current
step, errors, skipped steps, and step data. It also uses refs to access data and handle errors in
child components. */
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

  /* The `getStepperStage` function is a helper function that determines which component to render based
on the current step of the stepper. */
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
        return <DatePlanAE first={true} ref={dataRef} />;
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

    // Evaluar errores
    let error = false;
    /* The code block is checking if the `dataRef.current` exists and if it has a function called
    `handleErrors`. If both conditions are true, it calls the `handleErrors` function and assigns its
    return value to the `error` variable. This is used to determine if there are any errors in the
    current step of the form. */
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
      /* The code block you provided is handling the submission of user registration data to a server. It is
      checking if the current step of the form is the last step (step 4) and if so, it creates an object
`     register_user` with the necessary data from the previous steps (name, cuil, email, and password). */
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

  /**
   * The `handleRestart` function sends a POST request to a specified URL with user registration data and
   * handles the response.
   */
  const handleRestart = () => {
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
        updateErrorAtIndex(5, false);
        setSendError(false);
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
                    disabled={activeStep === 0}
                    onClick={handleRestart}
                    sx={{ mr: 1 }}
                  >
                    {bottonslabel.button.restart}
                  </Button>
                ) : (
                  <Button
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
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  {bottonslabel.button.back}
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext}>
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
