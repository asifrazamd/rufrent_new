const db = require("../config/db"); // Database db
//const { redis } = require("../config/redis");
const { updateRecords } = require('../utils/updateRecords'); // Adjust the path as needed




const addRequest = async (req, res) => {
  // Extract user_id and property_id from the request body
  const { user_id, property_id } = req.body;

  // Validate the input: Ensure both user_id and property_id are provided
  if (!user_id || !property_id) {
    return res.status(400).json({ error: 'user_id and property_id are required.' });
  }

  // Get a database connection from the connection pool
  const connection = await db.getConnection();
  try {
    // Call the stored procedure to assign a relationship manager (RM) to the transaction
    const [result] = await connection.execute(
      'CALL AssignRmToTransaction(?, ?)', // Stored procedure name
      [user_id, property_id]              // Parameters to pass to the stored procedure
    );

    // Send a success response with the result
    res.status(201).json({
      message: 'Transaction assigned successfully.',
      result,
    });
  } catch (error) {
    // Log the error and send an error response
    console.error('Error assigning transaction:', error.message);
    res.status(500).json({ error: 'An error occurred while assigning the transaction.' });
  } finally {
    // Ensure the database connection is released back to the pool
    connection.release();
  }
};





const displayProperties = async (req, res) => {
  try {
    // Extract query parameters
    const { property_id} = req.query;
    //const offset = (page - 1) * limit;


    // Define table name, join clauses, and fields
    const tableName = 'dy_property dy';
    const joinClauses = `
      LEFT JOIN st_prop_type spt ON dy.prop_type_id = spt.id
      LEFT JOIN st_home_type sht ON dy.home_type_id = sht.id
      LEFT JOIN st_prop_desc spd ON dy.prop_desc_id = spd.id
      LEFT JOIN st_community sc ON dy.community_id = sc.id
      LEFT JOIN st_beds snbe ON dy.no_beds = snbe.id
      LEFT JOIN st_baths snba ON dy.no_baths = snba.id
      LEFT JOIN st_balcony snbc ON dy.no_balconies = snbc.id
      LEFT JOIN st_tenant_eat_pref step ON dy.tenant_eat_pref_id = step.id
      LEFT JOIN st_parking_count spc ON dy.parking_count_id = spc.id
      LEFT JOIN st_deposit_range sdr ON dy.deposit_range_id = sdr.id
      LEFT JOIN st_maintenance sm ON dy.maintenance_id = sm.id
    `;
    const fieldNames = `
      dy.id,
      spt.prop_type AS prop_type,
      sht.home_type AS home_type,
      spd.prop_desc AS prop_desc,
      sc.name AS community_name,
      sc.map_url AS map_url,
      sc.total_area AS total_area,
      sc.open_area AS open_area,
      sc.nblocks AS nblocks,
      sc.nfloors_per_block AS nfloors_per_block,
      sc.nhouses_per_floor AS nhouses_per_floor,
      sc.address AS address,
      sc.totflats AS totflats,
      snbe.nbeds AS nbeds,
      snba.nbaths AS nbaths,
      snbc.nbalcony AS nbalcony,
      step.eat_pref AS eat_pref,
      spc.parking_count AS parking_count,
      sdr.nmonths AS deposit,
      sm.maintenance_type AS maintenance_type,
      dy.rental_low,
      dy.rental_high,
      dy.tower_no,
      dy.floor_no,
      dy.flat_no,
      dy.images_location
    `;

    // Construct WHERE clause dynamically based on property_id
    const whereCondition = property_id ? `dy.id = ${db.escape(property_id)}` : '';

    // Debug the constructed query
    //console.log('CALL statement:', `CALL agetJoinedData(?, ?, ?, ?);`);

    // Call the stored procedure
    const [results] = await db.execute(
      `CALL getJoinedData(?, ?, ?, ?);`,
      [tableName, joinClauses, fieldNames, whereCondition]
    );

    // Check if results are found and return the response
    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'No properties found for the given property_id.' });
    }

    res.status(200).json({
      message: property_id
        ? `Details for property ID: ${property_id}`
        : `All property details`,
      results: results[0],  // Ensure you return the first result (the data)

    });

  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({
      error: 'Database error occurred while executing the query.',
      details: err.message,
    });
  }
};







































