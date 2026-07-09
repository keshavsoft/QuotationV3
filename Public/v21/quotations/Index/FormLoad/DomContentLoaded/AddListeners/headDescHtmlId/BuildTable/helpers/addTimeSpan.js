export const addTimeSpan = (rawData) => {
    const now = new Date();
    const processedData = Array.isArray(rawData) ? rawData.map((row) => {
        if (!row.DateTime) {
            return { ...row, DateTimeDiff: "" };
        }
        const rowDate = new Date(row.DateTime);
        if (isNaN(rowDate.getTime())) {
            return { ...row, DateTimeDiff: "" };
        }

        const diffMs = now - rowDate;
        if (diffMs < 0) {
            return { ...row, DateTimeDiff: "Future" };
        }

        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        let diffStr = "";
        if (diffSecs < 60) {
            diffStr = "Just now";
        } else if (diffMins < 60) {
            diffStr = `${diffMins}m ago`;
        } else if (diffHours < 24) {
            diffStr = `${diffHours}h ago`;
        } else if (diffDays === 1) {
            diffStr = "Yesterday";
        } else {
            diffStr = `${diffDays}d ago`;
        }

        return { ...row, DateTimeDiff: diffStr };
    }) : [];

    return processedData;
};
