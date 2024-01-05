import React, { useRef, useEffect, useState } from "react";

// Material-UI Components
import {
  Box,
  Button,
  Card,
  CardHeader,
  Step,
  StepLabel,
  Stepper,
  CircularProgress,
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
import {
  boxbottonsSteppStyle,
  cardRegisterStyle,
  centeringStyles,
  finalboxStyle,
  stepStyle,
} from "../theme.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const handleNext = () => {
    // Copia el conjunto de pasos omitidos para evitar mutaciones directas
    let newSkipped = new Set(skipped);

    // Evaluar errores
    let error = false;
    if (dataRef.current && typeof dataRef.current.handleErrors === "function") {
      error = dataRef.current.handleErrors();
    }

    if (error) {
      updateErrorAtIndex(activeStep, true);
    } else {
      updateErrorAtIndex(activeStep, false);

      // Actualizar datos del paso actual si no es el último paso
      if (activeStep <= 4) {
        const receivedData = dataRef.current.getData();
        setStepData((prevStepData) => {
          const newStepData = [...prevStepData];
          newStepData[activeStep] = { ...receivedData };
          return newStepData;
        });
      }

      // Eliminar el paso actual de los pasos omitidos
      if (isStepSkipped(activeStep)) {
        newSkipped.delete(activeStep);
      }
      // Incrementar el paso activo y actualizar los pasos omitidos

      if (activeStep === 4) {
        // Enviar datos y generar PDF (asumiendo que esto debe hacerse aquí)
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
