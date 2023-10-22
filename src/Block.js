import alchemy from './alchemy';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Block() {
    const tx = useLocation().pathname.replace("/block/", "");

    const [details, setDetails] = useState();

    useEffect(() => {
        async function getBlockReceipt() {
            setDetails(await alchemy.core.getTransactionReceipt(tx));
        }

        tx && getBlockReceipt();
    }, [tx]);
    return (
        <div>
            <div>To: <a href={`/account/${details?.to}`} target='_blank'>{details?.to}</a> </div>
            <div>From: <a href={`/account/${details?.from}`} target='_blank'>{details?.from}</a> </div>
            <hr />
            <div>Details: {JSON.stringify(details)}</div>
        </div>
    )
}
