import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  DynamicContextProvider,
  DynamicWidget,
  FilterAndSortWallets,
} from "@dynamic-labs/sdk-react-core";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import Inner from "./Inner";
import { EthersExtension } from "@dynamic-labs/ethers-v5";

function App() {
  return (
    <DynamicContextProvider
      settings={{
        // yoni-tesing yoni-demo
        environmentId: "71bfa05e-f4dc-43a4-98d8-94befd4555a2",
        walletConnectors: [EthereumWalletConnectors],
        walletConnectorExtensions: [EthersExtension],
      }}
    >
      <DynamicWidget />
      <Inner />
    </DynamicContextProvider>
  );
}

export default App;
