// tslint:disable:no-console
import React from "react";
import styled from "styled-components";

import {
  Stack,
  Paper,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
        {props.status === 200 ? (
          <div>
            <div>
              <h3>Bienvenido compañero!</h3>
            </div>
            <div>{props.tx}</div>
          </div>
        ) : (
          <div>
            <div>
              <h3>Hubo un error</h3>
            </div>
            <div>{props.message}</div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='debug'
                id='debug'
              >
                <Typography>Log</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{JSON.stringify(props)}</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </Stack>
    </Container>
  );
};

export default ClaimResponse;
