const getData = async () => {
    const config = await fetch("/api/v8/purExpVouchers/distinctLedgerName");
    const data = await config.json();

    return await data;
};

export default getData;