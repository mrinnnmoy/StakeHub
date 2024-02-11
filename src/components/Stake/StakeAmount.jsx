import React, { useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";
import Button from "../Button";
import StakingContext from "../../context/StakingContext";
import { toast } from "react-hot-toast";
import "./Stake.css";

const StakeAmount = () => {
    // Get the staking contract and reload state from context
    const { stakingContract } = useContext(Web3Context);
    const { isReload, setIsReload } = useContext(StakingContext);

    // Ref for the input field to stake amount
    const stakeAmountRef = useRef();

    // Function to stake tokens
    const stakeToken = async (e) => {
        e.preventDefault();
        const amount = stakeAmountRef.current.value.trim();

        // Check if the input is a valid positive number
        if (isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid positive number...");
            return;
        }

        // Convert the amount to stake to the appropriate format
        const amountToStake = ethers.parseUnits(amount, 18).toString();

        try {
            // Stake tokens
            const transaction = await stakingContract.stake(amountToStake);

            // Show toast notification for transaction status
            await toast.promise(transaction.wait(), {
                loading: "Transaction Pending...",
                success: "Transaction Successful. ✅",
                error: "Transaction Failed. ❌"
            });

            // Clear the input field and trigger a reload of staked amount
            stakeAmountRef.current.value = "";
            setIsReload(!isReload);
        } catch (error) {
            // Show error toast if staking fails
            toast.error("Staking Failed...");
            console.error(error.message)
        }
    };

    return (
        <form onSubmit={stakeToken} className="stake-amount-form">
            <label className="stake-input-label">Enter Staked Amount:</label>
            <input type="text" ref={stakeAmountRef} />
            <Button onClick={stakeToken} type="submit" label="Stake Token" />
        </form>
    )
}

export default StakeAmount;