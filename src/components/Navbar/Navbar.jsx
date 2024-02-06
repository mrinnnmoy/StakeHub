import React from 'react';
import ConnectedAccount from './connectedAccount';
import ConnectedNetwork from './ConnectedNetwork';
import ClaimReward from "../ClaimReward";

const Navbar = () => {
  return (
    <header>
      <div>
        <ClaimReward />
      </div>
      <div>
        <ConnectedAccount />
        <ConnectedNetwork />
      </div>
    </header>
  )
};

export default Navbar;