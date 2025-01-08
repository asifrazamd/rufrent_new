const db = require("../config/db"); // Database db

const getJoinedData = async (req, res, { resultOnly = false }) => {
  const { tableName, joinClauses, fieldNames, whereCondition } = req.query;

  try {
    if (!tableName || !fieldNames) {
      if (resultOnly) {
        // Return a value instead of sending a response
        return { message: "resultOnly is false: Returning value instead!" };
      } else {
        // Return a response if resultOnly is true
        return res
          .status(400)
          .json({ message: "Table name and field names are required." });
      }
    }

    const [results] = await db.execute(`CALL getJoinedData(?, ?, ?, ?)`, [
      tableName,
      joinClauses || "", // Default to empty string if joinClauses is not provided
      fieldNames,
      whereCondition || "", // Default to empty string if whereCondition is not provided
    ]);
    if (!results || results.length === 0) {
      if (resultOnly) {
        // Return a value instead of sending a response
        return { message: "No Records Found" };
      } else {
        // Return a response if resultOnly is true
        return res.status(404).json({ message: "No records found." });
      }
    }

    if (resultOnly) {
      // Return a value instead of sending a response
      return results;
    } else {
      // Return a response if resultOnly is true
      res.status(200).json({
        message: "Data retrieved successfully.",
        result: results[0],
      });
    }
  } catch (error) {
    if (resultOnly) {
      // Return a value instead of sending a response
      return { message: "resultOnly is false: Returning value instead!" };
    } else {
      // Return a response if resultOnly is true
      return res
        .status(500)
        .json({ message: "Error getting records", error: error.message });
    }
  }
};

module.exports = { getJoinedData };
