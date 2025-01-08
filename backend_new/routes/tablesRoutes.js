/**
 * Routes for table-related operations.
 * This module defines API endpoints for interacting with tables.
 */

const express = require('express');
const router = express.Router();
const { 
    addRequest,
    showPropDetails,
    getTasks,
    getFmList,
    updateTask, 
    userActions,
    getTopCommunities
} = require('../controllers/tablesController');
const { addNewRecord } = require('../utils/addNewRecord');
const { getRecords } = require('../utils/getRecords');
const { updateRecords } = require('../utils/updateRecords');
const { deleteRecords } = require('../utils/deleteRecords');

/**
 * POST /api/tables/addNewRecord
 * Route for adding a new record to a table using a stored procedure.
 * 
 * Request Body:
 * - tableName (string): The name of the table.
 * - fieldNames (string): The names of the fields (comma-separated).
 * - fieldValues (string): The values for the fields (comma-separated).
 * 
 * Response:
 * - Success: JSON object with a success message and query results.
 * - Error: JSON object with an error message.
 */
router.post('/addNewRecord', addNewRecord);

/**
 * POST /api/tables/addRequest
 * Route for adding a new request.
 * 
 * Request Body:
 * - Contains the necessary fields for creating a request.
 * 
 * Response:
 * - Success: JSON object with details of the created request.
 * - Error: JSON object with an error message.
 */
router.post('/addRequest', addRequest);

/**
 * GET /api/tables/getAllProperties
 * Route for retrieving all properties.
 * 
 * Response:
 * - Success: JSON array of properties.
 * - Error: JSON object with an error message.
 */
router.get('/showPropDetails', showPropDetails);


/**
 * GET /api/tables/requests
 * Route for fetching all transactions based on a given ID.
 * 
 * Query Parameters:
 * - id (string): The ID for filtering transactions.
 * 
 * Response:
 * - Success: JSON array of transactions.
 * - Error: JSON object with an error message.
 */


router.get('/actions',userActions);
router.get('/getTasks', getTasks);

/**
 * GET /api/tables/FmList
 * Route for retrieving a list of facility managers (FM) based on a community ID.
 * 
 * Query Parameters:
 * - communityId (string): The ID of the community.
 * 
 * Response:
 * - Success: JSON array of facility managers.
 * - Error: JSON object with an error message.
 */
router.get('/getFmList', getFmList);

/**
 * GET /api/tables/getRecords
 * Route for retrieving records from a specified table.
 * 
 * Query Parameters:
 * - tableName (string): The name of the table.
 * 
 * Response:
 * - Success: JSON array of records.
 * - Error: JSON object with an error message.
 */
router.get('/getRecords', getRecords);

/**
 * PUT /api/tables/updatetranscationsstatus
 * Route for updating the status of a transaction.
 * 
 * Request Body:
 * - transactionId (string): The ID of the transaction to update.
 * - status (string): The new status.
 * 
 * Response:
 * - Success: JSON object with details of the updated transaction.
 * - Error: JSON object with an error message.
 */
router.put('/updateTask', updateTask);

/**
 * PUT /api/tables/updateRecords
 * Route for updating records in a specified table.
 * 
 * Request Body:
 * - tableName (string): The name of the table.
 * - updateFields (object): Key-value pairs of fields to update.
 * - conditions (object): Conditions to identify records for update.
 * 
 * Response:
 * - Success: JSON object with details of the updated records.
 * - Error: JSON object with an error message.
 */
router.put('/updateRecords', updateRecords);

/**
 * DELETE /api/tables/deleteRecords
 * Route for deleting records from a specified table.
 * 
 * Request Body:
 * - tableName (string): The name of the table.
 * - conditions (object): Conditions to identify records for deletion.
 * 
 * Response:
 * - Success: JSON object with details of the deleted records.
 * - Error: JSON object with an error message.
 */
router.delete('/deleteRecords', deleteRecords);

/**
 * Export the router to be used in other parts of the application.
 */


router.get('/getTopCommunities',getTopCommunities)
module.exports = router;
