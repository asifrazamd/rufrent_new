const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const signup = async (req, res) => {
    const { user_name, email_id, passwd } = req.body;

    if (!user_name || !email_id || !passwd) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if the user already exists
        const [[user]] = await db.query('CALL getRecordsByFields(?, ?, ?)', [
            'dy_user',
            '*',
            `email_id = '${email_id}'`
        ]);

        if (user && user.length > 0) {
            return res.status(409).json({ message: 'User already exists. Please login.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(passwd, parseInt(process.env.BCRYPT_SALT_ROUNDS));

        // Insert the new user using `addNewRecord`
        const fieldNames = 'user_name, email_id, passwd';
        const fieldValues = `'${user_name}', '${email_id}', '${hashedPassword}'`;
        await db.query('CALL addNewRecord(?, ?, ?)', ['dy_user', fieldNames, fieldValues]);

        res.status(201).json({ message: 'User created successfully.' });
    } catch (err) {
        console.error('Error during signup:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const login = async (req, res) => {
    const { email_id, password } = req.body;

    if (!email_id || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Retrieve the user by email
        const [[user]] = await db.query('CALL getRecordsByFields(?, ?, ?)', [
            'dy_user',
            '*',
            `email_id = '${email_id}'`
        ]);

        if (!user || user.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user[0].passwd);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate a JWT
        const token = jwt.sign(
            { id: user[0].id, email: user[0].email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        const [role]=await db.query(`select role from st_role where id=?`,[user[0].role_id])


        res.status(200).json({ message: 'Login successful.', token,id:user[0].id,userName:user[0].user_name,role:role[0]});
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { signup, login };
