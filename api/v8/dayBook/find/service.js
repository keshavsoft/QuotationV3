import getData from "./getData.js";

const startFunc = async ({ fromDate, toDate, inTablePath }) => {
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

    const dateFilteredRows = allEntries.filter(element => {
        return element.date >= fromDate && element.date <= toDate;
    });

    return await dateFilteredRows;
};

export { startFunc };
