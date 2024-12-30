const db = require("../config/db"); // Database db

const deleteRecords = async (req, res) => {
    const { tbl_name,where_condition } = req.body;
    //const { tbl_name, field_names, where_condition } = req.body;

    try {
      if (!tbl_name) {
        return res.status(400).json({ message: 'Table name is required.' });
      }
  
      //const cacheKey = `records:${tbl_name}:${field_names}:${where_condition || 'all'}`;
  
      // Check Redis cache first
      /*const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }*/
  
      const whereCondition = where_condition || '';
  
      const [results] = await db.execute('CALL deleteRecord(?, ?)', [tbl_name,whereCondition]);
  
      // Cache the data in Redis for 1 hour
      //await redis.set(cacheKey, JSON.stringify(results[0]), 'EX', 3600);
  
      res.json({ message: 'Record(s) deleted successfully.', results });
    } catch (error) {
      return res.status(500).json({ message: 'Error getting records', error: error.message });
    }
  };

module.exports={deleteRecords}