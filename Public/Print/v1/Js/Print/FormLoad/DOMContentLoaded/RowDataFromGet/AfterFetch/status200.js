import { StartFunc as StartFuncFromFetchAsGet } from "./FetchAsGet/entryFile.js";

let StartFunc = ({ inResponse }) => {
   StartFuncFromFetchAsGet();
   
   Object.entries(inResponse).forEach(([key, value]) => {
      let inputElement = document.getElementById(`HtmlId-${key}`);
      if (inputElement !== null) {
         inputElement.value = value;
      }
   });
};


// BillNumberId

export { StartFunc };
