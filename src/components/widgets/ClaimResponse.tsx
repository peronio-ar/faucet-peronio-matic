// tslint:disable:no-console
import React from "react";
import styled from "styled-components";

import { Stack, Paper } from "@mui/material";

// import styled from "styled-components";

const Container = styled(Paper)`
  padding: 1em;
  border-radius: 0.5em;
`;

interface IClaimResponseProps {
  data: object;
}

const ClaimResponse = (props: IClaimResponseProps) => {
  return (
    <Container>
      <Stack spacing={2}>
        <div>Reclamadooo</div>
        <div>{JSON.stringify(props.data)}</div>
      </Stack>
    </Container>
  );
};

ClaimResponse.defaultProps = {
  data: {},
};

export default ClaimResponse;
