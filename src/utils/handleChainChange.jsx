export const handleChainChange = async (setState) => {
    // Get the current chain ID
    let chainIdHex = await window.ethereum.request(
        { method: 'eth_chainId' }
    )
    const chainId = parseInt(chainIdHex, 16);
    console.log(chainId)
    // Update the state with the chain ID
    setState(prevState => ({ ...prevState, chainId }))
}