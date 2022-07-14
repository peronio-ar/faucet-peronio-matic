import * as React from "react";
import styled from "styled-components";

import { CardHeader, CardContent, Typography, Paper, Stack } from "@mui/material";

interface IOfflineProps {
    children: React.ReactNode;
  }

const Container = styled(Paper)`
  padding: 1em;
  border-radius: 0.5em;
`;

const Offline = (props: IOfflineProps) => (
  <Container elevation={1}>
    <CardHeader title='Seguí estos pasos' />
    <CardContent>
      <Typography variant='body2' color='text.secondary'>
      <Stack spacing={2}>
        <Paper>Conectar Billetera</Paper>
        <Paper>Seleccionar App</Paper>
        <Paper>Volver a esta página</Paper>
      </Stack>
      </Typography>
      <div>{props.children}</div>
    </CardContent>
  </Container>
);

Offline.defaultProps = {
  
};

export default Offline;
