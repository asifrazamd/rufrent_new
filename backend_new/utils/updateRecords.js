const db = require("../config/db"); // Database db

const updateRecords = async (req, { resultOnly = false }) => {
  try {
    console.log("Request body:", req.body);
    const { tbl_name, field_values_pairs, where_condition = "" } = req.body;

    // Validation
    if (!tbl_name || !field_values_pairs) {
      if (resultOnly) {
        // Return a value instead of sending a response
        return {
          message:
            "resultOnly is false: Table name and field names are required.",
        };
      } else {
        // Return a response if resultOnly is true
        throw new Error("Table name and field names are required.");
      }
    }

    // Convert fieldValuePairs to a comma-separated string
    const fieldValuePairsStr = Object.keys(field_values_pairs)
      .map((key) => {
        return `${key} = '${field_values_pairs[key]}'`;
      })
      .join(", ");

    // Log the SQL query and input parameters
    console.log(
      `Updating ${tbl_name} with ${fieldValuePairsStr} where ${where_condition}`
    );

    // Database interaction
    const [results] = await db.query("CALL updateRecord(?, ?, ?)", [
      tbl_name,
      fieldValuePairsStr,
      where_condition,
    ]);
    console.log("utils", results);

    if (resultOnly) {
      // Return a value instead of sending a response
      return results;
    } else {
      // Send success response if resultOnly is true
      return {
        message: "Record updated successfully",
        results,
      };
    }
  } catch (error) {
    console.error(`Error updating records: ${error.message}`);
    if (resultOnly) {
      // Return a value instead of sending a response
      return {
        message: "resultOnly is false: Error updating records",
        error: error.message,
      };
    } else {
      // Send error response if resultOnly is true
      return {
        message: "Error updating records",
        error: error.message,
      };
    }
  }
};

module.exports = { updateRecords };
