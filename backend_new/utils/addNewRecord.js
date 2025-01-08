const db = require("../config/db"); // Database db

const addNewRecord = async (req, res, { resultOnly=false }) => {
  const { tableName, fieldNames, fieldValues } = req.body;

  // Validate input
  if (!tableName || !fieldNames || !fieldValues) {
    if (resultOnly) {
      return { message: "ReturnValue is false: Missing required fields." };

      // Return a response if returnValue is true
    } else {
      // Return a value instead of sending a response
      return res.status(400).json({ error: "Missing required fields." });

    }
  }

  try {
    // Execute the stored procedure
    const [results] = await db.query("CALL addNewRecord(?, ?, ?)", [
      tableName,
      fieldNames,
      fieldValues,
    ]);

    if (resultOnly) {
      return results;

      // Send success response if returnValue is true
      
    } else {
      return res.status(200).json({
        message: "Record added successfully",
        results,
      });
      // Return a value instead of sending a response
    }
  } catch (err) {
    if (resultOnly) {
      // Send error response if returnValue is true
      return {
        message:
          "Database error occurred while executing the stored procedure.",
        details: err.message,
      };
      
    } else {
      // Return a value instead of sending a response
      return res.status(500).json({
        error: "Database error occurred while executing the stored procedure.",
        details: err.message,
      });
      
    }
  }
};

module.exports = { addNewRecord };