/*const getAllTransactionBasedOnId = async (req, res) => {
    const { rm_id, fm_id } = req.query; // Extract both rm_id and fm_id from query params
    const db = await db.getdb();
  
    try {
      // Validate if at least one ID is provided
      if (!rm_id && !fm_id) {
        return res.status(400).json({ error: 'Either rm_id or fm_id is required.' });
      }
  
      let idColumn = '';
      let idValue = '';
  
      // Check which ID is provided and set the appropriate column and value
      if (rm_id) {
        if (isNaN(rm_id)) {
          return res.status(400).json({ error: 'Invalid rm_id.' });
        }
        idColumn = 'rm_id';
        idValue = rm_id;
      } else if (fm_id) {
        if (isNaN(fm_id)) {
          return res.status(400).json({ error: 'Invalid fm_id.' });
        }
        idColumn = 'fm_id';
        idValue = fm_id;
      }
  
      // Call the stored procedure with the appropriate table and column names
      const [result] = await db.query(
        'CALL getRecordByPK(?, ?, ?)', 
        ['dy_transactions', idColumn, idValue]
      );
  
      // The first result set contains the transactions
      const request = result[0] || [];
  
      res.status(200).json({
        message: 'Transaction retrieved successfully.',
        request
      });
    } catch (error) {
      console.error('Error retrieving transaction:', error.message);
      res.status(500).json({ error: 'An error occurred while retrieving the transaction.' });
    } finally {
      db.release();
    }
  };*/
  /**
 * Retrieves transactions based on either `rm_id` or `fm_id` and fetches related community details.
 * 
 * @async
 * @function getAllTransactionBasedOnId
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {number} [req.query.rm_id] - Relationship manager ID.
 * @param {number} [req.query.fm_id] - Facility manager ID.
 * @param {Object} res - The response object.
 * 
 * @returns {void} Sends a JSON response containing transaction details and community information.
 * 
 * @throws {Error} If an invalid `rm_id` or `fm_id` is provided, or if there is a database error.
 */
