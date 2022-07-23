// tslint:disable:no-console
import React from "react";
import styled from "styled-components";

import { Stack, Paper } from "@mui/material";

// import styled from "styled-components";

const Container = styled(Paper)`
  padding: 1em;
  border-radius: 0.5em;
`;

// interface IResponseData {
//   success: boolean;
//   message: string;
//   tx?: string;
//   address?: string;
// }

// interface IClaimResponseProps {
//   data?: IResponseData;
//   status?: string;
// }

const ClaimResponse = (props: any) => {
  return (
    <Container>
      <Stack spacing={2}>
        {}
        <div>Reclamadooo</div>
        <div>{JSON.stringify(props)}</div>
      </Stack>
    </Container>
  );
};

export default ClaimResponse;
