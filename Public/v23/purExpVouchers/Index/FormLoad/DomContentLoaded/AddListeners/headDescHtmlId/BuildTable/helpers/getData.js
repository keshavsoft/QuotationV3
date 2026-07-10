const expandLedgerData = (inData) => {
    const toReturnArray = [];

    inData.forEach(element => {
        element.allledgerentries.forEach(loopLedgerentries => {
            toReturnArray.push({
                ...element,
                ledgername: loopLedgerentries.ledgername,
                amount: loopLedgerentries.amount
            });
        });
    });

    return toReturnArray;
};

export const getData = async () => {
    const config = await fetch("/api/v7/purExpVouchers/showAll");
    const data = await config.json();

    return await expandLedgerData(data);
};

