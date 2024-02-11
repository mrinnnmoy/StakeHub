import React, { useState, useEffect } from "react";
import { connectWallet } from "../../utils/connectWallet";
import Web3Context from "../../context/Web3Context";
import Button from "../Button";
import { handleAccountChange } from "../../utils/handleAccountChange";
import { handleChainChange } from "../../utils/handleChainChange";
import { toast } from "react-hot-toast";
import "./Wallet.css";

const Wallet = ({ children }) => {

  // State to manage wallet connection and context data
  const [state, setState] = useState({
    provider: null,
    account: null,
    stakingContract: null,
    stakeTokenContract: null,
    chainId: null
  })

  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);

  // Subscribe to account and chain changes
  useEffect(() => {
    window.ethereum.on('accountsChanged', () => handleAccountChange(setState))
    window.ethereum.on('chainChanged', () => handleChainChange(setState))

    return () => {
      window.ethereum.removeListener('accountsChanged', () => handleAccountChange(setState))
      window.ethereum.removeListener('chainChanged', () => handleChainChange(setState))
    }
  }, [])

  // Function to handle wallet connection
  const handleWallet = async () => {
    try {
      setIsLoading(true);
      const { provider, selectedAccount, stakingContract, stakeTokenContract, chainId } = await connectWallet();
      setState({ provider, selectedAccount, stakingContract, stakeTokenContract, chainId })

    } catch (error) {
      toast.error("Error connecting wallet")
      console.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="Connect-Wallet">
      {/* Provide the Web3 context to children */}
      <Web3Context.Provider value={state}>{children}</Web3Context.Provider>
      {/* Show loading indicator if loading */}
      {isLoading && <p>Loading...</p>}
      {/* Button to connect wallet */}
      <Button onClick={handleWallet} type="button" label="Connect Wallet" />
    </div>
  )
}

export default Wallet;
