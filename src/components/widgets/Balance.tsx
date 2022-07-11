import * as React from "react";
import { ITokenAmount } from "src/helpers/types";
import styled from "styled-components";
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
`;

const SSymbol = styled.div``;

const SAmount = styled.div``;

const TokenAmount = (props: ITokenAmount) => (
  <SToken>
    <SSymbol>{props.symbol.label}</SSymbol>
    <SAmount>{props.amount}</SAmount>
  </SToken>
);

const Balance = (props: IBalanceProps) => (
  <div>
    <div>
      <h2>Fondos Actuales:</h2>
    </div>
    <div>
      {tokens.map((v) => (
        <TokenAmount symbol={v.symbol} amount={v.amount} />
      ))}
    </div>
  </div>
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
