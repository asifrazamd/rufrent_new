const db = require("../config/db"); // Database db
//const { redis } = require("../config/redis");
const { updateRecords } = require("../utils/updateRecords"); // Adjust the path as needed

const { getJoinedData } = require("../utils/getJoinedData");
const { getRecords } = require("../utils/getRecords"); // Import the getRecords function

const { propertyFields } = require("../utils/propertyFields");

const addRequest = async (req, res) => {
  // Extract user_id and property_id from the request body
  const { user_id, property_id } = req.body;

  // Validate the input: Ensure both user_id and property_id are provided
  if (!user_id || !property_id) {
    return res
      .status(400)
      .json({ error: "user_id and property_id are required." });
  }

  // Get a database connection from the connection pool
  const connection = await db.getConnection();
  try {
    // Start a transaction
    //await connection.beginTransaction();

    // Call the stored procedure to assign a relationship manager (RM) to the transaction
    const [result] = await connection.execute(
      "CALL AssignRmToTransaction(?, ?)", // Stored procedure name
      [user_id, property_id] // Parameters to pass to the stored procedure
    );
    //const [RM]=await connection.query(`call getJoinedData(?,?,?,?)`,['dy_transactions t,dy_property dy','left join dy_user u1 on t.user_id=u1.id','u1.user_name,u1.mobile_no','prop_id=dy.property_id and user_id=userId'])
    // Commit the transaction if everything is successful
    //await connection.commit();

    // Send a success response with the result
    res.status(201).json({
      message: "Transaction assigned successfully.",
      result,
      // RM,
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    //await connection.rollback();

    // Log the error and send an error response
    console.error("Error assigning transaction:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while assigning the transaction." });
  } finally {
    // Ensure the database connection is released back to the pool
    connection.release();
  }
};

/**
 * Controller function to display properties with optional filtering and pagination.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const showPropDetails = async (req, res) => {
  try {
    const {
      property_id,
      city,
      builders,
      community,
      hometype,
      propertydescription,
      page = 1,
      limit = 6,
    } = req.query;

    const sanitizedPage = Math.max(1, parseInt(page, 10));
    const sanitizedLimit = Math.max(1, parseInt(limit, 10));
    const offset = (sanitizedPage - 1) * sanitizedLimit;

    const tableName = "dy_property dy";
    const joinClauses = propertyFields();

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
      sc.default_images as default_images,
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
      dy.images_location,
      sb.name AS builder_name,
      scity.name AS city_name  -- Fetch the city name
    `;

    const whereClauses = [];

    // Add conditions based on provided filters
    if (property_id) whereClauses.push(`dy.id = ${db.escape(property_id)}`);
    if (city) {
      const cityArray = city.split(",").map((c) => c.trim());
      const escapedCities = cityArray.map((c) => db.escape(c)).join(", ");
      whereClauses.push(`scity.id IN (${escapedCities})`);
    }
    if (builders) {
      const buildersArray = builders
        .split(",")
        .map((builder) => builder.trim());
      const escapedBuilders = buildersArray
        .map((builder) => db.escape(builder))
        .join(", ");
      whereClauses.push(`sb.id IN (${escapedBuilders})`);
    }
    if (community) {
      const communityArray = community.split(",").map((com) => com.trim());
      const escapedCommunities = communityArray
        .map((com) => db.escape(com))
        .join(", ");
      whereClauses.push(`sc.id IN (${escapedCommunities})`);
    }
    if (hometype) {
      const hometypeArray = hometype.split(",").map((type) => type.trim());
      const escapedHometypes = hometypeArray
        .map((type) => db.escape(type))
        .join(", ");
      whereClauses.push(`dy.home_type_id IN (${escapedHometypes})`);
    }
    if (propertydescription) {
      const propertyDescArray = propertydescription
        .split(",")
        .map((desc) => desc.trim());
      const escapedPropertyDescs = propertyDescArray
        .map((desc) => db.escape(desc))
        .join(", ");
      whereClauses.push(`dy.prop_desc_id IN (${escapedPropertyDescs})`);
    }

    // Construct WHERE condition based on the clauses
    const whereCondition =
      whereClauses.length > 0 ? whereClauses.join(" AND ") : "1"; // Default to no filter if no conditions

    query = {
      tableName: tableName,
      joinClauses: joinClauses,
      fieldNames: fieldNames,
      whereCondition: whereCondition,
    };

    const [results] = await getJoinedData((req = { query }), res, {
      resultOnly: true,
    });

    const paginatedResults = results.slice(offset, offset + sanitizedLimit);
    const totalRecords = results.length;
    const totalPages = Math.ceil(totalRecords / sanitizedLimit);

    if (paginatedResults.length === 0) {
      return res.status(404).json({
        error: "No properties found for the given property_id or page.",
      });
    }

    const enhancedResults = paginatedResults.map((property) => {
      const address = property.address || "";
      const pincodeMatch = address.match(/\b\d{6}\b/);
      const pincode = pincodeMatch ? pincodeMatch[0] : null;
      const pincodeUrl = pincode
        ? `https://api.postalpincode.in/pincode/${pincode}`
        : null;

      return {
        ...property,
        pincode,
        pincode_url: pincodeUrl,
      };
    });

    res.status(200).json({
      message: property_id
        ? `Details for property ID: ${property_id}`
        : `All property details`,
      pagination: {
        currentPage: sanitizedPage,
        totalPages,
        totalRecords,
        limit: sanitizedLimit,
      },
      results: enhancedResults,
    });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({
      error: "Database error occurred while executing the query.",
      details: err.message,
    });
  }
};

const userActions = async (req, res) => {
  try {
    // Extract query parameters for filtering
    const { user_id, property_id, id } = req.query;

    // Define the table name and the join clauses for the query
    const tableName = "dy_user_actions ua";
    const joinClauses = `
INNER JOIN 
    dy_user u ON ua.user_id = u.id
LEFT JOIN 
    dy_property dy ON ua.property_id = dy.id
LEFT JOIN 
    st_prop_type spt ON dy.prop_type_id = spt.id
LEFT JOIN 
    st_home_type sht ON dy.home_type_id = sht.id
LEFT JOIN 
    st_prop_desc spd ON dy.prop_desc_id = spd.id
LEFT JOIN 
    st_community sc ON dy.community_id = sc.id
LEFT JOIN 
    st_beds snbe ON dy.no_beds = snbe.id
LEFT JOIN 
    st_baths snba ON dy.no_baths = snba.id
LEFT JOIN 
    st_balcony snbc ON dy.no_balconies = snbc.id
LEFT JOIN 
    st_tenant_eat_pref step ON dy.tenant_eat_pref_id = step.id
LEFT JOIN 
    st_parking_count spc ON dy.parking_count_id = spc.id
LEFT JOIN 
    st_deposit_range sdr ON dy.deposit_range_id = sdr.id
LEFT JOIN 
    st_maintenance sm ON dy.maintenance_id = sm.id
LEFT JOIN 
    st_current_status scd ON ua.status_code = scd.id
    `;

    // Define the fields to be retrieved in the query
    const fieldNames = `
          ua.id AS action_id,
    scd.status_code AS status_description,
    dy.id AS property_id,
    spt.prop_type AS prop_type,
    sht.home_type AS home_type,
    spd.prop_desc AS prop_desc,
    sc.name AS community_name,
    sc.address AS address,
    dy.images_location
    `;

    // Construct WHERE clause dynamically based on the presence of query parameters
    const conditions = [];
    if (id) conditions.push(`ua.status_code = ${db.escape(id)}`);
    if (user_id) conditions.push(`ua.user_id = ${db.escape(user_id)}`);
    if (property_id)
      conditions.push(`ua.property_id = ${db.escape(property_id)}`);

    const whereCondition =
      conditions.length > 0 ? conditions.join(" AND ") : "";

    query = {
      tableName: tableName,
      joinClauses: joinClauses,
      fieldNames: fieldNames,
      whereCondition: whereCondition,
    };

    const results = await getJoinedData((req = { query }), res, {
      resultOnly: true,
    });

    // Return 404 if no records are found
    if (results.length === 0) {
      return res.status(404).json({
        error: "No user actions found",
      });
    }

    // Return the results
    res.status(200).json({
      message: `User actions retrieved successfully.`,
      //filters: { id, user_id, property_id },
      results: results,
    });
  } catch (err) {
    // Log and return error details in case of failure
    console.error("Error executing query:", err);
    res.status(500).json({
      error: "Database error occurred while executing the query.",
      details: err.message,
    });
  }
};

/**
 * Controller to fetch all transactions based on rm_id or fm_id.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getTasks = async (req, res) => {
  const { rm_id, fm_id } = req.query;

  // Validate that at least one ID (rm_id or fm_id) is provided
  if (!rm_id && !fm_id) {
    return res
      .status(400)
      .json({ error: "Either rm_id or fm_id is required." });
  }

  // Ensure the provided ID is a valid number
  const idValue = rm_id || fm_id;
  const idColumn = rm_id ? "rm_id" : "fm_id";

  if (isNaN(idValue)) {
    return res
      .status(400)
      .json({ error: `Invalid ${idColumn}. Must be a number.` });
  }

  try {
    // Define the table name, join clauses, and fields for the query
    const tableName = "dy_transactions dt";
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
    const whereCondition = `${idColumn} = ${db.escape(idValue)}`;

    query = {
      tableName: tableName,
      joinClauses: joinClauses,
      fieldNames: fieldNames,
      whereCondition: whereCondition,
    };


    const results = await getJoinedData((req = { query }), res, {
      resultOnly: true,
    });

    // If no records are found, return a 404 error
    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ error: "No records found for the provided rm_id or fm_id." });
    }

    // Determine the status category based on the ID type
    const statusCondition = rm_id
      ? 'status_category="RMA" OR status_category="FMA"'
      : 'status_category="FMA"';

    query = {
      tbl_name: `st_current_status`,
      field_names: `id,status_code`,
      where_condition: statusCondition,
    };
    // Use `getRecords` to fetch statuses matching the condition
    const statusData = await getRecords((req = { query }), res, {
      resultOnly: true,
    });

    //const statusData= await db.query('st_current_status',)

    // Return the retrieved data and statuses
    res.status(200).json({
      message: "Data retrieved successfully.",
      result: results[0],
      status: statusData,
    });
  } catch (error) {
    // Log detailed error information for troubleshooting
    console.error("Error in getAllTransactionBasedOnId:", error);

    // Return a generic error message to the client
    res.status(500).json({
      error: "An error occurred while retrieving the transaction data.",
      details:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
};

/**
 * Fetches a list of Facility Managers (FM) based on a given community ID.
 * @param {Object} req - Express request object containing the query parameter `community_id`.
 * @param {Object} res - Express response object used to return the result or an error.
 */
const getFmList = async (req, res) => {
  // Extract community_id from query parameters
  const { community_id } = req.query;

  try {
    // Define the table name, join clauses, and fields for the query
    const tableName = `dy_rm_fm_com_map r`; // Main table alias
    const joinClauses = `LEFT JOIN dy_user u ON r.fm_id = u.id`; // Join with user table to fetch FM details
    const fieldNames = `r.fm_id, u.user_name AS fm_name`; // Required fields

    // Construct the WHERE condition dynamically if community_id is provided
    const whereCondition = community_id
      ? `r.community_id = ${db.escape(community_id)}` // Escape the input to prevent SQL injection
      : "";

    
    query = {
      tableName: tableName,
      joinClauses: joinClauses,
      fieldNames: fieldNames,
      whereCondition: whereCondition,
    };

    const results = await getJoinedData((req = { query }), res, {
      resultOnly: true,
    });
    

    // Check if no records are found
    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ error: "No records found for the provided community_id." });
    }

    // Return the results
    res.status(200).json({
      message: "Retrieved successfully.",
      result: results, // Results are usually nested in the first index
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching FM status data:", error.message);

    // Return a 500 error response
    res.status(500).json({
      error: "An error occurred while fetching FM status data.",
      details: error.message,
    });
  }
};

