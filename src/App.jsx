import React, { useState } from 'react';
import Wallet from "./components/Wallet";
import Navbar from "./components/Navbar/Navbar";
import Display from "./components/Display/Display";
import { StakingProvider } from "./context/StakingContext";

const App = () => {
  return (
    <div>
      <Wallet>
        <Navbar />
        <StakingProvider>
          <Display />
        </StakingProvider>
      </Wallet>
    </div>
  )
};

export default App;