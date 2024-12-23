const db = require("../config/db"); // Database db
//const { redis } = require("../config/redis");


/**
 * Add a new record to the database using a stored procedure.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.tableName - The name of the table.
 * @param {string} req.body.fieldNames - The names of the fields (comma-separated).
 * @param {string} req.body.fieldValues - The values for the fields (comma-separated).
 * @param {Object} res - The HTTP response object.
 */
/*const addNewRecord = async (req, res) => {
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
};*/

const addRequest = async (req, res) => {
  const { user_id, property_id } = req.body;

  if (!user_id || !property_id) {
    return res.status(400).json({ error: 'user_id and property_id are required.' });
  }
  const connection = await db.getConnection();
  try {
    // Call the stored procedure to update transaction status
    const [result] = await connection.execute('CALL AssignRmToTransaction(?, ?)', [user_id, property_id]);
    res.status(201).json({
      message: 'Transaction assigned successfully.',
      result,
    });
  } catch (error) {
    console.error('Error assigning transaction:', error.message);
    res.status(500).json({ error: 'An error occurred while assigning the transaction.' });
  } finally {
    connection.release();
  }
};




const displayProperties = async (req, res) => {
  try {
    // Extract query parameters
    const { property_id } = req.query;

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




















/*const displayProperties=async(req,res)=>{
    const { page = 1, limit = 10 } = req.query;

      // Input values for the stored procedure
  const Sc_Tbl_Name = "dy_property"; // Main table name
  const Jn_Tbl_1_Name = "st_prop_type";
  const Jn_Tbl_2_name = "st_home_type";
  const Jn_Tbl_3_name = "st_prop_desc ";
  const Jn_Tbl_4_name = "st_community";
  const Jn_Tbl_5_name = "st_beds";
  const Jn_Tbl_6_name = "st_baths";
  const Jn_Tbl_7_name = "st_balcony";
  const Jn_Tbl_8_name = "st_tenant_eat_pref";
  const Jn_Tbl_9_name = "st_parking_count";
  const Jn_Tbl_10_name = "st_deposit_range";
  const Jn_Tbl_11_name = "st_maintenance";
  const Jn_Tbl_12_name = "st_tenant";
  const Jn_Cnd_1 = "dy_property.prop_type_id = st_prop_type.id"; // Join condition 1
  const Jn_Cnd_2 = "dy_property.home_type_id = st_home_type.id";
  const Jn_Cnd_3 = "dy_property.prop_desc_id = st_prop_desc.id";
  const Jn_Cnd_4 = "dy_property.community_id = st_community.id";
  const Jn_Cnd_5 = "dy_property.no_beds = st_beds.id";
  const Jn_Cnd_6 = "dy_property.no_baths = st_baths.id";
  const Jn_Cnd_7 = "dy_property.no_balconies = st_balcony.id";
  const Jn_Cnd_8 = "dy_property.tenant_eat_pref_id = st_tenant_eat_pref.id";
  const Jn_Cnd_9 = "dy_property.parking_count_id = st_parking_count.id";
  const Jn_Cnd_10 = "dy_property.deposit_range = st_deposit_range.id";
  const Jn_Cnd_11 = "dy_property.maintenance_id = st_maintenance.id"; 
  const Jn_Cnd_12 = "dy_property.tenant_type_id = st_tenant.id"; //


  const Jn_Typ = "LEFT JOIN"; // Join type (INNER, LEFT, RIGHT)
  const Fld_Nms = `dy_property.id,
  dy_property.user_id,
  dy_property.prop_type_id,
  dy_property.home_type_id,
  dy_property.prop_desc_id,
  dy_property.community_id,
  dy_property.no_beds,
  dy_property.no_baths,
  dy_property.no_balconies,
  dy_property.no_tenant_type_id,
  dy_property.tenant_eat_pref_id,
  dy_property.parking_count_id,
  dy_property.deposit_range_id,
  dy_property.maintenance_id`;
  try {
    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // First query to get the total count of properties (without pagination)
    const [totalCountRows] = await db.query(
      `SELECT COUNT(*) AS total FROM dy_property`
    );
    const totalProperties = totalCountRows[0].total;

    // Call the stored procedure to fetch paginated data
    const [rows] = await db.query(
      `CALL getJoinedData(?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [Sc_Tbl_Name,
        Jn_Tbl_1_Name,
        Jn_Tbl_2_name,
        Jn_Tbl_3_name,
        Jn_Tbl_4_name,
        Jn_Tbl_5_name,
        Jn_Tbl_6_name,
        Jn_Tbl_7_name,
        Jn_Tbl_8_name,
        Jn_Tbl_9_name,
        Jn_Tbl_10_name,
        Jn_Tbl_11_name,
        Jn_Tbl_12_name,
        Jn_Tbl_1_Name,
        Jn_Cnd_1,
        Jn_Cnd_2,
        Jn_Cnd_3,
        Jn_Cnd_4,
        Jn_Cnd_5,
        Jn_Cnd_6,
        Jn_Cnd_7,
        Jn_Cnd_8,
        Jn_Cnd_9,
        Jn_Cnd_10,
        Jn_Cnd_11,
        Jn_Cnd_12,
        Jn_Typ,
        Fld_Nms
]
    );

    const properties = rows[0]; // The result of the stored procedure

    // Apply pagination
    const paginatedProperties = properties.slice(offset, offset + parseInt(limit));

    // Response
    res.json({
      message: "Properties retrieved successfully",
      totalProperties,
      page: parseInt(page),
      limit: parseInt(limit),
      properties: paginatedProperties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "An error occurred while retrieving properties." });
  }


}*/
/*const displayProperties = async (req, res) => {
  try {
    const mainTable = "dy_property"; // Main table name
    const joinType = "LEFT"; // Join type (INNER, LEFT, RIGHT)
    const propertyId = req.query.id; // Get the id from the query parameters

    // Define join configurations
    const joins = [
      {
        joinTable: "dy_user",
        joinCondition: "dy_property.user_id=dy_user.id",
        fields: "dy_property.id, dy_user.user_name" // Include dy_property.id
      },
      {
        joinTable: "st_prop_type",
        joinCondition: "dy_property.prop_type_id=st_prop_type.id",
        fields: "st_prop_type.prop_type"
      },
      {
        joinTable: "st_home_type",
        joinCondition: "dy_property.home_type_id=st_home_type.id",
        fields: "st_home_type.home_type"
      },
      {
        joinTable: "st_prop_desc",
        joinCondition: "dy_property.prop_desc_id=st_prop_desc.id",
        fields: "st_prop_desc.prop_desc"
      },
      {
        joinTable: "st_tenant",
        joinCondition: "dy_property.tenant_type_id=st_tenant.id",
        fields: "st_tenant.tenant_type"
      },
      {
        joinTable: "st_parking_type",
        joinCondition: "dy_property.parking_type_id=st_parking_type.id",
        fields: "st_parking_type.parking_type"
      },
      {
        joinTable: "st_maintenance",
        joinCondition: "dy_property.maintenance_id=st_maintenance.id",
        fields: "st_maintenance.maintenance_type"
      },
      {
        joinTable: "st_community", // Community join with full details
        joinCondition: "dy_property.community_id=st_community.id",
        fields: "st_community.id, st_community.name, st_community.map_url, st_community.total_area, st_community.open_area, st_community.nblocks, st_community.nfloors_per_block, st_community.nhouses_per_floor, st_community.address, st_community.builder_id, st_community.totflats, st_community.status"
      }
    ];

    // Fetch data for each join
    const results = await Promise.all(
      joins.map(join =>
        db.query(`CALL getJoinedData(?, ?, ?, ?, ?)`, [
          mainTable,
          join.joinTable,
          join.joinCondition,
          joinType,
          join.fields
        ])
      )
    );

    // Extract and flatten the data for each join
    let propertyData = results[0][0][0]; // Include and sort property data by `id`
    console.log("pr",propertyData);
    let propTypes = results[1][0][0].sort((a, b) => a.id - b.id);
    console.log("propty",propTypes)
    const homeTypes = results[2][0][0].sort((a, b) => a.id - b.id);
    const propDescs = results[3][0][0].sort((a, b) => a.id - b.id);
    const tenantTypes = results[4][0][0].sort((a, b) => a.id - b.id);
    const parkingTypes = results[5][0][0].sort((a, b) => a.id - b.id);
    const maintenanceNames = results[6][0][0].sort((a, b) => a.id - b.id);
    const communityDetails = results[7][0][0].sort((a, b) => a.id - b.id); // Full community details

    // Debugging logs to inspect fetched data
    // console.log("Property Data:", propertyData);
    // console.log("Prop Types:", propTypes);
    // console.log("Home Types:", homeTypes);
    // console.log("Property Descriptions:", propDescs);
    // console.log("Tenant Types:", tenantTypes);
    // console.log("Parking Types:", parkingTypes);
    // console.log("Maintenance Types:", maintenanceNames);
    // console.log("Community Details:", communityDetails);

    // Combine all data into a single structure and order by property.id
    let combinedData = propertyData.map((property, index) => {
      // Find the matching community for each property by community_id
      const community = communityDetails.find(community => community.id === property.community_id);
      
      return {
        id: property.id, // Access dy_property ID
        user_name: property.user_name,
        prop_type: propTypes[index]?.prop_type || null,
        home_type: homeTypes[index]?.home_type || null,
        prop_desc: propDescs[index]?.prop_desc || null,
        tenant_type: tenantTypes[index]?.tenant_type || null,
        parking_type: parkingTypes[index]?.parking_type || null,
        maintenance: maintenanceNames[index]?.maintenance_type || null,
        community: community || null, // Find matching community based on community_id
        no_beds: property.no_beds,
        no_baths: property.no_baths,
        no_balconies: property.no_balconies,
        tenant_eat_pref: property.tenant_eat_pref_id, // Update if join needed
        parking_count: property.parking_count_id, // Update if join needed
        deposit_range: property.deposit_range_id, // Update if join needed
        gender_pref: property.gender_pref,
        availabl_date: property.availabl_date,
        current_status: property.current_status,
        tower_no: property.tower_no,
        floor_no: property.floor_no,
        flat_no: property.flat_no,
        images_location: property.images_location,
        rec_add_time: property.rec_add_time,
        rec_last_update_time: property.rec_last_update_time,
        rental_low: property.rental_low,
        rental_high: property.rental_high
      };
    }).sort((a, b) => a.id - b.id); // Ensure data is ordered by `id`

    // If an id is provided, filter the data for that specific id
    if (propertyId) {
      combinedData = combinedData.filter(property => property.id === parseInt(propertyId));
    }

    // Debugging: Log the combined data
    //console.log("Combined Data:", combinedData);

    // Send the combined data as JSON response
    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "An error occurred while retrieving data." });
  }
};*/













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
    let idColumn = rm_id ? 'rm_id' : 'fm_id';
    let idValue = rm_id || fm_id;

    // Validate if the provided id is a number
    if (isNaN(idValue)) {
      return res.status(400).json({ error: `Invalid ${idColumn}.` });
    }

    // Define the table name, join clauses, and fields
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

    // Construct WHERE clause dynamically based on rm_id or fm_id
    const whereCondition = rm_id
      ? `dt.rm_id = ${db.escape(rm_id)}`
      : `dt.fm_id = ${db.escape(fm_id)}`;

    // Call the stored procedure with the dynamic WHERE condition
    const [results] = await db.execute(
      `CALL getJoinedData(?, ?, ?, ?)`,
      [tableName, joinClauses, fieldNames, whereCondition]
    );

    // If no records are found, return a 404 error
    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'No records found for the provided rm_id or fm_id.' });
    }

    // Return the retrieved results
    res.status(200).json({
      message: `Retrieved successfully.`,
      result: results[0],
    });

  } catch (error) {
    console.error('Error retrieving data:', error.message);
    return res.status(500).json({ error: 'An error occurred while retrieving the transaction data.' });
  }
};


const listOfFmBasedOnCommunityId=async(req,res)=>{
  const {community_id}=req.query

  try {
    const tableName = `dy_rm_fm_com_map r`;
    const joinClauses = `LEFT JOIN dy_user u ON r.fm_id = u.id`;
    const fieldNames = `r.fm_id,u.user_name AS fm_name`;
    const whereCondition = community_id
    ? `r.community_id = ${db.escape(community_id)}`:'';



    // Call the stored procedure with the dynamic WHERE condition
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
      message: `Retrieved successfully.`,
      result: results[0],
    });
} catch (error) {
    console.error('Error fetching FM status data:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching FM status data.' });
}

}


































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


  const updateTransaction = async (req, res) => {
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
  
      res.status(200).json({
        message: 'Transaction updated successfully',
        result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating transaction', error: error.message });
    } finally {
      connection.release();
    }
  };
  
  
  
  
  
  
module.exports = { addRequest,displayProperties,getAllTransactionBasedOnId,listOfFmBasedOnCommunityId,getRecords,updateTransaction};
