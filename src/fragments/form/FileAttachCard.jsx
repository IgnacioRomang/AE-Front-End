import React from 'react';
import { useFileAttachCardString } from '../../contexts/TextProvider.jsx';

// Material-UI Components
import {
    Box, CardContent, Grid, Typography
} from "@mui/material";

// Icons

// Material-UI Components
import { Alert, AlertTitle } from "@mui/material";

// Contexts

// Fragments
import {
    FileUploadSection
} from "../../fragments";
// Styles

const FileAttachCard = () => {
    const labels = useFileAttachCardString();
    return <CardContent>
        <Grid
            container
            paddingBottom={5}
            paddingTop={1}
            spacing={2}
        >
            <Grid item xs={12} md={6}>
                <Box>
                    <Alert severity="info">
                        <AlertTitle>
                            {labels.info_title}
                        </AlertTitle>
                        <Typography>
                            {labels.info_body[0]}
                        </Typography>
                        <Typography>
                            {labels.info_body[1]}
                        </Typography>
                        <Typography>
                            {labels.info_body[2]}
                        </Typography>
                    </Alert>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <FileUploadSection />
            </Grid>
        </Grid>
    </CardContent>;
}

export default FileAttachCard;