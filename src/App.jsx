import React, { useState } from 'react';
import Wallet from "./components/Wallet/Wallet";
import Navbar from "./components/Navbar/Navbar";
import Display from "./components/Display/Display";
import TokenApproval from "./components/Stake/TokenApproval";
import StakeAmount from './components/Stake/StakeAmount';
import WithdrawStakeAmount from './components/Withdraw/Withdraw';
import { StakingProvider } from "./context/StakingContext";

const App = () => {
  // State to manage which section to display
  const [displaySection, setDisplaySection] = useState("Stake");

  // Function to handle button click and update display section
  const handleButtonClick = (section) => {
    setDisplaySection(section);
  };

  return (
    <div className='main-section'>
      <Wallet>
        <Navbar />
        <StakingProvider>
          <Display />
          <div className='main-content'>

            {/* Button section to switch between Stake and Withdraw */}
            <div className='button-section'>
              <button onClick={() => handleButtonClick("Stake")} className={displaySection === "Stake" ? "" : "active"}>Stake</button>
              <button onClick={() => handleButtonClick("Withdraw")} className={displaySection === "Withdraw" ? "" : "active"}>Withdraw</button>
            </div>

            {/* Conditional rendering based on displaySection state */}
            {displaySection === "Stake" && (
              <div className='stake-wrapper'>
                <TokenApproval />
                <StakeAmount />
              </div>
            )}
            {displaySection === "Withdraw" && (
              <div className='stake-wrapper'>
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