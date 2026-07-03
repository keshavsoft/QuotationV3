const aggConfig = {
    sum: {
        init: 0,
        update: (accVal, currentVal) => accVal + (Number(currentVal) || 0)
    },
    sumQty: {
        init: "0.00",
        update: (accVal, currentVal) => (Number(accVal) + (Number(currentVal) || 0)).toFixed(2)
    },
    count: {
        init: 0,
        update: (accVal, currentVal) => currentVal !== undefined && currentVal !== null ? accVal + 1 : accVal
    },
    max: {
        init: -Infinity,
        update: (accVal, currentVal) => {
            if (currentVal === undefined || currentVal === null) return accVal;
            const num = Number(currentVal);
            if (!isNaN(num) && !isNaN(parseFloat(currentVal))) {
                return accVal === -Infinity ? num : Math.max(accVal, num);
            }
            if (accVal === -Infinity) return currentVal;
            return currentVal > accVal ? currentVal : accVal;
        }
    },
    min: {
        init: Infinity,
        update: (accVal, currentVal) => {
            if (currentVal === undefined || currentVal === null) return accVal;
            const num = Number(currentVal);
            if (!isNaN(num) && !isNaN(parseFloat(currentVal))) {
                return accVal === Infinity ? num : Math.min(accVal, num);
            }
            if (accVal === Infinity) return currentVal;
            return currentVal < accVal ? currentVal : accVal;
        }
    }
};

const allowedAggFuncs = Object.keys(aggConfig);

export { aggConfig, allowedAggFuncs };
