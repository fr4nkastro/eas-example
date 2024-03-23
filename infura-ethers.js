const ethers = require('ethers');

const provider = ethers.getDefaultProvider('https://sepolia.infura.io/v3/your-api-token');

provider.getBlockNumber()
.then(blockNumber => {
  console.log(blockNumber);
})
.catch(error => {
  console.error(error);
});

provider.getTransactionCount("0x1684C2a107C113c4CCB02dF651933978491dB385")
.then(transactionCount => {
  console.log(transactionCount);
})
.catch(error => {
  console.error(error);
});
