const db = require("../config/db"); // Database db

const deleteRecords = async (req, res, { resultOnly = false }) => {
  const { tbl_name, where_condition } = req.body;

  try {
    if (!tbl_name) {
      if (resultOnly) {
        // Return a value instead of sending a response
        return { message: "ReturnValue is false: Table name is required." };
      } else {
        // Return a response if returnValue is true
        return res.status(400).json({ message: "Table name is required." });
      }
    }

    const whereCondition = where_condition || "";

    const [results] = await db.execute("CALL deleteRecord(?, ?)", [
      tbl_name,
      whereCondition,
    ]);

    if (resultOnly) {
      // Return a value instead of sending a response
      return results;
    } else {
      // Send success response if returnValue is true
      return res.json({
        message: "Record(s) deleted successfully.",
        results,
      });
    }
  } catch (error) {
    if (resultOnly) {
      // Return a value instead of sending a response
      return {
        message: "Error deleting records",
        error: error.message,
      };
    } else {
      // Send error response if returnValue is true
      return res.status(500).json({
        message: "Error deleting records",
        error: error.message,
      });
    }
  }
};

module.exports = { deleteRecords };
