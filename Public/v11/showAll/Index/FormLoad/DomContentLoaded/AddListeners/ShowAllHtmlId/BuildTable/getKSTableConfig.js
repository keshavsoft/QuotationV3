import { fetchConfig } from "./getKSTableConfig/fetchConfig.js";

export const getKSTableConfig = async () => {
    try {
        const configJson = await fetchConfig();

        return await configJson;
    } catch (error) {
        console.error("Error loading table configuration:", error);
        throw error;
    }
};
