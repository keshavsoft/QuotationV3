const getData = async () => {
    const config = await fetch("/api/v8/purExpVouchers/trialBalance");
    const data = await config.json();
    return await calculateBalance(data);
};

const calculateBalance = (inData) => {
    const balanceArray = inData.map(element => {
        return {
            ...element,
            creditBalance: element.credit > element.debit ? element.credit - element.debit : 0,
            debitBalance: element.debit > element.credit ? element.debit - element.credit : 0
        }
    });

    return balanceArray;
};

export default getData;