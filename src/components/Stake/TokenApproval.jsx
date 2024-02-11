import React, { useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";
import Button from "../Button";
import { toast } from "react-hot-toast";

const TokenApproval = () => {
    // Get the stake token contract and staking contract from context
    const { stakeTokenContract, stakingContract } = useContext(Web3Context);
    // Ref for the input field to approve token
    const approvedTokenRef = useRef();

    // Function to approve tokens
    const approveToken = async (e) => {
        e.preventDefault();
        const amount = approvedTokenRef.current.value.trim();
        if (isNaN(amount) || amount <= 0) {
            console.error("Please enter a valid positive number");
            return;
        }

        // Convert the amount to send to the appropriate format
        const amountToSend = ethers.parseUnits(amount, 18).toString();
        try {
            // Approve tokens
            const transaction = await stakeTokenContract.approve(stakingContract.target, amountToSend);

            // Show toast notification for transaction status
            await toast.promise(transaction.wait(), {
                loading: "Transaction Pending...",
                success: "Transaction Successful. ✅",
                error: "Transaction Failed. ❌"
            });

            // Clear the input field
            approvedTokenRef.current.value = "";
        } catch (error) {
            // Show error toast if token approval fails
            toast.error("Token Approval Failed...");
            console.error(error.message)
        }
    };

    return (
        <div>
            <form onSubmit={approveToken} className="token-amount-form">
                <label className="token-input-label">Token Approval:</label>
                <input type="text" ref={approvedTokenRef} />
                <Button onClick={approveToken} type="submit" label="Token Approval" />
            </form>
        </div>
    )
}

export default TokenApproval;