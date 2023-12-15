# StakeHub

A decentralized application that enables users to stake ERC20 tokens and earn rewards in return.

## Key Tokens

- **Stake Token** : GOLD, ERC20 token used for staking within the DApp.
- **Reward Token** : FIAT, Another ERC20 token generated as reward for staking.

## Demo Image

![Demo-Image](./demo-img.png)

## Functionality

1. **Stake Tokens:**
* Users approve a certain amount of stake tokens to be staked within the DApp by interacting with the staking smart contract.

2. **Generate Reward:**
* Once the stake tokens are staked, the smart contract generates reward tokens per second based on the staked amount.

3. **Accumulate Rewards:**
* Users accumulate reward tokens over time as they keep their stake tokens staked within the DApp.

4. **Claim Rewards:**
* Users can claim their accumulated rewards by interacting with the smart contract using the getReward() function.

5. **Unstake Tokens:**
* After a staking period or at any point, users can unstake their tokens using the appropriate function in the DApp to retrieve their staked tokens along with the accumulated rewards.

## Contributions to this repo are WELCOME ⚡👋

* :art: Any improvements to the design and UI are welcome.
* :hammer: try to break the website by testing it to find any bugs. If you find any, check if there is an issue already open for it, if there is none, then report it.

## Tools, Languages and Frameworks used

* React JS
* Ether JS
* Solidity
* Hardhat

## Steps to be followed in order to make valid contributions to this repo 🍀

**1.** Fork the [StakeHub](https://github.com/mrinnnmoy/stakehub) repo by clicking on the fork button on the top of the page. This will create a copy of this repository in your account.

**2.** Clone the forked repository

        git clone "https://github.com/<your-github-username>/stakehub"

* Download and install Node JS v16.16.0
* Download and install Git.
* Go to the terminal of your code editor and run "npm install" to download packages.
* Run "npm run dev" to start a local server.

**3.** Make necessary changes and commit those changes. <br />
Remember never push anything to the Main branch. <br />

Always change your branch to "develop" using:

    git checkout develop

Again check your current branch using:

    git branch

It should point \*develop

Now add your changes using:

    git add files-you-edited

If there are multiple files you can use:

    git add .

Now create a commit message using:

    git commit -m "<commit-message-goes-here>"

**4.** Push changes to GitHub

    git push origin develop

**5.** Create a Pull Request 👋<br>

Now you go to your repository on GitHub, you’ll see a `Compare & pull request` button. Click on that button and now write a summary of what changes you have done.( Attach images if required). I will review your code and merge it if it passes all the tests.❤️