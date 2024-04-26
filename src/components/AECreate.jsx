import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useCommonsButtonString,
  useComponentAECreateString,
  useComponentAuthRegisterString,
} from "../contexts/TextProvider.jsx";

import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext.js";
import { cardRegisterStyle, centerButtonsStyle } from "../theme.jsx";
import { formatDate, sleep } from "../utiles.js";

import AlertFragment from "../fragments/AlertFragmet.jsx";
import FormAddress from "../fragments/form/FormAddress.jsx";
import FormExtra from "../fragments/form/FormExtra.jsx";
import FormInfo from "../fragments/form/FormInfo.jsx";
import FormMessageError from "../fragments/form/FormMessageError.jsx";
import FormMessageSuccess from "../fragments/form/FormMessageSuccess.jsx";

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

import { ExpandMore, HowToReg } from "@mui/icons-material";
import { usePublicResources } from "../contexts/PublicResourcesContext.js";

//const  = lazy(() => import("@mui/icons-material"));

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
export const AECreate = () => {
  const buttonlabels = useCommonsButtonString();
  const aecreatelabels = useComponentAECreateString();
  const onlytitles = useComponentAuthRegisterString().step_title;

  const [expanded, setExpanded] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [errorSend, setSendError] = useState(false);
  const [stepData, setStepData] = useState(null);

  const refs = useRef(null);
  const { User, fetch_user_data, start_ae_n, refesh_fn } = useService();
  const {
    get_province_names,
    get_citys_name,
    get_substate_names,
    get_address_names,
  } = usePublicResources();
  const navigate = useNavigate();
  const updateValues = useCallback(async () => {
    try {
      const response = await fetch_user_data();
      let city_substate = response.city.split(" , ");
      let aux_state = await get_province_names(response.state);
      let aux_substate = await get_substate_names(
        aux_state.nombre,
        city_substate[0]
      );
      let aux_city = await get_citys_name(
        aux_state.nombre,
        aux_substate.nombre,
        city_substate[1]
      );
      let aux_address = await get_address_names(
        aux_state.nombre,
        aux_substate.nombre,
        aux_city.nombre,
        response.address
      );
      let aux = [
        {
          name: response.name,
          lastname: response.lastname,
          cuil: response.cuil,
          birthdate: response.birthdate,
          gender: response.gender,
        },
        {
          state: aux_state[0], //las funciones devuelven listas pero de 1 solo elemento
          substate: aux_substate[0], // sollo al ser busquedas exactas
          city: aux_city[0],
          address: aux_address[0],
          floor: response.floor,
          number: response.nro_address,
          apartment: response.apartment,
          postalCode: response.postalCode,
        },
        {
          occupation: response.occupation,
          study: response.study,
          phone: response.phone,
          email: response.email,
        },
      ];
      setStepData(aux);
    } catch (error) {
      console.error(error);
    }
  }, [stepData]);

  useEffect(() => {
    //visualiza una vez cargado todo
    if (stepData) {
      setLoading(false);
    }
  }, [stepData]);

  useEffect(() => {
    if (User === null) {
      navigate("/");
    }
    updateValues();
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
        lastname: stepData[0].lastname,
        birthdate: formatDate(new Date(stepData[0].birthdate)),
        gender: stepData[0].gender,
        address: stepData[1].address,
        address_number: stepData[1].number,
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
      setOpen(true);
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
    }
  };

  /**
   * @brief This function is called when the user clicks the "Cancel" button.
   */
  const handleClose = () => {
    refesh_fn();
    navigate("/ae/profile");
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
            !errorSend ? (
              <FormMessageSuccess first={false} />
            ) : (
              <FormMessageError />
            )
          ) : loading ? (
            <>
              <CircularProgress />
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
                      lastname={stepData[0].lastname}
                      cuil={stepData[0].cuil}
                      birthdate={stepData[0].birthdate}
                      gender={stepData[0].gender}
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
                      state={stepData[1].state}
                      substate={stepData[1].substate}
                      number={stepData[1].number}
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
