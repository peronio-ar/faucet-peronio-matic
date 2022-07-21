// tslint:disable:no-console
import React from "react";
import styled from "styled-components";

import { Stack, Paper } from "@mui/material";

// import styled from "styled-components";
// import { colors, fonts, shadows, transitions } from "../styles";

// const SIcon = styled.div`
//   position: absolute;
//   height: 15px;
//   width: 15px;
//   margin: 0 8px;
//   top: calc((100% - 15px) / 2);
// `;

// const SToken = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-size: 1.5em;
// `;

const Container = styled(Paper)`
  padding: 1em;
  border-radius: 0.5em;
`;

const AlreadyClaimed = (props: any) => {
  return (
    <Container>
      <Stack spacing={2}>
        <div>Reclamadooo</div>
      </Stack>
    </Container>
  );
};

AlreadyClaimed.defaultProps = {};

export default AlreadyClaimed;
