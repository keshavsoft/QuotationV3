import createTd from "./createTd.js";
import applyWidth from "./applyWidth.js";
import applyRightAlign from "./applyRightAlign.js";
import getDisplayValue from "./getDisplayValue.js";
import setCellContent from "./setCellContent.js";

const createDataCell = ({
    value,
    searchValue,
    inCellConfig = {}
}) => {

    const width =
        inCellConfig.width;

    const td = createTd({
        inValue: value, inRightAlign: inCellConfig.rightAlign,
        inWidth: width, inSearchValue: searchValue
    });

    // applyWidth({
    //     td,
    //     inWidth: width
    // });

    // applyRightAlign({
    //     td,
    //     inCellConfig
    // });

    // const displayValue = getDisplayValue({
    //     value,
    //     inCellConfig
    // });

    // setCellContent({
    //     td,
    //     displayValue,
    //     searchValue
    // });

    return td;

};

export default createDataCell;