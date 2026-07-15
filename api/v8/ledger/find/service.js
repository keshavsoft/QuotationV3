import getData from "./getData.js";

const startFunc = async ({ ledgerName, inTablePath }) => {
    const dataAsArray = await getData({ inTablePath });
    const allEntries = [];

    dataAsArray.forEach(element => {
        element.allledgerentries.forEach(loopLedger => {
            allEntries.push({
                date: element.date,
                vouchernumber: element.vouchernumber,
                ledgername: loopLedger.ledgername,
                credit: loopLedger.credit,
                debit: loopLedger.debit
            })
        });
    });

    const ledgerEntries = allEntries.filter(element => {
        return element.ledgername === ledgerName;
    });

    return await ledgerEntries;
};

export { startFunc };
