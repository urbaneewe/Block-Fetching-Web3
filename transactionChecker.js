const Web3 = require('web3');

function getWeb3Provider() {
  const web3 = new Web3(
    'https://polygon-mainnet.g.alchemy.com/v2/fgBY4HZ5Y4bVUmDrpvLRvuWWwaGkp08a'
  );

  return web3;
}

/*Da bi koristio await mora async, zbog toga sto ocekujem da ce se nesto vratiti kasnije
(vratiti kasnije sa I/O-a zato sto je js single threaded pa da ne bi blokirao main thread)*/
async function getTransactionsFromBlock(blockNumber) {
  const web3 = getWeb3Provider();
  const block = await web3.eth.getBlock(blockNumber);
  const transactions = [];
  console.log('Block number: ' + blockNumber);

  if (block != null && block.transactions != null) {
    for (let txHash of block.transactions) {
      let tx = await web3.eth.getTransaction(txHash);
      transactions.push(tx);
    }
  }

  return transactions;
}

module.exports = { getTransactionsFromBlock }; //Uglavnom exprotovati kao objekat
