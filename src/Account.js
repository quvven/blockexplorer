import alchemy from './alchemy';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Account() {
    const account = useLocation().pathname.replace("/account/", "");

    const [blockNumber, setBlockNumber] = useState();
    const [transactions, setTransactions] = useState([]);
    const [blockDetails, setBlockDetails] = useState();

    useEffect(() => {
        async function getAccountTx() {
            if (account) {
                setBlockNumber(await alchemy.core.getTransactionCount(account));
            }
        }

        getAccountTx()

    }, [account]);


    useEffect(() => {
        async function getTransactions() {
            const txs = await alchemy.core.getBlockWithTransactions(blockNumber);

            setTransactions((state) => [...state, ...txs.transactions]);

            setBlockDetails((state) => {
                delete txs.transactions;
                return txs;
            });

        }

        blockNumber && getTransactions();
    }, [blockNumber]);


    return (
        <div>
            <div>Account: {JSON.stringify(account)}</div>
            <div>Block: {JSON.stringify(blockDetails)}</div>

            <div>Transactions:
                {transactions.map((tx) => (
                    <div>Transaction: <a href={`/block/${tx.hash}`} target='_blank'>{tx.hash}</a> </div>
                ))}
            </div>
        </div>
    )
}