/*const getAllTransactionBasedOnId = async (req, res) => {
  const { rm_id, fm_id } = req.query;
  const db = await db.getdb();

  try {
    if (!rm_id && !fm_id) {
      return res.status(400).json({ error: 'Either rm_id or fm_id is required.' });
    }

    let idColumn = rm_id ? 'rm_id' : 'fm_id';
    let idValue = rm_id || fm_id;

    if (isNaN(idValue)) {
      return res.status(400).json({ error: `Invalid ${idColumn}.` });
    }

    const transactionQuery = `
      CALL getJoinedData(
        'dy_transactions',
        'st_community', -- Only the table name
        'dy_transactions.community_id = st_community.community_id', -- Move the ON clause here
        'INNER',
        'dy_transactions.id AS transaction_id, st_community.community_id, st_community.community_name, owners.owner_name, owners.owner_mobile, tenants.tenant_name, tenants.tenant_mobile, dy_transactions.cur_stat_code AS curr_stat_code_id, statuses.status_name AS curr_stat_code, dy_transactions.schedule_date, dy_transactions.schedule_time'
      )
    `;
    const [transactionResult] = await db.query(transactionQuery);

    const transactions = transactionResult.map((row) => ({
      transaction_id: row.transaction_id,
      community_id: row.community_id,
      community_name: row.community_name,
      owner_name: row.owner_name,
      owner_mobile: row.owner_mobile,
      tenant_name: row.tenant_name,
      tenant_mobile: row.tenant_mobile,
      curr_stat_code_id: row.curr_stat_code_id,
      curr_stat_code: row.curr_stat_code,
      schedule_date: row.schedule_date,
      schedule_time: row.schedule_time,
    }));

    const communityQuery = `
      CALL getGroupedData(
        'communities',
        'community_id, community_name',
        '',
        'COUNT'
      )
    `;
    const [communityResult] = await db.query(communityQuery);

    const communityDetails = communityResult.map((row) => ({
      community_id: row.community_id,
      community_name: row.community_name,
    }));

    res.status(200).json({
      message: 'Transaction retrieved successfully.',
      request: transactions,
      community_name: communityDetails,
    });
  } catch (error) {
    console.error('Error retrieving transaction:', error.message);
    res.status(500).json({ error: 'An error occurred while retrieving the transaction.' });
  } finally {
    db.release();
  }
};*/
/*const getAllTransactionBasedOnId = async (req, res) => {
  const { rm_id, fm_id, sort_field, sort_type } = req.query;
  const db = await db.getdb();

  try {
    // Validate input parameters
    if (!rm_id && !fm_id) {
      return res.status(400).json({ error: 'Either rm_id or fm_id is required.' });
    }

    let idColumn = rm_id ? 'rm_id' : 'fm_id';
    let idValue = rm_id || fm_id;

    // Validate if the provided id is a number
    if (isNaN(idValue)) {
      return res.status(400).json({ error: `Invalid ${idColumn}.` });
    }

    // Determine which field to use for filtering: rm_id or fm_id
    const filterField = rm_id ? 'rm_id' : 'fm_id';
    const filterValue = rm_id || fm_id;

    // Prepare the fields to select
    const fields = 't.id AS transaction_id, u1.user_name AS tenant_name, u2.user_name AS owner_name, t.schedule_date, t.schedule_time, t.cur_stat_code';

    // Prepare the JOIN clause
    const joinClause = `
      LEFT JOIN dy_user u1 ON t.user_id = u1.id
      LEFT JOIN dy_property p ON t.prop_id = p.id
      LEFT JOIN dy_user u2 ON p.user_id = u2.id
    `;

    // Construct the SQL query with the table name and join clause as separate parameters
    const query = `
      SELECT ${fields}
      FROM dy_transactions t
      ${joinClause}
      WHERE ${filterField} = ?
    `;

    // Execute the query directly
    const [records] = await db.query(query, [filterValue]);

    // If sorting is required, apply sorting using getSortedData
    if (sort_field && sort_type) {
      const sortQuery = `
        CALL getSortedData(
          'dy_transactions',
          ?, ?, ?
        )
      `;

      const [sortedRecords] = await db.query(sortQuery, [sort_field, sort_type]);

      // Respond with the sorted transaction data
      return res.status(200).json({
        message: 'Transaction retrieved and sorted successfully.',
        request: sortedRecords
      });
    }

    // If no sorting is applied, return the unsorted transaction data
    res.status(200).json({
      message: 'Transaction retrieved successfully.',
      request: records
    });

  } catch (error) {
    console.error('Error retrieving transaction:', error.message);
    res.status(500).json({ error: 'An error occurred while retrieving the transaction.' });
  } finally {
    db.release();
  }
};*/
/*const getAllTransactionBasedOnId = async (req, res) => {
  const { rm_id, fm_id} = req.query;
  const db = await db.getdb();

  try {
    // Validate input parameters
    if (!rm_id && !fm_id) {
      return res.status(400).json({ error: 'Either rm_id or fm_id is required.' });
    }

    let idColumn = rm_id ? 'rm_id' : 'fm_id';
    let idValue = rm_id || fm_id;

    // Validate if the provided id is a number
    if (isNaN(idValue)) {
      return res.status(400).json({ error: `Invalid ${idColumn}.` });
    }

    // Prepare the fields to select
    const fields = 't.id AS transaction_id, u1.user_name AS tenant_name, u2.user_name AS owner_name, t.schedule_date, t.schedule_time, t.cur_stat_code';

    // Determine the WHERE condition for the query
    const whereCondition = `${idColumn} = ?`;

    // Call the getRecordsByFields stored procedure to fetch data
    const query = `
      CALL getRecordsByFields(
        'dy_transactions t 
        LEFT JOIN dy_user u1 ON t.user_id = u1.id
        LEFT JOIN dy_property p ON t.prop_id = p.id
        LEFT JOIN dy_user u2 ON p.user_id = u2.id', 
        ?, 
        ?
      )
    `;
    const [records] = await db.query(query, [fields, whereCondition, idValue]);

    // If sorting is required, call the getSortedData procedure
    if (sort_field && sort_type) {
      const sortQuery = `
        CALL getSortedData(
          'dy_transactions',
          ?, ?, ?
        )
      `;
      const [sortedRecords] = await db.query(sortQuery, [sort_field, sort_type]);

      // Respond with the sorted transaction data
      return res.status(200).json({
        message: 'Transaction retrieved and sorted successfully.',
        request: sortedRecords
      });
    }

    // If no sorting is applied, return the unsorted transaction data
    res.status(200).json({
      message: 'Transaction retrieved successfully.',
      request: records
    });

  } catch (error) {
    console.error('Error retrieving transaction:', error.message);
    res.status(500).json({ error: 'An error occurred while retrieving the transaction.' });
  } finally {
    db.release();
  }
};*/

