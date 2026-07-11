// import { fetchItemsConfig } from "../fetch/itemsConfig.js";
import { modifyItemsConfig } from "../pure/modifyItemsConfig.js";
import { initTable } from "./table.js";
import { writeHtmlId } from "../dom/writeHtmlId.js";

import rawItemsConfig from "./config/itemsConfig.json" with { type: "json"};

const onSuccess = async (fromService) => {
    if (fromService) {
        // console.log("----- : ", fromService);
        writeHtmlId(fromService);

        // const rawItemsConfig = await fetchItemsConfig();
        const itemsConfig = modifyItemsConfig(rawItemsConfig, fromService);

        const onUpdate = (updateFromService) => {
            console.log("----- : ", updateFromService);
        };

        window.ksTable1 = initTable(itemsConfig, onUpdate);
    }
};

export { onSuccess };
