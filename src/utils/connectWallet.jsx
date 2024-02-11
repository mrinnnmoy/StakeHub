import { ethers, Contract } from "ethers";
import StakingABI from "../ABI/StakingABI.json"
import GoldABI from "../ABI/GoldABI.json";

export const connectWallet = async () => {
    try {
        // Initialize variables for signer, provider, staking contract, stake token contract, and chain ID
        let [signer, provider, stakingContract, stakeTokenContract, chainId] = [null, null, null, null, null];

        // Check if MetaMask is installed
        if (window.ethereum === null) {
            throw new Error("MetaMask is not installed...");
        }

        // Request access to user's Ethereum accounts
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        })

        // Get the current chain ID
        let chainIdHex = await window.ethereum.request({
            method: 'eth_chainId'
        })
        chainId = parseInt(chainIdHex, 16)

        // Get the selected Ethereum account
        let selectedAccount = accounts[0];
        if (!selectedAccount) {
            throw new Error("No Ethereum accounts available...")
        }

        // Create a new ethers provider using the browser provider
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();

        // Set the contract addresses for staking and stake token contracts
        const stakingContractAddress = "0x217923b25F1B9AF472E35026B7A8aDf37c1FF631";
        const stakeTokenContractAddress = "0xd0eDAa51A054337d2CEc7C31Ca27FB9543ae22C4";

        // Create instances of the staking and stake token contracts
        stakingContract = new Contract(stakingContractAddress, StakingABI, signer);
        stakeTokenContract = new Contract(stakeTokenContractAddress, GoldABI, signer);

        // Return the provider, selected account, stake token contract, staking contract, and chain ID
        return { provider, selectedAccount, stakeTokenContract, stakingContract, chainId }

    } catch (error) {
        // Handle errors
        console.error(error);
        throw error
    }
}