/*const getAllTransactionBasedOnId = async (req, res) => {
  const { rm_id, fm_id } = req.query;
  const db = await db.getdb();

  try {
    // Validate input parameters
    if (!rm_id && !fm_id) {
      return res.status(400).json({ error: 'Either rm_id or fm_id is required.' });
    }

    let idColumn = rm_id ? 'rm_id' : 'fm_id';
    let idValue = rm_id || fm_id;

    // Validate if the provided id is a number
    if (isNaN(idValue)) {
      return res.status(400).json({ error: `Invalid ${idColumn}.` });
    }

    // Get transaction details based on fm_id or rm_id
    const transactionQuery = `
      CALL getJoinedData(
        'dy_transactions t',
        'dy_user u1',
        't.user_id = u1.id AND t.${idColumn} = ${idValue}',
        'LEFT',
        't.id AS transaction_id, u1.user_name AS tenant_name, u1.mobile_no AS tenant_mobile'
      )
    `;
    console.log('Transaction Query:', transactionQuery);

    const [transactionData] = await db.query(transactionQuery);
    console.log('Transaction Data:', transactionData);  // Log the result

    if (!transactionData || transactionData.length === 0) {
      return res.status(404).json({ error: 'No transactions found for the provided id.' });
    }

    // Get property details based on fm_id or rm_id
   const propertyQuery = `
      CALL getJoinedData(
        'dy_transactions t',
        'dy_property p',
        't.prop_id = p.id AND t.${idColumn} = ${idValue}',
        'LEFT',
        't.id AS transaction_id, p.user_id AS owner_user_id, p.community_id'
      )
    `;
    console.log('Property Query:', propertyQuery);

    const [propertyData] = await db.query(propertyQuery);
    console.log('Property Data:', propertyData);  // Log the result

    if (!propertyData || propertyData.length === 0) {
      return res.status(404).json({ error: 'No property data found for the provided id.' });
    }

    // Get community name and owner details
    const communityQuery = `
      CALL getJoinedData(
        'st_community c',
        'dy_user u2',
        'c.id = u2.id',
        'LEFT',
        'c.id AS community_id, c.name AS community_name, u2.user_name AS owner_name, u2.mobile_no AS owner_mobile'
      )
    `;
    console.log('Community Query:', communityQuery);

    const [communityData] = await db.query(communityQuery);
    console.log('Community Data:', communityData);  // Log the result

    if (!communityData || communityData.length === 0) {
      return res.status(404).json({ error: 'No community data found for the provided id.' });
    }

    // Combine all the data into a final result
    const finalResult = transactionData.map((transaction) => {
      // Find the corresponding property data
      const property = propertyData.find((p) => p.transaction_id === transaction.transaction_id);
      
      // Find the corresponding community data based on property community_id
      const community = property ? communityData.find((c) => c.community_id === property.community_id) : null;

      // Log individual properties and communities for debugging
      console.log(`Transaction ID: ${transaction.transaction_id}`);
      console.log(`Property:`, property);
      console.log(`Community:`, community);

      if (!property) {
        console.log(`No property found for transaction_id: ${transaction.transaction_id}`);
      }
      if (!community) {
        console.log(`No community found for transaction_id: ${transaction.transaction_id}`);
      }

      return {
        transaction_id: transaction.transaction_id,
        tenant_name: transaction.tenant_name || 'Unknown Tenant',  // Fallback if name is null
        tenant_mobile: transaction.tenant_mobile || 'Unknown Mobile',  // Fallback if mobile is null
        community_id: community ? community.community_id : null,
        community_name: community ? community.community_name : null,
        owner_name: community ? community.owner_name : null,
        owner_mobile: community ? community.owner_mobile : null,
      };
    });

    return res.status(200).json(finalResult);

  } catch (error) {
    console.error('Error retrieving transaction data:', error.message);
    res.status(500).json({ error: 'An error occurred while retrieving the transaction data.' });
  } finally {
    db.release();
  }
};*/

