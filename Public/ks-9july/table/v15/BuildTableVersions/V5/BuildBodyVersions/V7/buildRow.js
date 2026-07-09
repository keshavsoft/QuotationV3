import { createRow } from "./createRow.js";
import { createIndexCell } from "./createIndexCell.js";
import createDataCell from "./CreateDataCell/index.js";
import { createOptionsCell } from "./createOptionsCell.js";

const buildRow = ({ item, index, inVisibleColumnsConfig, searchValue,
    inShowSerial, inShowActions = false, onDeleteFunc, onEditFunc,
    inShowEdit, inShowDelete, inDeleteType, inDeleteIconSize,
    onUpdate, onShow
}) => {
    const tr = createRow({
        inClassName: "border-t hover:bg-blue-100 odd:bg-gray-100",
        inPk: item?.pk
    });

    appendSerialCell({ tr, inShowSerial, index });

    appendDataCells({
        tr, item, columns: inVisibleColumnsConfig,
        searchValue
    });

    if (inShowActions) {
        appendActionCell({
            tr, item, index, onDeleteFunc, onUpdate, onShow,
            onEditFunc, inShowEdit, inShowDelete, inDeleteType, inDeleteIconSize
        });
    };

    return tr;
};

const appendSerialCell = ({ tr, inShowSerial, index, inWidth }) => {
    if (inShowSerial) {
        tr.appendChild(createIndexCell({ index, inWidth }));
    };
};

const appendDataCells = ({ tr, item, columns, searchValue }) => {
    for (const [key, loopColumn] of Object.entries(columns)) {
        // console.log("value : ", value);

        tr.appendChild(createDataCell({
            value: item[loopColumn.columnName],
            searchValue,
            inCellConfig: loopColumn.cellConfig,
            inOnKeyDownType: loopColumn?.tableConfig?.footerConfig?.onKeyDownType,
            inEnterAsTab: loopColumn?.tableConfig?.footerConfig?.enterAsTab,
            inEvalformula: loopColumn?.tableConfig?.footerConfig?.evalformula,
            inEvalToControl: loopColumn?.tableConfig?.footerConfig?.evalToControl,
            inIsNotEmpty: loopColumn?.tableConfig?.footerConfig?.isNotEmpty
        }));
    };
};

const appendActionCell = ({ tr, item, index,
    onDeleteFunc, onEditFunc, onUpdate, onShow,
    inShowEdit, inShowDelete, inDeleteType, inDeleteIconSize }) => {
    // debugger;

    tr.appendChild(
        createOptionsCell({
            item,
            index, onUpdate,
            onDeleteFunc, onEditFunc, onShow,
            inShowEdit, inShowDelete, inDeleteType, inDeleteIconSize
        })
    );
};

export { buildRow };
