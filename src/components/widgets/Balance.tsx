import * as React from "react";
import { ITokenAmount } from "src/helpers/types";
import styled from "styled-components";

import CardHeader from "@mui/material/CardHeader";
import { CardContent, Typography, Paper } from "@mui/material";

// import styled from "styled-components";
// import { colors, fonts, shadows, transitions } from "../styles";

interface IBalanceProps {
  tokens?: ITokenAmount[];
}

// const SIcon = styled.div`
//   position: absolute;
//   height: 15px;
//   width: 15px;
//   margin: 0 8px;
//   top: calc((100% - 15px) / 2);
// `;

const tokens: ITokenAmount[] = [
  {
    symbol: {
      label: "USDC",
      url: "/symbol/usdc",
    },
    amount: 15,
  },
  {
    symbol: {
      label: "PE",
      url: "/symbol/pe",
    },
    amount: 2000,
  },
  {
    symbol: {
      label: "MATIC",
      url: "/symbol/matic",
    },
    amount: 3,
  },
];

const SToken = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5em;
`;

const SSymbol = styled.div``;

const SAmount = styled.div``;

const TokenAmount = (props: ITokenAmount) => (
  <SToken>
    <SSymbol>{props.symbol.label}</SSymbol>
    <SAmount>{props.amount}</SAmount>
  </SToken>
);

const Container = styled(Paper)`
  padding: 1em;
  border-radius: 0.5em;
`;

const Balance = (props: IBalanceProps) => (
  <Container elevation={16}>
    <CardHeader title='Fondos Actuales' />
    <CardContent>
      <Typography variant='body2' color='text.secondary'>
        {tokens.map((v) => (
          <TokenAmount symbol={v.symbol} amount={v.amount} />
        ))}
      </Typography>
    </CardContent>
  </Container>
);

Balance.defaultProps = {
  fetching: false,
  outline: false,
  type: "button",
  color: "lightBlue",
  disabled: false,
  icon: null,
  left: false,
};

export default Balance;
