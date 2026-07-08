const findFirstEmptyInput = (inputs) => {
    const firstEmptyInput = inputs.find((input) => {
        console.log("bbbbbbbb : ", input.type);

        return input.value.trim() === "";
    });

    return firstEmptyInput;
};

const findFirstEmptyInput1 = (inputs) => {
    const firstEmptyInput = inputs.find((input) => {
        console.log("bbbbbbbb : ", input.type);

        return input.value.trim() === "";
    });

    return firstEmptyInput;
};

export default findFirstEmptyInput;
