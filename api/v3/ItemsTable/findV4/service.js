import getData from "./getData.js";

const aggConfig = {
    sum: {
        init: 0,
        update: (accVal, currentVal) => accVal + (Number(currentVal) || 0)
    },
    count: {
        init: 0,
        update: (accVal, currentVal) => currentVal !== undefined && currentVal !== null ? accVal + 1 : accVal
    },
    max: {
        init: -Infinity,
        update: (accVal, currentVal) => {
            const val = Number(currentVal);
            return !isNaN(val) ? Math.max(accVal, val) : accVal;
        }
    },
    min: {
        init: Infinity,
        update: (accVal, currentVal) => {
            const val = Number(currentVal);
            return !isNaN(val) ? Math.min(accVal, val) : accVal;
        }
    }
};

const allowedAggFuncs = Object.keys(aggConfig);

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
                if (aggConfig[func]) {
                    acc[groupKey][key] = aggConfig[func].init;
                }
            });
        }

        Object.keys(columnsToSum).forEach(key => {
            const func = columnsToSum[key];
            if (aggConfig[func]) {
                acc[groupKey][key] = aggConfig[func].update(acc[groupKey][key], current[key]);
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

export { startFunc, allowedAggFuncs };
