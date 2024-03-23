var { Web3 } = require("web3");
var provider = "https://sepolia.infura.io/v3/115af45476674f7b910b65270e951035";
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);

web3.eth.getBlockNumber().then((result) => {
  console.log("Latest Ethereum Block is ", result);
});