/**
 * Updates a transaction in the `dy_transactions` table.
 * Dynamically updates fields like `cur_stat_code`, `schedule_time`, `schedule_date`, and `fm_id` based on input.
 * Ensures `prev_stat_code` is updated when `cur_stat_code` is provided.
 *
 * @param {Object} req - Express request object containing transaction details in `req.body`.
 * @param {Object} res - Express response object used to send the response.
 */

const updateTask = async (req, res) => {
  const { id, cur_stat_code, schedule_time, schedule_date, fm_id } = req.body;
  let re;

  // Get a database connection
  const connection = await db.getConnection();

  try {
    // Fetch the current value of `cur_stat_code` for the transaction
   
    query = {
      tbl_name: `dy_transactions`,
      field_names: `cur_stat_code`,
      where_condition: `id = ${db.escape(id)}`,
    };
    console.log("query1",query);
    // Use `getRecords` to fetch statuses matching the condition
    const currentStatus = await getRecords((req = { query }), res, {
      resultOnly: true,
    });
    console.log("currentStatus",currentStatus);

    const currentStatCode = currentStatus?.[0]?.cur_stat_code;
    console.log("currentStatCode",currentStatCode);
    // If the new `cur_stat_code` is 24, update the `dy_property` table
    if (currentStatCode == 24) {
      // Fetch the property ID (`prop_id`) for the transaction
      
      query = {
        tbl_name: `dy_transactions`,
        field_names: `prop_id`,
        where_condition: `id = ${db.escape(id)}`,
      };
      console.log("query2",query);
      // Use `getRecords` to fetch statuses matching the condition
      const transaction = await getRecords((req = { query }), res, {
        resultOnly: true,
      });
      console.log("transaction",transaction);

      const propId = transaction?.[0]?.prop_id;
      console.log("propId",propId);

      if (propId) {
        // Prepare the request body for updating `dy_property`
        body = {
          tbl_name: "dy_property",
          field_values_pairs: { current_status: currentStatCode },
          where_condition: `id = ${db.escape(propId)}`,
        };
        console.log("body",body);
        // Use a transaction for safety
        await connection.beginTransaction();

        // Call the `updateRecords` utility function
         re = await updateRecords((req = { body }), res, {
          resultOnly: true,
        });
        console.log("re",re);
  
        // Commit the transaction
        await connection.commit();
      }
    }

    // Prepare dynamic field-value pairs for the update
    const fieldValuePairs = {};

    if (cur_stat_code) {
      // If `cur_stat_code` is provided, update `prev_stat_code` with the current value
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
    const whereCondition = `id = ${db.escape(id)}`;

    // Construct the request body for the `updateRecords` utility function
    body = {
      tbl_name: "dy_transactions",
      field_values_pairs: fieldValuePairs,
      where_condition: whereCondition,
    };
    console.log("body2",body);
    // Use a transaction for safety
    await connection.beginTransaction();

    // Call the `updateRecords` function to execute the update
    //const re2 = await updateRecords(req);
    const re2 = await updateRecords((req = { body }), res, {
      resultOnly: true,
    });
    console.log("re2",re2);

    // Commit the transaction
    await connection.commit();
    // Return the results
    res.status(200).json({
      message: "Retrieved successfully.",
      result: re, // Results are usually nested in the first index
      r2: re2,
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    if (connection && connection.rollback) {
      await connection.rollback();
    }
    // Log the error and send a 500 response
    console.error("Error updating transaction:", error);
    res.status(500).json({
      message: "Error updating transaction",
      error: error.message,
      re1: re,
      re2: re2,
    });
  } finally {
    // Release the database connection
    connection.release();
  }
};

const getTopCommunities = async (req, res) => {
  const { city_id, rstatus = 1 } = req.query;

  try {
    if (!city_id) {
      return res.status(400).json({ message: "city_id is required." });
    }

    const [results] = await db.query("CALL getTopCommunities(?, ?)", [
      city_id,
      rstatus,
    ]);

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No communities found." });
    }

    res.status(200).json({
      message: "Retrieved successfully.",
      result: results[0], // Results are usually nested in the first index
    });
  } catch (error) {
    console.error("Error in getRecords:", error);
    return res
      .status(500)
      .json({ message: "Error getting records", error: error.message });
  }
};

module.exports = {
  addRequest,
  showPropDetails,
  userActions,
  getTasks,
  getFmList,
  updateTask,
  getTopCommunities,
};
