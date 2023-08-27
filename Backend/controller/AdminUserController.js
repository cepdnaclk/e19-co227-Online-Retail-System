// controllers/customerController.js
const CustomerModel = require('../model/AdminUserModel');
const db = require('../database');

async function createCustomer(req, res) {
    try {
        const { email, password, firstName,lastName,phoneNumber,addressL1,addressL2,addressL3 } = req.body;
        const query = 'INSERT INTO customer (email, password,firstName,lastName,phoneNumber,addressL1,addressL2,addressL3) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const result = await db.query(query, [email, password, firstName,lastName,phoneNumber,addressL1,addressL2,addressL3],(error,data)=>{
            if (error) {
                return res.status(500).json({ error: 'Database error' });
            }
            console.log("Registration Successful!")
            res.status(200).json({message: 'Registration Success'});

        });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function LoginUser(req,res){
    
    try {
        const {email,password} = req.body;

        const query = 'SELECT * FROM customer WHERE email = ?';
        await db.query(query,[email],(error,data)=>{
            console.log(data);
            if (error) {
                res.status(500).json({ error: 'Database error' });
            }else {
                if(data[0].password === password){

                    res.status(200).json({message: 'success'});
                }else {
                    res.status(200).json({message: 'Login Failed'});
                }
            }

        });

    }catch (e) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { createCustomer,LoginUser };
