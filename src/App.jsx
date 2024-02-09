import React, { useState } from 'react';
import Wallet from "./components/Wallet";
import Navbar from "./components/Navbar/Navbar";
import Display from "./components/Display/Display";
import TokenApproval from "./components/Stake/TokenApproval";
import StakeAmount from './components/Stake/StakeAmount';
import WithdrawStakeAmount from './components/Withdraw';
import { StakingProvider } from "./context/StakingContext";

const App = () => {
  const [displaySection, setDisplaySection] = useState("Stake");

  const handleButtonClick = (section) => {
    setDisplaySection(section);
  };

  return (
    <div>
      <Wallet>
        <Navbar />
        <StakingProvider>
          <Display />
          <div>
            <div>
              <button onClick={() => handleButtonClick("Stake")} className={displaySection === "Stake" ? "" : "active"}>Stake</button>
              <button onClick={() => handleButtonClick("Withdraw")} className={displaySection === "Withdraw" ? "" : "active"}>Withdraw</button>
            </div>
            {displaySection === "Stake" && (
              <div>
                <TokenApproval />
                <StakeAmount />
              </div>
            )}
            {displaySection === "Withdraw" && (
              <div>
                <WithdrawStakeAmount />
              </div>
            )}
          </div>
        </StakingProvider>
      </Wallet>
    </div>
  )
};

export default App;