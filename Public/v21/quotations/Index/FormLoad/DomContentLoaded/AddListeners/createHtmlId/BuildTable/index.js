import { getKSTableConfig } from "./getKSTableConfig.js";
import { fetchItemsConfig } from "./helpers/fetch/itemsConfig.js";
import { modifyItemsConfig } from "./helpers/pure/modifyItemsConfig.js";
import { clearTableContainer } from "./helpers/dom/clearTableContainer.js";
import { initVertical } from "./helpers/ks/vertical.js";
import { initTable } from "./helpers/ks/table.js";

const startFunc = async () => {
    const config = await getKSTableConfig();

    const onSuccess = async (fromService) => {
        if (fromService) {
            const rawItemsConfig = await fetchItemsConfig();
            const itemsConfig = modifyItemsConfig(rawItemsConfig, fromService);

            const onUpdate = (updateFromService) => {
                console.log("----- : ", updateFromService);
            };

            window.ksTable1 = initTable(itemsConfig, onUpdate);
        }
    };

    window.ksVertical = initVertical(config, onSuccess);

    clearTableContainer();
};

export default startFunc;