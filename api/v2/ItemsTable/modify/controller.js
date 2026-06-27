import { startFunc as Service } from "./service.js";
import { ConflictError, StorageError } from "./errors.js";

const postFunc = async ({ req, res, inTablePath, inConfigPath }) => {
    try {
        const inRequestBody = req.body;

        const fromService = await Service({
            inRequestBody, inTablePath,
            inConfigPath
        });

        res.type("application/json").send(fromService);
    }
    catch (err) {
        if (err.status)
            return res.status(err.status).send(err.message);

        console.error(err);
        return res.status(500).send("Unexpected error");
    };
};

export default postFunc;