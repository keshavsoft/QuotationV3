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
            if (accVal === -Infinity) return currentVal;
            if (currentVal === undefined || currentVal === null) return accVal;

            let valAcc = Number(accVal);
            let valCur = Number(currentVal);

            if (isNaN(valAcc)) valAcc = Date.parse(accVal);
            if (isNaN(valCur)) valCur = Date.parse(currentVal);

            if (!isNaN(valAcc) && !isNaN(valCur)) {
                return valCur > valAcc ? currentVal : accVal;
            }
            return String(currentVal) > String(accVal) ? currentVal : accVal;
        }
    },
    min: {
        init: Infinity,
        update: (accVal, currentVal) => {
            if (accVal === Infinity) return currentVal;
            if (currentVal === undefined || currentVal === null) return accVal;

            let valAcc = Number(accVal);
            let valCur = Number(currentVal);

            if (isNaN(valAcc)) valAcc = Date.parse(accVal);
            if (isNaN(valCur)) valCur = Date.parse(currentVal);

            if (!isNaN(valAcc) && !isNaN(valCur)) {
                return valCur < valAcc ? currentVal : accVal;
            }
            return String(currentVal) < String(accVal) ? currentVal : accVal;
        }
    }
};

const allowedAggFuncs = Object.keys(aggConfig);

export { aggConfig, allowedAggFuncs };
