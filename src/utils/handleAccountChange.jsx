export const handleAccountChange = async (setState) => {
    // Request access to user's Ethereum accounts
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
    })
    // Get the selected Ethereum account
    const selectedAccount = accounts[0];
    console.log(selectedAccount)
    // Update the state with the selected account
    setState(prevState => ({ ...prevState, selectedAccount }))
}