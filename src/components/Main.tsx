import * as React from "react";

import { Web3Provider } from "@ethersproject/providers";

// import styled from "styled-components";

interface IMainProps {
  account: string;
  library: Web3Provider;
}

const Main = (props: IMainProps) => {
  return (
    <div>
      <h1>Hola Chicos</h1>
      <div>
        <div>Address: {props.account}</div>
      </div>
    </div>
  );
};

export default Main;
