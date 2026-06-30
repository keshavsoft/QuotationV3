import { fetchConfig } from "./getKSTableConfig/fetchConfig.js";
import { fetchLastRecord } from "./getKSTableConfig/fetchLastRecord.js";
import { transformConfig } from "./getKSTableConfig/transformConfig.js";

export const getKSTableConfig = async () => {
    try {
        const [configJson, lastPk] = await Promise.all([
            fetchConfig(),
            fetchLastRecord()
        ]);

        return await transformConfig({ configJson, lastPk });
    } catch (error) {
        console.error("Error loading table configuration:", error);
        throw error;
    }
};