/*const getAllTransactionBasedOnId = async (req, res) => {
  const { rm_id, fm_id } = req.query;

  if (!rm_id && !fm_id) {
    return res.status(400).json({ error: 'Either rm_id or fm_id is required.' });
  }

  try {
    // Prepare parameters for stored procedure
    let idColumn = rm_id ? 'rm_id' : 'fm_id';
    let idValue = rm_id || fm_id;

    // Get transaction records based on the provided rm_id or fm_id
    const recordsQuery = `CALL getRecordsByFields('dy_transactions', '*', ?)`;
    const [records] = await db.query(recordsQuery, [`${idColumn} = ${idValue}`]);

    if (!records || records.length === 0) {
      return res.status(404).json({ error: 'No records found for the provided rm_id or fm_id.' });
    }
    
    console.log("r1", records[0]);

    // Only return the relevant transaction data (filtered by rm_id or fm_id)
    const transactionData = records.map(record => ({
      transaction_id: record.id,
      user_id: record.user_id,
      prop_id: record.prop_id,
      rm_id: record.rm_id,
      fm_id: record.fm_id,
      cur_stat_code: record.cur_stat_code,
      schedule_time: record.schedule_time,
      schedule_date: record.schedule_date
    }));

    // Send the filtered response with only the relevant transaction data
    return res.status(200).json({
      transactionData
    });

  } catch (error) {
    console.error('Error retrieving data:', error.message);
    return res.status(500).json({ error: 'An error occurred while retrieving the transaction data.' });
  }
};*/


const getAllTransactionBasedOnId = async (req, res) => {
  const { rm_id, fm_id } = req.query;

  // Check if either rm_id or fm_id is provided
  if (!rm_id && !fm_id) {
    return res.status(400).json({ error: 'Either rm_id or fm_id is required.' });
  }

  try {
    // Dynamically determine the column and value to use in the WHERE clause
    const idColumn = rm_id ? 'rm_id' : 'fm_id';
    const idValue = rm_id || fm_id;

    // Validate if the provided ID is a number
    if (isNaN(idValue)) {
      return res.status(400).json({ error: `Invalid ${idColumn}.` });
    }

    // Define the table name, join clauses, and fields for the query
    const tableName = 'dy_transactions dt';
    const joinClauses = `
      LEFT JOIN dy_user u1 ON dt.user_id = u1.id
      LEFT JOIN dy_property p ON dt.prop_id = p.id
      LEFT JOIN dy_user u2 ON p.user_id = u2.id
      LEFT JOIN st_community c ON p.community_id = c.id
      LEFT JOIN st_current_status cs ON dt.cur_stat_code = cs.id
    `;
    const fieldNames = `
      dt.id AS transaction_id,
      c.id AS community_id,
      c.name AS community_name,
      u2.user_name AS owner_name,
      u2.mobile_no AS owner_mobile,
      u1.user_name AS tenant_name,
      u1.mobile_no AS tenant_mobile,
      dt.cur_stat_code AS curr_stat_code_id,
      cs.status_code AS curr_stat_code,
      dt.schedule_date AS schedule_date,
      dt.schedule_time AS schedule_time
    `;

    // Construct the WHERE clause dynamically based on rm_id or fm_id
    const whereCondition = rm_id
      ? `dt.rm_id = ${db.escape(rm_id)}`
      : `dt.fm_id = ${db.escape(fm_id)}`;

    // Call the stored procedure to fetch joined data
    const [results] = await db.execute(
      `CALL getJoinedData(?, ?, ?, ?)`,
      [tableName, joinClauses, fieldNames, whereCondition]
    );

    // If no records are found, return a 404 error
    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'No records found for the provided rm_id or fm_id.' });
    }

    // Determine the status category dynamically based on rm_id or fm_id
    const statusCondition = rm_id
      ? 'status_category="RMA" OR status_category="FMA"'
      : 'status_category="FMA"';

    // Fetch status records matching the status condition
    const [status] = await db.query(
      `CALL getRecordsByFields(?, ?, ?)`,
      ['st_current_status', 'id,status_code', statusCondition]
    );

    // Return the retrieved results and statuses
    res.status(200).json({
      message: 'Retrieved successfully.',
      result: results[0],
      status: status[0],
    });

  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error retrieving data:', error.message);
    return res.status(500).json({ error: 'An error occurred while retrieving the transaction data.' });
  }
};



