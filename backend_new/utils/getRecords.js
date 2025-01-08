const db = require("../config/db"); // Database db

const getRecords = async (req, res, { resultOnly = false }) => {
  const { tbl_name, field_names, where_condition } = req.query;

  try {
    if (!tbl_name || !field_names) {
      if (resultOnly) {
        // Return a value instead of sending a response
        return { message: "ReturnValue is false: Returning value instead!" };
      } else {
        // Return a response if returnValue is true
        return res
          .status(400)
          .json({ message: "Table name and field names are required." });
      }
    }

    const [results] = await db.query("CALL getRecordsByFields(?, ?, ?)", [
      tbl_name,
      field_names,
      where_condition,
    ]);

    if (!results || results.length === 0) {
      if (resultOnly) {
        // Return a value instead of sending a response
        return { message: "No Records Found" };
      } else {
        // Return a response if returnValue is true
        return res.status(404).json({ message: "No records found." });
      }
    }

    if (resultOnly) {
      // Return a value instead of sending a response
      return results[0];
    } else {
      // Return a response if returnValue is true
      res.status(200).json({
        message: "Data retrieved successfully.",
        result: results[0],
      });
    }
  } catch (error) {
    if (resultOnly) {
      // Return a value instead of sending a response
      return { message: "ReturnValue is false: Returning value instead!" };
    } else {
      // Return a response if returnValue is true
      return res
        .status(500)
        .json({ message: "Error getting records", error: error.message });
    }
  }
};


module.exports = { getRecords };
