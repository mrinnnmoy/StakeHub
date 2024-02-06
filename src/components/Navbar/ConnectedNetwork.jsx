import React, { useContext } from 'react';
import Web3Context from "../../context/Web3Context";

const ConnectedNetwork = () => {
  const { chainId } = useContext(Web3Context);

  if (chainId === null) {
    return <p>Not Connected...</p>
  } else if (chainId === 11155111) {
    return <p>Sepolia</p>
  } else {
    return <p>Change to Sepolia...</p>
  }
};

export default ConnectedNetwork;