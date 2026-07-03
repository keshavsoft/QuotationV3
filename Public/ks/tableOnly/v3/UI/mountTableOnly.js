import { buildFullUI } from "./compose/buildFullUI.js";

import buildHeader from "../BuildTableVersions/V5/BuildHeaderVersions/V4/index.js";

import buildBody from "../BuildTableVersions/V5/BuildBodyVersions/V6/start.js";
import searchFuncs from "../SearchFuncs/V5/index.js";
import setFocus from "../SetFocus/V4/index.js";
import buildFooter from "../BuildTableVersions/V5/BuildFooterVersions/ForBoth/V2/start.js";

const startFunc = ({
    containerEl,
    dataStore,
    dom,
    services,
    options,
    endPoints,
    uiClasses,
    inDefaults,
    inConfig
}) => {
    // debugger
    const visibleColumnsConfig = dataStore.getVisibleColumnsConfig();

    const showSerial = options.table.showSerial;
    const serialWidth = options.table.serialWidth;
    const showDataList = options.table.showDataList;

    const dataListColumns = dataStore.getDataListColumns();

    const showTotals = options?.table?.showTotals;
    const showBalance = options?.table?.showBalance;
    const showSearch = options.firstRow.showSearch;
    const showTotalsForSearch = options?.table?.showTotalsForSearch;
    const showBalanceForSearch = options?.table?.showBalanceForSearch;

    const showActions = options?.table?.showActions;
    const showFooter = options?.table?.showFooter;
    const optionsWidth = options.table.optionsWidth;
    const footerOptions = options.table?.footer;

    const toSaveRow = dataStore.getToSaveRow();

    const inShowEdit = options?.table?.body?.showEdit;
    const inShowDelete = options?.table?.body?.showDelete;
    const inDeleteType = options?.table?.body?.deleteType;
    const inDeleteIconSize = options?.table?.body?.deleteIconSize;
    const defaults = inDefaults;
    const data = defaults.data;
    // console.log("defaults : ", defaults);

    buildFullUI({
        containerEl: containerEl,
        inTableName: inConfig.tableName,
        inIsShowHeaderRow: showSearch,
        inShowSerial: showSerial,
        inSerialWidth: serialWidth,
        inShowActions: showActions,
        inShowEdit, inShowDelete, inDeleteType, inDeleteIconSize
    });

    buildHeader({
        inContainerEl: containerEl,
        inDom: dom,
        inThClassName: uiClasses?.thead?.thClass,
        inTrClassName: uiClasses?.thead?.trClass,
        inThSerialClassName: uiClasses?.thead?.thSerialClass,
        inVisibleColumnsConfig: visibleColumnsConfig,
        inShowSerial: showSerial,
        inSerialWidth: serialWidth,
        inShowActions: showActions,
        inOptionsWidth: optionsWidth,
    });

    const tableBody = dom.getTableBody(containerEl);

    buildBody({
        inVisibleColumnsConfig: visibleColumnsConfig,
        inTableBody: tableBody,
        inData: data,
        inServices: services,
        inEndPoints: endPoints,
        inDataStore: dataStore,
        inConfig,
        inTableFooter: dom.getTableFooter(containerEl)
    });
    // debugger;
    if (showFooter) {
        buildFooter({
            inTableFooter: dom.getTableFooter(containerEl),
            options,
            inVisibleColumnsConfig: visibleColumnsConfig,
            inData: data,
            inShowTotals: showTotals,
            inShowBalance: showBalance,
            inShowTotalsForSearch: showTotalsForSearch,
            inShowBalanceForSearch: showBalanceForSearch,
            inShowDataList: showDataList,
            inServices: services,
            inEndPoints: endPoints,
            inDataStore: dataStore,
            inTableBody: tableBody,
            inOptions: footerOptions,
            inToSaveRow: toSaveRow
        });
    };

    if (showSearch) {
        // for search vertical
        searchFuncs({ inContainerEl: containerEl });
    };

    setFocus({ inContainerEl: containerEl });
};

const startFunc1 = () => {

};

export default startFunc;