// controllers/customerController.js
const CustomerModel = require('../model/AdminUserModel');
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createCustomer(req, res) {
    try {
        let isExist = false;
        let { email, password, firstName,lastName,phoneNumber,addressL1,addressL2,addressL3 } = req.body;
        //check the user is available
        const find = 'SELECT * FROM customer WHERE email = ?';
        db.query(find,[email],(error,data)=>{
            if (error) {
               return  res.status(500).json({ error: 'Database error' });
            }else {
                console.log(data.length===0);
                if(data.length!==0){
                    isExist = true;
                    console.log('Already Exist')
                    return  res.status(200).json({message: 'Already Exist'});
                }else {
                    //Encrypt Password
                    bcrypt.genSalt(10,function (err,salt) {
                        bcrypt.hash(password.trim(), salt, (err, hash) => {

                            console.log(hash)
                            const query = 'INSERT INTO customer (email, password,firstName,lastName,phoneNumber,addressL1,addressL2,addressL3) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                            db.query(query, [email, hash, firstName,lastName,phoneNumber,addressL1,addressL2,addressL3],(error,data)=>{
                                if (error) {
                                    return res.status(500).json({ error: 'Database error' });
                                }else {
                                    console.log("Registration Successful!")
                                    return  res.status(200).json({message: 'Registration Success'});

                                }

                            });
                        });
                    });

                }
            }

        });

    } catch (error) {
        return  res.status(500).json({ error: 'Internal server error' });
    }
}

async function LoginUser(req,res){
    
    try {
        const {email,password} = req.body;
        const query = 'SELECT * FROM customer WHERE email = ?';
        db.query(query,[email],(error,data)=>{
            console.log(data)
            if (error) {
               return res.status(500).json({ error: 'Database error' });
            }else if(data.length!==0){

                bcrypt.compare(password.trim(),data[0].password.trim(),(err, finalresult)=> {
                    console.log(finalresult)
                    if(err){
                        console.log(err);
                    }

                    if (finalresult) {
                        const token = jwt.sign(
                            {email: email, password: password},
                            process.env.JWT_ACCOUNT, {expiresIn: '168h'}
                        );

                        console.log('Logged In');
                       return  res.status(200).json({message: 'success', token: token,customerID:data[0].customerID});
                    } else {
                       return  res.status(200).json({message: 'Failed'});

                    }
                });

            }else {
                return  res.status(200).json({message: 'No user Found'});
            }

        });

    }catch (e) {
       return  res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { createCustomer,LoginUser };
