import { Paper, Stack, Typography } from "@mui/material";

export default function ErrorPage() {
  return (
    <Paper>
      <Stack spacing={1} padding={4}>
        <Typography variant="h3">Oops!</Typography>
        <Typography variant="body1">
          {"Sorry, an unexpected error has occurred."}
        </Typography>
      </Stack>
    </Paper>
  );
}
