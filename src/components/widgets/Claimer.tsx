// tslint:disable:no-console
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { Stack, Paper, TextField, Button } from "@mui/material";
import AlreadyClaimed from "./AlreadyClaimed";

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

const Claimer = (props: any) => {
  const [word, setWord] = useState("");
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
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
      .then((response) => {
        setLoading(false);
        setClaimed(true);
        console.info("response:");
        console.dir(response);
      });
  };

  const Loading = () => <>Cargando...</>;

  // const NotClaimed = () => (

  // );

  return (
    <Container>
      <Stack spacing={2}>
        {claimed ? (
          <AlreadyClaimed />
        ) : loading ? (
          <Loading />
        ) : (
          <>
            <div>Escribí la palabra secreta que recibiste al entrar</div>
            <TextField
              label='Palabra'
              variant='outlined'
              value={word}
              onChange={handleWordChange}
            />
            <Button onClick={handleClaim} variant='contained'>
              Recibir Peronios
            </Button>
          </>
        )}
      </Stack>
    </Container>
  );
};

Claimer.defaultProps = {};

export default Claimer;
