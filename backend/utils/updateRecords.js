const db = require("../config/db"); // Database db

const updateRecords = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { tbl_name, field_values_pairs, where_condition = '' } = req.body;

    // Validation
    if (!tbl_name || !field_values_pairs) {
      return res.status(400).json({ message: 'Table name and field names are required.' });
    }

    // Convert fieldValuePairs to a comma-separated string
    const fieldValuePairsStr = Object.keys(field_values_pairs).map((key) => {
      return `${key} = '${field_values_pairs[key]}'`;
    }).join(', ');

    // Log the SQL query and input parameters
    console.log(`Updating ${tbl_name} with ${fieldValuePairsStr} where ${where_condition}`);

    // Database interaction
    const [results] = await db.query('CALL updateRecord(?, ?, ?)', [tbl_name, fieldValuePairsStr, where_condition]);

    // Return a descriptive response
    res.status(201).json({ message: 'Record updated successfully', results });
  } catch (error) {
    console.error(`Error updating records: ${error.message}`);
    res.status(500).json({ message: 'Error updating records' });
  }
};

module.exports={updateRecords}