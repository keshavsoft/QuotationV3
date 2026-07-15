import getData from "./helpers/getData.js";
import configJson from "./configs/showAll.json" with { type: "json" };

const getSingleLedgerData = async (inName) => {
    const config = await fetch(`/api/v8/ledger/find/${inName}`);
    const data = await config.json();

    return await data;
};

let jFLocalLedgerInput = () => {
    let jVarLocalLedgerInput = 'LedgerInput'
    let jVarLocalHtmlId = document.getElementById(jVarLocalLedgerInput);

    if (jVarLocalHtmlId === null === false) {
        return jVarLocalHtmlId.value.trim();
    };
};

const startFunc = async () => {
    const dataToShow = await getData();

    buildDataList(dataToShow.sort());

    document.getElementById("ShowButton")
        .addEventListener("click", async () => {
            const singleLedgerData = await getSingleLedgerData(jFLocalLedgerInput());
            console.log("aaaaaaaaaa : ", singleLedgerData);

            configJson.defaults.data = singleLedgerData;

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