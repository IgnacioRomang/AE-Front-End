import React, { useRef, useState } from "react";

// Material-UI Components
import {
    Box,
    Button,
    Card, CardHeader, Step,
    StepLabel,
    Stepper
} from "@mui/material";

// Icons
import HowToRegIcon from "@mui/icons-material/HowToReg";

// Material-UI Components

// Contexts
import {
    useCommonsString,
    useRegisterCardString
} from "../contexts/TextProvider.jsx";

// Fragments
import {
    DatePlanAE,
    ErrorAE, SuccessAE
} from "../fragments";
import { FileAttachCard, InfoDataCard } from "../fragments/form";
// Styles
import AddressDataCard from "../fragments/form/AddressDataCard.jsx";
import ExtraDataCard from "../fragments/form/ExtraDataCard.jsx";
import {
    boxbottonsSteppStyle,
    cardRegisterStyle,
    finalboxStyle,
    stepStyle
} from "../theme.jsx";

const RegisterCard = () => {
    const labels = useRegisterCardString();
    const bottonslabel = useCommonsString();
    const steps = labels.titles;

    const [errors, setErrors] = useState([
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
    const er = 5;

    const getStepperStage = (viewid, labels) => {
        switch (viewid) {
            case 0:
                return <InfoDataCard />;
            case 1:
                return <AddressDataCard />;
            case 2:
                return <ExtraDataCard />;
            case 3:
                return <FileAttachCard />;
            case 4:
                return <DatePlanAE first={true} />;
            case 5:
                if (!errors[5]) {
                    return <SuccessAE first={true} />;
                } else {
                    return <ErrorAE />;
                }
        }
        return null;
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
        let newSkipped = skipped;
        //evaluar eerrores

        if (activeStep === er) {
            updateErrorAtIndex(er, true);
        } else {
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            if (activeStep === steps.length) {
                //ir a logeo
            }
            if (activeStep === steps.length - 1) {
                //enviar datos
                // si todo bien generar pdf sin oerrror
                updateErrorAtIndex(5, true);
                setSendError(true);
            }
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }
    };

    const handleRestart = () => {
        updateErrorAtIndex(5, false);
        setActiveStep(5);
    };

    return (
        <>
            <Card style={cardRegisterStyle}>
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
                        sx={{
                            justifyContent: "center",
                            alignContent: "center",
                        }}
                    >
                        {!errors[5] &&
                            steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                labelProps.error = errors[index];
                                return (
                                    <Step key={label} sx={stepStyle}>
                                        <StepLabel {...labelProps}>
                                            {label}
                                        </StepLabel>
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
                                        onClick={handleBack}
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
