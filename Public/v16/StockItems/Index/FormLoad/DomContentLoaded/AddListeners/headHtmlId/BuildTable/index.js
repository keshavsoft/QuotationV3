import { getKSTableConfig } from "./getKSTableConfig.js";

const getData = async () => {
    const config = await fetch("/api/v4/ItemsTable/groupBy");
    // debugger;
    const data = await config.json();

    return await data;
};

const getHeadData = async () => {
    const config = await fetch("/api/v5/BillsTable/showAll");
    // debugger;
    const data = await config.json();

    return await data;
};

const clubData = async () => {
    const headData = await getHeadData();
    const gridSummary = await getData();

    const clubbedData = gridSummary.map(loopItem => {
        const foundHead = headData.find(loopHead => {
            return loopHead.pk === loopItem.ParentPk;
        });

        return {
            ...loopItem,
            LedgerName: foundHead ? foundHead?.LedgerName : "",
            InvoiceDate: foundHead ? foundHead?.InvoiceDate : ""
        }
    });

    return clubbedData;

};

const startFunc = async () => {
    const config = await getKSTableConfig();

    config.defaults.data = await clubData();

    ksTable1 = new window.ks.classes.tableShowOnly(config);
    ksTable1.initShowTable();

    // await callKSTable(config);
};

export default startFunc;