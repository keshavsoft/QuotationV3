import fs from "fs/promises";

const checkColumnName = ({ inConfigPath }) => {
    return async (req, res, next) => {
        try {
            const columnName = req.params.columnName;
            
            // Read config schema file
            const schemaData = await fs.readFile(inConfigPath, "utf-8");
            const schema = JSON.parse(schemaData);
            
            // Validate schema structure
            if (!schema || !Array.isArray(schema.columns)) {
                return res.status(500).send("Schema configuration error");
            }
            
            // Check if columnName matches any field or columnName in the columns definition
            const columnExists = schema.columns.some(col => col.field === columnName || col.columnName === columnName);
            
            if (!columnExists) {
                return res.status(400).send(`ColumnName '${columnName}' is not in the schema.`);
            }
            
            next();
        } catch (err) {
            console.error("Middleware validation error:", err);
            res.status(500).send("Internal server error during validation");
        }
    };
};

export { checkColumnName };
