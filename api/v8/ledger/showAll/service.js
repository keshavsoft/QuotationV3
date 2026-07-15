import getData from "./getData.js";

const startFunc = async ({ inTablePath }) => {
    const dataAsArray = await getData({ inTablePath });
    const ledgerEntries = [];

    dataAsArray.forEach(element => {
        element.allledgerentries.forEach(loopLedger => {
            ledgerEntries.push({
                date: element.date,
                vouchernumber: element.vouchernumber,
                ledgername: loopLedger.ledgername,
                credit: loopLedger.credit,
                debit: loopLedger.debit
            })
        });
    });

    return await ledgerEntries;
};

export { startFunc };
