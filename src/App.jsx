import React, { useState } from 'react';
import Wallet from "./components/Wallet";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <div>
      <Wallet>
        <Navbar />
      </Wallet>
    </div>
  )
};

export default App;