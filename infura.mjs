import fetch from 'node-fetch';

fetch("https://sepolia.infura.io/v3/your-api-token", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: 1
  })
})
.then(response =>
  response.json()
)
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error(error);
});