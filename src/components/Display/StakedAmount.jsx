import React, { useState, useEffect, useContext } from "react";
import Web3Context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

const StakedAmount = () => {
    // Get the staking contract and selected account from Web3Context
    const { stakingContract, selectedAccount } = useContext(Web3Context);

    // Get the reload state from StakingContext
    const { isReload } = useContext(StakingContext);

    // State to store the staked amount
    const [stakedAmount, setStakedAmount] = useState("0");

    useEffect(() => {
        // Function to fetch the staked balance
        const fetchStakedBalance = async () => {
            try {
                // Fetch the staked balance in wei
                const amountStakedWei = await stakingContract.stakedBalance(selectedAccount);

                // Convert the staked balance to ether
                const amountStakedEth = ethers.formatUnits(amountStakedWei.toString(), 18);

                // Update the state with the staked amount
                setStakedAmount(amountStakedEth);
            } catch (error) {
                // Show error toast if fetching the staked amount fails
                toast.error("Error fetching staked amount...");
                console.error(error.message);
            }
        };
        // Fetch the staked balance when staking contract, selected account, or reload state changes
        stakingContract && fetchStakedBalance();
    }, [stakingContract, selectedAccount, isReload]);

    return (
        // Render the staked amount component with the staked amount value
        <div className="staked-amount">
            <p>Staked Amount: </p> <span>{stakedAmount}</span>
        </div>
    );
};

export default StakedAmount;