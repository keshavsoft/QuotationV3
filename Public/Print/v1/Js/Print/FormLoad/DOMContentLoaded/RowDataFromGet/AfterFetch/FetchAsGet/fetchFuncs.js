import getUrlJson from './getUrl.json' with {type: 'json'};
import CommonConfigJson from '../../../../../../../Config.json' with {type: 'json'};

let StartFunc = async () => {
    // GET http://localhost:9008/V6/BillsTable/Filter/RowFilter/{inKey}/{inValue}
    let jVarLocalFilterString = getUrlQueryParams({ inGetKey: "pk" });

    let jVarLocalCommonTable = CommonConfigJson.StartUrl;
    let jVarLocalGetEndPoint = getUrlJson.GetEndPoint.replace("{inValue}", jVarLocalFilterString);
    let jVarLocalFetchUrl = `${jVarLocalCommonTable}/BillItemsTable/${jVarLocalGetEndPoint}`

    let response = await fetch(jVarLocalFetchUrl);

    return await response;
};

let getUrlQueryParams = ({ inGetKey }) => {
    const queryString = window.location.search;
    const parameters = new URLSearchParams(queryString);
    const value = parameters.get(inGetKey);
    return value;
};


export { StartFunc };

