import { ethers, Contract } from "ethers";
import StakingABI from "../ABI/StakingABI.json"
import GoldABI from "../ABI/GoldABI.json";


export const connectWallet = async () => {
    try {
        let [signer, provider, stakingContract, stakeTokenContract, chainId] = [null, null, null, null, null];
        if (window.ethereum === null) {
            throw new Error("Metamsk is not installed...");
        }
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        })

        let chainIdHex = await window.ethereum.request({
            method: 'eth_chainId'
        })
        chainId = parseInt(chainIdHex, 16)

        let selectedAccount = accounts[0];
        if (!selectedAccount) {
            throw new Error("No ethereum accounts available...")
        }

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();

        const stakingContractAddress = "";
        const stakeTokenContractAddress = "";

        stakingContract = new Contract(stakingContractAddress, StakingABI, signer);
        stakeTokenContract = new Contract(stakeTokenContractAddress, GoldABI, signer);

        return { provider, selectedAccount, stakeTokenContract, stakingContract, chainId }

    } catch (error) {
        console.error(error);
        throw error
    }

}