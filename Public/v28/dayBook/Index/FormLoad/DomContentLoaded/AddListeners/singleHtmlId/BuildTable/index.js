import getData from "./helpers/getData.js";
import configJson from "./configs/showAll.json" with { type: "json" };

const getFilteredData = async (FromDate, ToDate) => {
    const config = await fetch(`/api/v8/dayBook/find/${FromDate}/${ToDate}`);
    const data = await config.json();

    return await data;
};

let jFLocalFromDate = () => {
    let jVarLocalFromDate = 'FromDate'
    let jVarLocalHtmlId = document.getElementById(jVarLocalFromDate);

    if (jVarLocalHtmlId === null === false) {
        return jVarLocalHtmlId.value.trim();
    };
};

let jFLocalToDate = () => {
    let jVarLocalToDate = 'ToDate'
    let jVarLocalHtmlId = document.getElementById(jVarLocalToDate);

    if (jVarLocalHtmlId === null === false) {
        return jVarLocalHtmlId.value.trim();
    };
};

let jFLocalLedgerInput = () => {
    let jVarLocalLedgerInput = 'LedgerInput'
    let jVarLocalHtmlId = document.getElementById(jVarLocalLedgerInput);

    if (jVarLocalHtmlId === null === false) {
        return jVarLocalHtmlId.value.trim();
    };
};

const startFunc = async () => {
    document.getElementById("ShowButton")
        .addEventListener("click", async () => {
            const fromDate = jFLocalFromDate();
            const toDate = jFLocalToDate();
            const filteredData = await getFilteredData(fromDate, toDate);
            // console.log("aaaaaaaaaa : ", singleLedgerData);

            configJson.defaults.data = filteredData;
            configJson.tableName = `${fromDate} : ${toDate}`;

            ksTable1 = new window.ks.classes.tableShowOnly(configJson);
            ksTable1.initShowTable();
        });
};

const buildDataList = (inData) => {

    const dataList = document.getElementById("LedgerList");

    inData.forEach(name => {

        const option = document.createElement("option");
        option.value = name;

        dataList.appendChild(option);

    });

};

export default startFunc;