import { startFunc as createFooterRow } from "../CreateFooterRow/start.js";

const startFunc = ({
    inData,
    keys,
    inOnSaveFunc,
    onChangeFunc,
    inVisibleColumnsConfig,
    inDefaultRow,
    inShowSerial,
    inShowDataList,
    inShowSave
}) => {
    const localTr = createFooterRow({
        keys,
        options: {
            showSerial: false,
            showDataList: false,
            inColumnsConfig: inVisibleColumnsConfig
        },
        inDefaultRow,
        inTdClass: "px-4 py-2 border",
        inSerialClass: "",
        inShowSerial,
        inShowDataList,
        inShowSave,
        inOnSaveFunc,
        onChangeFunc,
        inVisibleColumnsConfig
    });

    return localTr;
};

export { startFunc };