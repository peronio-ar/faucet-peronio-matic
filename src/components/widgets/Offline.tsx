import * as React from "react";
import styled from "styled-components";

import { CardHeader, CardContent, Paper } from "@mui/material";

interface IOfflineProps {
  children: React.ReactNode;
}

const Container = styled(Paper)`
  padding: 1em;
  border-radius: 0.5em;
`;

const Center = styled.div`
  text-align: center;
`;

const Offline = (props: IOfflineProps) => (
  <Container elevation={1}>
    <CardHeader title='Conectate y volvé al explorador' />
    <CardContent>
      <Center>{props.children}</Center>
    </CardContent>
  </Container>
);

Offline.defaultProps = {};

export default Offline;
