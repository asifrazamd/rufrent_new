/**
 * Routes for table-related operations.
 * This module defines API endpoints for interacting with tables.
 */

const express = require('express');
const router = express.Router();
const { addRequest,displayProperties,getAllTransactionBasedOnId,listOfFmBasedOnCommunityId,updateTransaction} = require('../controllers/tablesController');
const {addNewRecord}=require('../utils/addNewRecord');
const {getRecords}=require('../utils/getRecords');
const {updateRecords}=require('../utils/updateRecords');

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
router.post('/addNewRecord',addNewRecord);

router.post('/addRequest',addRequest);


router.get('/getAllProperties',displayProperties);

router.get('/requests',getAllTransactionBasedOnId);

//router.get('/status',getStatuses);

router.get('/FmList',listOfFmBasedOnCommunityId);

router.get('/getRecords',getRecords);

router.put('/updatetranscationsstatus',updateTransaction);

router.put('/updateRecords',updateRecords);






module.exports = router;
