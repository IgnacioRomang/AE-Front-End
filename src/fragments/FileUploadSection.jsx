import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useFileUploadSectionString } from "../contexts/TextProvider.jsx";
import { shortFileName } from "../utiles.js";
const FileUploadSection = () => {
    const labels = useFileUploadSectionString();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const selectedFilesArray = [];

        // Limitar la cantidad de archivos a 2
        for (let i = 0; i < Math.min(files.length, 2); i++) {
            selectedFilesArray.push(files[i]);
        }

        setSelectedFiles([...selectedFiles, ...selectedFilesArray]);

        // Deshabilitar el botón si se alcanza la cantidad máxima
        setButtonDisabled(
            selectedFilesArray.length + selectedFiles.length >= 2
        );
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);

        // Habilitar el botón cuando se elimina un archivo
        setButtonDisabled(false);
    };

    return (
        <Box>
            <TextField
                fullWidth
                id="fileInput"
                label={labels.label}
                type="file"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                accept="image/*"
                multiple
                disabled={isButtonDisabled}
                onChange={handleFileChange}
            />
            {selectedFiles.length > 0 && (
                <div>
                    <p>{labels.selected_label}</p>
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <li key={index}>
                                {shortFileName(file.name)}
                                <Button onClick={() => handleRemoveFile(index)}>
                                    {labels.selected_delete}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Box>
    );
};

export default FileUploadSection;
