import React, { useContext, useRef } from "react";
import { ethers } from "ethers"
import Web3Context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import Button from "../Button";
import { toast } from "react-hot-toast";
import "./Withdraw.css";

const WithdrawStakeAmount = () => {

  // Get the staking contract and reload state from context
  const { stakingContract } = useContext(Web3Context);
  const { isReload, setIsReload } = useContext(StakingContext);

  // Ref for the input field to withdraw stake amount
  const withdrawStakeAmountRef = useRef();

  // Function to withdraw stake tokens
  const withdrawStakeToken = async (e) => {
    e.preventDefault();
    const amount = withdrawStakeAmountRef.current.value.trim();

    // Check if the input is a valid positive number
    if (isNaN(amount) || amount <= 0) {
      console.error("Please enter a valid positive number");
      return;
    }

    // Convert the amount to withdraw to the appropriate format
    const amountToWithdraw = ethers.parseUnits(amount, 18).toString();

    try {
      // Withdraw stake tokens
      const transaction = await stakingContract.withdrawStakedTokens(amountToWithdraw);

      // Show toast notification for transaction status
      await toast.promise(transaction.wait(), {
        loading: "Transaction Pending...",
        success: 'Transaction Successful. ✅',
        error: 'Transaction Failed. ❌'
      });

      // Clear the input field and trigger a reload of staked amount
      withdrawStakeAmountRef.current.value = "";
      setIsReload(!isReload);
    } catch (error) {
      // Show error toast if withdraw fails
      toast.error("Withdraw Failed...");
      console.error(error.message)
    }
  };

  return (
    <form className="withdraw-form" onSubmit={withdrawStakeToken}>
      <label>Withdraw Token:</label>
      <input type="text" ref={withdrawStakeAmountRef} />
      <Button
        onClick={withdrawStakeToken}
        type="Submit"
        label="Withdraw Staked Token."
      />
    </form>
  )
}

export default WithdrawStakeAmount;
