import { getKSTableConfig } from "./getKSTableConfig.js";
import showByPk from "./showByPk.js";

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

const addTimeSpan = (rawData) => {
    const now = new Date();

    const processedData = Array.isArray(rawData) ? rawData.map((row) => {
        console.log("dddddddd L ", row.DateTime);

        if (!row.DateTime) {
            return { ...row, DateTimeDiff: "" };
        }
        const rowDate = new Date(row.DateTime);
        if (isNaN(rowDate.getTime())) {
            return { ...row, DateTimeDiff: "" };
        }

        const diffMs = now - rowDate;
        if (diffMs < 0) {
            return { ...row, DateTimeDiff: "Future" };
        }

        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        let diffStr = "";
        if (diffSecs < 60) {
            diffStr = "Just now";
        } else if (diffMins < 60) {
            diffStr = `${diffMins}m ago`;
        } else if (diffHours < 24) {
            diffStr = `${diffHours}h ago`;
        } else if (diffDays === 1) {
            diffStr = "Yesterday";
        } else {
            diffStr = `${diffDays}d ago`;
        }

        return { ...row, DateTimeDiff: diffStr };
    }) : [];

    return processedData;
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

    const withTimeSpan = addTimeSpan(clubbedData);

    return withTimeSpan.toReversed();
};

const startFunc = async () => {
    const config = await getKSTableConfig();

    config.defaults.data = await clubData();

    if (config.callbacks) {
        if (config.callbacks.table.body.show) {
            config.callbacks.table.body.show = fromLibrary => {
                showByPk(fromLibrary.item.ParentPk)
                // console.log("fromLibrary : ", fromLibrary);
            };
        }
    };

    ksTable1 = new window.ks.classes.tableShowOnly(config);
    ksTable1.initShowTable();

    // await callKSTable(config);
};

export default startFunc;