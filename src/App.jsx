import React, { useState } from 'react';
import Wallet from "./components/Wallet";
import Navbar from "./components/Navbar/Navbar";
import Display from "./components/Display/Display";
import TokenApproval from "./components/Stake/TokenApproval";
import StakeAmount from './components/Stake/StakeAmount';
import { StakingProvider } from "./context/StakingContext";

const App = () => {
  return (
    <div>
      <Wallet>
        <Navbar />
        <StakingProvider>
          <Display />
          <div>
            <div>
              <button>Stake</button>
            </div>
            <div>
              <TokenApproval />
              <StakeAmount />
            </div>
          </div>
        </StakingProvider>
      </Wallet>
    </div>
  )
};

export default App;