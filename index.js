const express = require('express');
const tsChecker = require('./transactionChecker');

const app = express();

app.get('/:blockNumber', async (req, res, next) => {
  console.log('Fetching...');
  const blockNumber = req.params.blockNumber;
  const transactions = await tsChecker.getTransactionsFromBlock(blockNumber); //Ide isto async i await da bi dobili vrednost a ne objekat

  res.status(200).json(transactions);
}); //Registracija middleware-a

//Ne mora da se definise broj bloka. Napomena: Bitan redosled pozivanja
app.get('/', async (req, res, next) => {
  console.log('Fetching...');
  const blockNumber = 'latest';
  const transactions = await tsChecker.getTransactionsFromBlock(blockNumber); //Ide isto async i await da bi dobili vrednost a ne objekat

  res.status(200).json(transactions);
});

app.listen(3000); //Registracija servera
