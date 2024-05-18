import { messageErrorsReturnApi } from "../config/config"; 
function modifyValueInObjectWhithPath(object, list, newValue) {
    let currentDict = object;
    for (let i = 0; i < list.length - 1; i++) {
        const key = list[i];
        if (currentDict.hasOwnProperty(key)) {
            currentDict = currentDict[key];
        } else {
            console.log(`La clé '${key}' n'existe pas dans le object.`);
            return;
        }
    }
    const lastKey = list[list.length - 1];
    if (currentDict.hasOwnProperty(lastKey)) {
        currentDict[lastKey] = newValue;
    } else {
        console.log(`La clé '${lastKey}' n'existe pas dans le object.`);
    }
    return currentDict
}

function createErrorMessage(errorList) {
    const errorMessages = errorList.map(errorObj => {
        const errorCode = errorObj.msg;
        if (messageErrorsReturnApi.hasOwnProperty(errorCode)) {
            return messageErrorsReturnApi[errorCode];
        }
    });
    return errorMessages.join(", ");
}

export default {modifyValueInObjectWhithPath,createErrorMessage}