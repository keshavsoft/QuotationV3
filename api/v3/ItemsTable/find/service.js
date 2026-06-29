import getData from "./getData.js";

const startFunc = async ({ inColumnName, inTablePath }, inColumnsToSum) => {
    const dataAsArray = await getData({ inTablePath });
    const columnsToSum = inColumnsToSum || {};

    const grouped = dataAsArray.reduce((acc, current) => {
        const groupKey = current[inColumnName];
        if (!acc[groupKey]) {
            acc[groupKey] = {
                [inColumnName]: groupKey
            };
            Object.keys(columnsToSum).forEach(key => {
                const func = columnsToSum[key];
                if (func === "sum") {
                    acc[groupKey][key] = 0;
                } else if (func === "count") {
                    acc[groupKey][key] = 0;
                } else if (func === "max") {
                    acc[groupKey][key] = -Infinity;
                } else if (func === "min") {
                    acc[groupKey][key] = Infinity;
                }
            });
        }

        Object.keys(columnsToSum).forEach(key => {
            const func = columnsToSum[key];
            const val = Number(current[key]);

            if (func === "sum") {
                acc[groupKey][key] += isNaN(val) ? 0 : val;
            } else if (func === "count") {
                if (current[key] !== undefined && current[key] !== null) {
                    acc[groupKey][key] += 1;
                }
            } else if (func === "max") {
                if (!isNaN(val)) {
                    acc[groupKey][key] = Math.max(acc[groupKey][key], val);
                }
            } else if (func === "min") {
                if (!isNaN(val)) {
                    acc[groupKey][key] = Math.min(acc[groupKey][key], val);
                }
            }
        });

        return acc;
    }, {});

    const result = Object.values(grouped);
    result.forEach(row => {
        Object.keys(columnsToSum).forEach(key => {
            if (row[key] === Infinity || row[key] === -Infinity) {
                row[key] = null;
            }
        });
    });

    return result;
};

export { startFunc };
