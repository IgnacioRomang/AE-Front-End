import React, { useCallback, useImperativeHandle, useState } from "react";
import {
  useFileAttachCardString,
  useFileUploadSectionString,
} from "../../contexts/TextProvider.jsx";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { textJustifyStyle } from "../../theme.jsx";
import { shortFileName } from "../../utiles.js";

const FileAttachCard = React.forwardRef((props, ref) => {
  const labels = useFileAttachCardString();

  const labelsFile = useFileUploadSectionString();
  const [userData, setUserData] = useState(props.files);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [error, setError] = useState({
    files_size: false,
    files_type: false,
  });

  const handleFileChange = (event) => {
    let files = event.target.files;
    let selectedFilesArray = [];

    // Limitar la cantidad de archivos a 2
    for (let i = 0; i < Math.min(files.length, 2); i++) {
      let file = files[i];
      if (file.type && file.type.startsWith("image/")) {
        selectedFilesArray.push(file);
        setError({
          ...error,
          files_type: false,
        });
      } else {
        setError({
          ...error,
          files_type: true,
        });
      }
    }

    setUserData([...userData, ...selectedFilesArray]);
    setButtonDisabled(selectedFilesArray.length + userData.length >= 2);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...userData];
    updatedFiles.splice(index, 1);
    setUserData(updatedFiles);
    setButtonDisabled(false);
  };

  const handleErrors = useCallback(() => {
    const errors = {
      files_size: userData.length < 2,
      files_type: error.files_type,
    };

    setError(errors);

    return Object.values(errors).some(Boolean);
  }, [userData]);

  const getData = () => {
    return { files: userData };
  };

  useImperativeHandle(ref, () => ({
    handleErrors,
    getData,
  }));

  return (
    <CardContent>
      <Grid
        container
        padding={3}
        spacing={2}
        direction={{ xs: "column", sm: "column" }}
      >
        <Grid item xs={12} md={6}>
          <Box>
            <Alert severity="info">
              <AlertTitle>{labels.info_title}</AlertTitle>
              <Typography sx={textJustifyStyle}>
                {labels.info_body[0]}
              </Typography>
              <Typography sx={textJustifyStyle}>
                {labels.info_body[1]}
              </Typography>
              <Typography sx={textJustifyStyle}>
                {labels.info_body[2]}
              </Typography>
            </Alert>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <TextField
              fullWidth
              id="fileInput"
              label={labelsFile.label}
              type="file"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              accept="image/*"
              multiple
              error={error.files_size || error.files_type}
              disabled={isButtonDisabled}
              onChange={handleFileChange}
            />
            {userData.length > 0 && (
              <div>
                <p>{labelsFile.selected_label}</p>
                <ul>
                  {userData.map((file, index) => (
                    <li key={index}>
                      {shortFileName(file.name)}
                      <Button onClick={() => handleRemoveFile(index)}>
                        {labelsFile.selected_delete}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  );
});

export default FileAttachCard;
