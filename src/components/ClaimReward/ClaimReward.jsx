import React, { useContext } from "react";
import Web3Context from "../../context/Web3Context";
import Button from "../Button";
import { toast } from "react-hot-toast";
import "./ClaimReward.css";

const ClaimReward = () => {
  // Get the staking contract from Web3Context
  const { stakingContract } = useContext(Web3Context);

  // Function to claim the reward
  const claimReward = async () => {
    try {
      // Call the getReward function on the staking contract
      const transaction = await stakingContract.getReward();
      
      // Show toast notification for transaction status
      await toast.promise(transaction.wait(), {
        loading: "Transaction Pending...",
        success: 'Transaction Successful. ✅',
        error: 'Transaction Failed. ❌'
      });
    } catch (error) {
      // Show error message if claiming the reward fails
      console.error("Claim Reward Failed.", error.message);
    }
  }

  return (
    <>
      {/* Render the claim reward button */}
      <div className="claim-reward">
        <Button type="button" label="Claim Reward" onClick={claimReward} />
      </div>
    </>
  )
}

export default ClaimReward;