const listOfFmBasedOnCommunityId = async (req, res) => {
  // Extract community_id from the query parameters
  const { community_id } = req.query;

  try {
    // Define the table name, join clauses, and fields for the query
    const tableName = `dy_rm_fm_com_map r`;
    const joinClauses = `LEFT JOIN dy_user u ON r.fm_id = u.id`;
    const fieldNames = `r.fm_id, u.user_name AS fm_name`;

    // Construct the WHERE condition dynamically based on community_id
    const whereCondition = community_id
      ? `r.community_id = ${db.escape(community_id)}`
      : '';

    // Call the stored procedure to fetch the joined data
    const [results] = await db.execute(
      `CALL getJoinedData(?, ?, ?, ?)`,
      [tableName, joinClauses, fieldNames, whereCondition]
    );

    // If no records are found, return a 404 error
    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'No records found for the provided community_id.' });
    }

    // Return the retrieved results
    res.status(200).json({
      message: 'Retrieved successfully.',
      result: results[0],
    });

  } catch (error) {
    // Log the error and send a 500 response
    console.error('Error fetching FM status data:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching FM status data.' });
  }
};


































  /*const getStatuses = async (req, res) => {
    const { status_category } = req.query; // Get the status category from query params
    //const db = await db.getdb();
  
    try {
      // Validate status_category input
      if (!status_category || !['RMA', 'FMA'].includes(status_category)) {
        return res.status(400).json({
          error: "Invalid or missing status_category. Use 'RMA' or 'FMA'.",
        });
      }
  
      let whereCondition = '';
  
      // Set the WHERE condition based on the status_category
      if (status_category === 'RMA') {
        whereCondition = "status_category = 'RMA' OR status_category = 'FMA'";
      } else if (status_category === 'FMA') {
        whereCondition = "status_category = 'FMA'";
      }
  
      // Call the stored procedure
      const [result] = await db.query("CALL getRecordsByFields(?, ?, ?)", [
        "st_current_status", // Table name
        "id,status_code", // Select all fields
        whereCondition, // WHERE condition
      ]);
  
      // Extract data
      const statuses = result[0];
  
      // Return response
      res.status(200).json({
        message: `${status_category} statuses retrieved successfully.`,
        statuses,
      });
    } catch (error) {
      console.error("Error retrieving statuses:", error.message);
      res.status(500).json({
        error: "An error occurred while retrieving statuses.",
      });
    } finally {
      db.release();
    }
  };*/

 /*const getRecords = async (req, res) => {
    const { tbl_name, field_names, where_condition } = req.query;
    //const { tbl_name, field_names, where_condition } = req.body;

    try {
      if (!tbl_name || !field_names) {
        return res.status(400).json({ message: 'Table name and field names are required.' });
      }
  
      //const cacheKey = `records:${tbl_name}:${field_names}:${where_condition || 'all'}`;
  
      // Check Redis cache first
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }
  
      const whereCondition = where_condition || '';
  
      const [results] = await db.query('CALL getRecordsByFields(?, ?, ?)', [tbl_name, field_names, whereCondition]);
  
      // Cache the data in Redis for 1 hour
      //await redis.set(cacheKey, JSON.stringify(results[0]), 'EX', 3600);
  
      return res.status(200).json(results[0]);
    } catch (error) {
      return res.status(500).json({ message: 'Error getting records', error: error.message });
    }
  };*/


  /*const updateTransaction = async (req, res) => {
    const { id, cur_stat_code, schedule_time, schedule_date, fm_id } = req.body; // Get transaction ID and new values from request body
  
    const connection = await db.getConnection();
    try {
      // First, get the current value of cur_stat_code
      const [currentStatus] = await connection.query(
        'SELECT cur_stat_code FROM dy_transactions WHERE id = ?',
        [id]
      );
  
      const currentStatCode = currentStatus[0]?.cur_stat_code;
  
      // Prepare the dynamic field-value pairs for the update
      let fieldValuePairs = '';
  
      if (cur_stat_code) {
        // If cur_stat_code is provided, set prev_stat_code to the current value of cur_stat_code
        fieldValuePairs += `prev_stat_code = ${currentStatCode}, cur_stat_code = ${cur_stat_code}, `;
      }
      if (schedule_time) {
        fieldValuePairs += `schedule_time = '${schedule_time}', `;
      }
      if (schedule_date) {
        fieldValuePairs += `schedule_date = '${schedule_date}', `;
      }
      if (fm_id) {
        fieldValuePairs += `fm_id = ${fm_id}, `;
      }
  
      // Remove trailing comma and space
      fieldValuePairs = fieldValuePairs.slice(0, -2);
  
      // Prepare the WHERE condition
      const whereCondition = `id = ${id}`;
  
      // Call the stored procedure to update the record
      const [result] = await connection.query(
        'CALL updateRecord(?, ?, ?)',
        ['dy_transactions', fieldValuePairs, whereCondition]
      );
  
      res.status(201).json({
        message: 'Transaction updated successfully',
        result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating transaction', error: error.message });
    } finally {
      connection.release();
    }
  };*/
  const updateTransaction = async (req, res) => {
    const { id, cur_stat_code, schedule_time, schedule_date, fm_id } = req.body;
  
    const connection = await db.getConnection();
    try {
      // First, get the current value of cur_stat_code
      const [currentStatus] = await connection.query(
        'SELECT cur_stat_code FROM dy_transactions WHERE id = ?',
        [id]
      );
  
      const currentStatCode = currentStatus[0]?.cur_stat_code;
  
      // Prepare the dynamic field-value pairs for the update
      const fieldValuePairs = {};
  
      if (cur_stat_code) {
        // If cur_stat_code is provided, set prev_stat_code to the current value of cur_stat_code
        fieldValuePairs.prev_stat_code = currentStatCode;
        fieldValuePairs.cur_stat_code = cur_stat_code;
      }
      if (schedule_time) {
        fieldValuePairs.schedule_time = schedule_time;
      }
      if (schedule_date) {
        fieldValuePairs.schedule_date = schedule_date;
      }
      if (fm_id) {
        fieldValuePairs.fm_id = fm_id;
      }
  
      // Prepare the WHERE condition
      const whereCondition = `id = ${id}`;
  
      // Call the `updateRecords` utility
      req.body = {
        tbl_name: 'dy_transactions',
        field_values_pairs: fieldValuePairs,
        where_condition: whereCondition,
      };
  
      // Call the `updateRecords` function
      await updateRecords(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating transaction', error: error.message });
    } finally {
      connection.release();
    }
  };
  
  
  
  
  
  
  
  
module.exports = { addRequest,displayProperties,getAllTransactionBasedOnId,listOfFmBasedOnCommunityId,updateTransaction};
