import { getData, getHeadData } from "./getData.js";
import { changeGridSummary } from "./changeGridSummary.js";
import { addTimeSpan } from "./addTimeSpan.js";

export const clubData = async () => {
    const headData = await getHeadData();
    const gridDataFromFetch = await getData();
    const gridSummary = changeGridSummary(gridDataFromFetch);

    const clubbedData = headData.map(loopHead => {
        const foundGrid = gridSummary.find(loopGrid => {
            return loopGrid.ParentPk === loopHead.pk;
        });

        return {
            ...foundGrid,
            ...loopHead
        }
    });

    const withTimeSpan = addTimeSpan(clubbedData);

    return withTimeSpan.toReversed();
};

export const clubDataFromGrid = async () => {
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
