//{"Contributors":["jetstream0"], "title":"How to Send Tokens Using Ethers.js", "description": "Sending tokens with Ethers.js is simple"}
# How to Send Tokens Using Ethers.js
---
[Ethers.js](https://github.com/ethers-io/ethers.js/) is a great javascript library for interacting with the Ethereum blockchain.
One of the more useful things it can do is interact with ERC-20 Smart Contracts, aka Tokens.
Here's the code:
```
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const signer = provider.getSigner();

let wallet = new ethers.Wallet(PRIVKEY);
wallet = wallet.connect(provider);
let token = new ethers.Contract(CONTRACT_ADDR, ABI, wallet);

token.transfer(ADDR, ethers.utils.parseUnits(AMOUNT, DECIMALS));
```
Now, let's go over it line by line.
The first line imports the module. Nothing interesting here.
The next line, `const provider = new ethers.providers.JsonRpcProvider(RPC_URL);` creates a provider based on the RPC url given. Essentially, the RPC url is connected to a node that will act as your gateway to the network.
A list of some RPC urls:
- ETH mainnet: https://api.mycryptoapi.com/eth, https://cloudflare-eth.com
- xDai: https://rpc.xdaichain.com
- Matic (Polygon): https://rpc-mainnet.matic.network
- Binance Smart Chain: https://bsc-dataseed.binance.org/
- Kovan Testnet: https://kovan.poa.network
The third line defines `signer`. A signer is the eth acccount, which can sign transactions or messages.
The fourth line creates a wallet from the private key
~ Warning: Do not store your private key in plain text (use environmental variables) or share it with anyone, as __anyone with the private key can steal your funds__
Then, the wallet and the provider are linked.
The second to last line (`let token = new ethers.Contract(CONTRACT_ADDR, ABI, wallet);`) gets the token by its contract address and ABI (Application Binary Interface). ERC-20 Contracts all should have more or less the same ABI, so you can usually just copy the one [linked here](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/). However, if it doesn't, you can usually find the ABI for verified contracts on [etherscan](https://etherscan.io/).
The last line is the one that actually sends the tokens. `ADDR` is the address to send to, and `AMOUNT` is the amount in whole coins, which then is converted into raw. The `DECIMAL` field is usually 18, but that depends on the number of decimals the token you are sending has. Additionally, you can override the default gas fees by adding `{gasPrice: GAS PRICE HERE, gasLimit: GAS LIMIT HERE}` as a parameter at the end, like so:
```
token.transfer(ADDR, ethers.utils.parseUnits(AMOUNT, DECIMALS), {gasPrice: GAS PRICE HERE, gasLimit: GAS LIMIT HERE});
```
~ Warning: Please be careful with gas fees