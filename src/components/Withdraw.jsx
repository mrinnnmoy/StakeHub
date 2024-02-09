import React, { useContext, useRef } from "react";
import { ethers } from "ethers"
import Web3Context from "../context/Web3Context";
import StakingContext from "../context/StakingContext";
import Button from "./Button";
import { toast } from "react-hot-toast";

const WithdrawStakeAmount = () => {
  const { stakingContract } = useContext(Web3Context);
  const { isReload, setIsReload } = useContext(StakingContext)
  const withdrawStakeAmountRef = useRef();

  const withdrawStakeToken = async (e) => {
    e.preventDefault();
    const amount = withdrawStakeAmountRef.current.value.trim();
    console.log(amount)
    if (isNaN(amount) || amount <= 0) {
      console.error("Please enter a valid positive number");
      return;
    }

    const amountToWithdraw = ethers.parseUnits(amount, 18).toString();
    console.log(amountToWithdraw)
    try {
      const transaction = await stakingContract.withdrawStakedTokens(amountToWithdraw)
      await toast.promise(transaction.wait(),
        {
          loading: "Transaction Pending...",
          success: 'Transaction Successfull. ✅',
          error: 'Transaction Failed. ❌'
        });
      withdrawStakeAmountRef.current.value = "";
      setIsReload(!isReload);
    } catch (error) {
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