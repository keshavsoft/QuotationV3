import defaultOptions from "../defaultOptions.js";

export const createSaveButton = ({ options = {}, inServices, inConfig }) => {
    const button = document.createElement("ks-button");
    button.init({
        text: options.saveButtonText || "Save",
        class: options.saveButtonClass || options.uiClasses?.saveButtonClass || options.uiClasses?.buttonRow?.buttons?.save || options.uiClasses?.form?.buttonRow?.buttons?.save || defaultOptions.uiClasses.form.buttonRow.buttons.save
    });

    button.onClick = async (data) => {
        const closestButtonsRow = button.closest(".buttonsRow");
        const saveBtn = closestButtonsRow.querySelector(".saveButtonClass");
        const editBtn = closestButtonsRow.querySelector(".editButtonClass");
        const updateBtn = closestButtonsRow.querySelector(".updateButtonClass");
        const cancelBtn = closestButtonsRow.querySelector(".cancelButtonClass");

        button.style.display = "none";
        editBtn.style.display = "";

        console.log("Buttons found:", { saveBtn, editBtn, updateBtn, cancelBtn });
        console.log("aaaaaaaaa : ", closestButtonsRow, data);
        // const fromService = await inServices.actionsFetchOnly.create({
        //     inEndPoint: inConfig.endPoints.create,
        //     payload: data
        // });

        // inConfig.callbacks.vertical.onSuccess(fromService);
    };

    return button;
};
