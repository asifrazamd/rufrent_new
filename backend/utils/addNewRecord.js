const db = require("../config/db"); // Database db

const addNewRecord = async (req, res) => {
    const { tableName, fieldNames, fieldValues } = req.body;
  
    // Validate input
    if (!tableName || !fieldNames || !fieldValues) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
  
  
    try {
      // Execute the stored procedure
      const [results] = await db.query(`CALL addNewRecord(?, ?, ?)`, [tableName, fieldNames, fieldValues]);
  
      // Send success response
      res.status(200).json({
        message: 'Record added successfully',
        results,
      });
    } catch (err) {
      console.error('Error executing stored procedure:', err);
  
      // Send error response
      res.status(500).json({
        error: 'Database error occurred while executing the stored procedure.',
        details: err.message,
      });
    }
  };

module.exports={addNewRecord}