const updateRecord = ({ data, inRequestBody, pk }) => {
    const reqPkValue = inRequestBody[pk];
    const index = data.findIndex(item => item[pk] == reqPkValue);

    if (index === -1) {
        const err = new Error(`Record with ${pk} "${reqPkValue}" not found`);
        err.status = 404;
        throw err;
    }

    const updatedRecord = {
        ...data[index],
        ...inRequestBody
    };

    // Replace the record in array
    data[index] = updatedRecord;

    return {
        updatedData: data,
        updatedRecord
    };
};

export default updateRecord;
