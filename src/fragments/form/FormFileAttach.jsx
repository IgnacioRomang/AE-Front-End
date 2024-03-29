import React, { useImperativeHandle, useState } from "react";
import {
  useCommonsButtonString,
  useFormFileAttachString,
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

/**
 * The code defines a React functional component called `FileAttachCard`. It is a card component that
 * allows users to attach files (DNI PHOTOS).
 * @param {object} props - The props passed to the component.
 * @param {array} props.files - An array of files uploaded by the user.
 * @returns {JSX.Element} - Returns the FileAttachCard component.
 */
const FormFileAttach = React.forwardRef((props, ref) => {
  const formfileattachlabels = useFormFileAttachString();
  const commonbuttonlabels = useCommonsButtonString();

  const [userData, setUserData] = useState(props.files);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [error, setError] = useState({
    files_size: false,
    files_type: false,
  });

  /**
   * The function `handleFileChange` is used to handle the change event when selecting files, limiting
   * the number of files to 2 and checking if the files are of type image.
   * @param {Event} event - the change event
   */
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

  /**
   * Removes a file from the `userData` array and updates the state with the updated array.
   * @param {number} index - The index of the file to remove.
   */
  const handleRemoveFile = (index) => {
    const updatedFiles = [...userData];
    updatedFiles.splice(index, 1);
    setUserData(updatedFiles);
    setButtonDisabled(false);
  };

  /**
   * The function `handleErrors` is a callback function that checks for errors in the file attachments.
   * It determines if there are any errors based on two conditions:
   * 1. If the number of files uploaded is less than 2, an error of `files_size` is set to true.
   * 2. If any of the uploaded files is not of type image, an error of `files_type` is set to true
   * @returns {boolean} - Returns true if there are any errors, else returns false.
   */
  const handleErrors = () => {
    const errors = {
      files_size: userData.length < 2,
      files_type: false,
    };

    for (const file of userData) {
      if (!file.type.startsWith("image/")) {
        errors.files_type = true;
        break;
      }
    }
    console.log(userData);
    return Object.values(errors).some(Boolean);
  };

  /**
   * The function exports a `getData` function that returns `userData` and is accessible through the
   * `ref` object.
   * @returns {object} - Returns an object containing the user data.
   */
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
              <AlertTitle>{formfileattachlabels.title}</AlertTitle>
              <Typography sx={textJustifyStyle}>
                {formfileattachlabels.body[0]}
              </Typography>
              <Typography sx={textJustifyStyle}>
                {formfileattachlabels.body[1]}
              </Typography>
              <Typography sx={textJustifyStyle}>
                {formfileattachlabels.body[2]}
              </Typography>
            </Alert>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <TextField
              fullWidth
              id="fileInput"
              label={formfileattachlabels.files_selected.title}
              type="file"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              accept="image/*"
              multiple
              size="small"
              error={error.files_size || error.files_type}
              disabled={isButtonDisabled}
              onChange={handleFileChange}
            />
            {userData.length > 0 && (
              <div>
                <p>{formfileattachlabels.files_selected.list}</p>
                <ul>
                  {userData.map((file, index) => (
                    <li key={index}>
                      {shortFileName(file.name)}
                      <Button onClick={() => handleRemoveFile(index)}>
                        {commonbuttonlabels.delete}
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

export default FormFileAttach;
