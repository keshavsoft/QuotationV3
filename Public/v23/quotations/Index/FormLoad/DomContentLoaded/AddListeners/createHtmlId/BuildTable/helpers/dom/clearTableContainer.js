const clearTableContainer = () => {
    const htmlId = 'kSTableContainer';
    const container = document.getElementById(htmlId);
    if (container !== null) {
        container.innerHTML = "";
    }
};

export { clearTableContainer };
