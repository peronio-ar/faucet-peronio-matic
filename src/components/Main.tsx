import * as React from "react";

import { Web3Provider } from "@ethersproject/providers";
import Claimer from "./widgets/Claimer";

// import styled from "styled-components";

interface IMainProps {
  account: string;
  library: Web3Provider;
}

const Main = (props: IMainProps) => {
  return (
    <div>
      <Claimer account={props.account} />
    </div>
  );
};

export default Main;
