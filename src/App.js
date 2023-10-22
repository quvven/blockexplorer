import alchemy from './alchemy';
import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  useEffect(() => {
    async function getTransactions() {
      const txs = await alchemy.core.getBlockWithTransactions(blockNumber);

      setTransactions((state) => [...state, ...txs.transactions]);
    }

    blockNumber && getTransactions();
  }, [blockNumber]);

  return (
    <div id='App'>
      <div>Block Number: {blockNumber}</div>
      <hr />
      {transactions.map((tx) => (
        <div>Transaction: <a href={`/block/${tx.hash}`} target='_blank'>{tx.hash}</a> </div>
      ))}
    </div>
  );
}

export default App;
