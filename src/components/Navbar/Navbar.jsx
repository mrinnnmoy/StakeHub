import React from 'react';
import ConnectedAccount from './ConnectedAccount';
import ConnectedNetwork from './ConnectedNetwork';
import ClaimReward from "../ClaimReward/ClaimReward";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className='navbar'>
      <div className='navbar-btns'>
        <ClaimReward />
      </div>
      <p>StakeHub</p>
      <div className='navbar-acc'>
        <ConnectedAccount />
        <ConnectedNetwork />
      </div>
    </header>
  )
};

export default Navbar;