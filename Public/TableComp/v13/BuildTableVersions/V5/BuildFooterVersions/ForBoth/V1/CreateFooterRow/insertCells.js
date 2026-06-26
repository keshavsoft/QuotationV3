import { createFooterCell } from "./createFooterCell.js";

const startFunc = ({ keys, tr, options = {}, inDefaultRow, inTdClass,
    inShowDataList, onChangeFunc, inVisibleColumnsConfig }) => {

    const defaultRow = inDefaultRow;

    inVisibleColumnsConfig.forEach(loopColumn => {
        const defaultValue = defaultRow[loopColumn.columnName];

        const createdFooterCell = createFooterCell({
            key: loopColumn.columnName,
            inDefaultValue: defaultValue,
            onChangeFunc,
            showDataList: inShowDataList,
            inColumnsConfig: options.inColumnsConfig,
            inTdClass,
            inAllowOnChange: loopColumn.allowOnChange,
            inOnChangeType: loopColumn.onChangeType,
            inOnKeyDown: loopColumn?.onKeyDown,
            inOnKeyDownType: loopColumn?.onKeyDownType,
            inDefaultRow: defaultRow
        });

        tr.appendChild(createdFooterCell);
    });

};

export { startFunc };
