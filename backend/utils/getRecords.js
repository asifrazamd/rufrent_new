const db = require("../config/db"); // Database db

const getRecords = async (req, res) => {
    const { tbl_name, field_names, where_condition } = req.query;
    //const { tbl_name, field_names, where_condition } = req.body;

    try {
      if (!tbl_name || !field_names) {
        return res.status(400).json({ message: 'Table name and field names are required.' });
      }
  
      //const cacheKey = `records:${tbl_name}:${field_names}:${where_condition || 'all'}`;
  
      // Check Redis cache first
      /*const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }*/
  
      const whereCondition = where_condition || '';
  
      const [results] = await db.query('CALL getRecordsByFields(?, ?, ?)', [tbl_name, field_names, whereCondition]);
  
      // Cache the data in Redis for 1 hour
      //await redis.set(cacheKey, JSON.stringify(results[0]), 'EX', 3600);
  
      return res.status(200).json(results[0]);
    } catch (error) {
      return res.status(500).json({ message: 'Error getting records', error: error.message });
    }
  };

module.exports={getRecords}