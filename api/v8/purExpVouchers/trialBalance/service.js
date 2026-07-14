import getData from "./getData.js";

const ledgerColumnName = "allledgerentries.ledgername";
const debitColumnName = "allledgerentries.debit";
const creditColumnName = "allledgerentries.credit";

const startFunc = async ({
    inTablePath,
    inColumnName = ledgerColumnName,
    inDebitColumnName = debitColumnName,
    inCreditColumnName = creditColumnName
}) => {
    const dataAsArray = await getData({ inTablePath });

    const [arrayColumnName, ledgerKey] = inColumnName.split(".");
    const [, debitKey] = inDebitColumnName.split(".");
    const [, creditKey] = inCreditColumnName.split(".");

    const grouped = dataAsArray.reduce((acc, voucher) => {
        const entries = voucher?.[arrayColumnName];

        if (!Array.isArray(entries)) {
            return acc;
        };

        entries.forEach(entry => {
            const ledgerName = entry?.[ledgerKey];

            if (!ledgerName) {
                return;
            };

            if (!acc[ledgerName]) {
                acc[ledgerName] = {
                    [ledgerKey]: ledgerName,
                    [debitKey]: 0,
                    [creditKey]: 0
                };
            };

            acc[ledgerName][debitKey] += Number(entry?.[debitKey]) || 0;
            acc[ledgerName][creditKey] += Number(entry?.[creditKey]) || 0;
        });

        return acc;
    }, {});

    return Object.values(grouped);
};

export { startFunc };
