import React, { useContext } from "react";
import Web3Context from "../context/Web3Context"
import Button from "./Button";
import { toast } from "react-hot-toast";

const ClaimReward = () => {
  const { stakingContract } = useContext(Web3Context);

  const claimReward = async () => {
    try {
      const transaction = await stakingContract.getReward();
      await toast.promise(transaction.wait(),
        {
          loading: "Transaction Pending...",
          success: 'Transaction Successfull. ✅',
          error: 'Transaction Failed. ❌'
        });
    } catch (error) {
      console.error("Claim Reward Failed.", error.message);
    }
  }

  return (
    <>
      <div className="claim-reward">
        <Button type="button" label="Claim Reward" onClick={claimReward} />
      </div>
    </>
  )
}

export default ClaimReward;