// tslint:disable:no-console
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { Stack, Paper } from "@mui/material";
import ClaimResponse, { IClaimResponseProps } from "./ClaimResponse";
import Button from "../Button";

// import styled from "styled-components";
// import { colors, fonts, shadows, transitions } from "../styles";

const TextField = styled.input`
  height: 50px;
  font-size: 20px !important;
  text-transform: uppercase;
  padding: 7px;
`;

const Container = styled(Paper)`
  padding: 1em;
  border-radius: 0.5em;
`;

const Claimer = (props: any) => {
  const [word, setWord] = useState("");
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<IClaimResponseProps>();
  const handleWordChange = (e: any) => {
    setWord(e.target.value);
  };

  const handleClaim = () => {
    setLoading(true);

    axios
      .post("api/claim", {
        word,
        address: props.account,
      })
      .then((response: IClaimResponseProps) => {
        setResponse({
          status: 200,
          response,
        });
        console.info("response:");
        console.dir({ response });
      })
      .catch((e: IClaimResponseProps) => {
        console.info("Encontró un error");
        console.info("error", e);
        setResponse(e.response);
        console.info("response:");
      })
      .finally(() => {
        setLoading(false);
        setClaimed(true);
      });
  };

  const Loading = () => <>Cargando...</>;

  // const NotClaimed = () => (

  // );

  return (
    <Container>
      <Stack spacing={2}>
        {claimed ? (
          <ClaimResponse response={response} />
        ) : loading ? (
          <Loading />
        ) : (
          <>
            <div>Escribí la palabra secreta que recibiste al entrar</div>
            <TextField type='text' value={word} onChange={handleWordChange} />
            <Button onClick={handleClaim}>Recibir Peronios</Button>
          </>
        )}
      </Stack>
    </Container>
  );
};

Claimer.defaultProps = {};

export default Claimer;
