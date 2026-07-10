export const changeGridSummary = (gridSummary) => {
    const changedArray = gridSummary.map(({ pk: line, ...rest }) => ({
        line,
        lines: line,
        ...rest
    }));

    return changedArray;
};
