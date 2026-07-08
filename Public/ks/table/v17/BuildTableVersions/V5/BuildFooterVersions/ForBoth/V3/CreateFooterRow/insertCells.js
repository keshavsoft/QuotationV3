import { createFooterCell } from "./createFooterCell.js";

const startFunc = ({ keys, tr, options = {}, inDefaultRow,
    inShowDataList, onChangeFunc, inVisibleColumnsConfig,
    inDataStore, inConfig }) => {

    const defaultRow = inDefaultRow;

    inVisibleColumnsConfig.forEach(loopColumn => {
        const defaultValue = defaultRow ? defaultRow[loopColumn.columnName] : "";
        // console.log("loopColumn-------- : ", loopColumn?.cellConfig);

        const createdFooterCell = createFooterCell({
            key: loopColumn.columnName,
            inDefaultValue: defaultValue,
            onChangeFunc,
            showDataList: inShowDataList,
            inColumnsConfig: options.inColumnsConfig,
            inTdClass: loopColumn?.cellConfig?.uiClasses?.table?.tfoot?.tdClass,
            inAllowOnChange: loopColumn.allowOnChange,
            inOnChangeType: loopColumn.onChangeType,
            inOnKeyDown: loopColumn?.onKeyDown,
            inDefaultRow: defaultRow,
            inType: loopColumn.type,
            inRightAlign: loopColumn?.cellConfig?.rightAlign,
            inWidth: loopColumn?.cellConfig?.width,
            inputClassName: loopColumn?.cellConfig?.uiClasses?.table?.tfoot?.inputClass,
            inDataListSource: loopColumn?.dataListSource,
            inDataStore,
            inDataListFillName: loopColumn?.dataListFillName,
            inFooterConfig: loopColumn?.tableConfig?.footerConfig
        });

        tr.appendChild(createdFooterCell);
    });

};

export { startFunc };
