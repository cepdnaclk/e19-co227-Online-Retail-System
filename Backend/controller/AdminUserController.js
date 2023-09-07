// controllers/customerController.js
const CustomerModel = require('../model/AdminUserModel');
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createCustomer(req, res) {
    try {
        let isExist = false;
        let { email, password, firstName,lastName,phoneNumber,addressL1,addressL2,addressL3,role } = req.body;
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
                            const query = 'INSERT INTO customer (email, password,firstName,lastName,phoneNumber,addressL1,addressL2,addressL3,role) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)';
                            db.query(query, [email, hash, firstName,lastName,phoneNumber,addressL1,addressL2,addressL3,role],(error,data)=>{
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
        let isSeller = false;
        const {email,password} = req.body;
        const query = 'SELECT * FROM customer WHERE email = ?';
        db.query(query,[email],(error,data)=>{
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
                        if(data[0].role==='seller'){
                            isSeller=true
                        }else {
                            isSeller=false
                        }
                       return  res.status(200).json({message: 'success',isSeller:isSeller, token: token,customerID:data[0].customerID});
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

async function getSeller(req,res){
    try {
        const customerID = req.query.customerID;
        console.log('customer',customerID)
        const query = 'SELECT * FROM seller WHERE customerID = ?';
        db.query(query,[customerID],(error,data)=> {
            console.log(data)
            if (error) {
                return res.status(500).json({error: 'Database error'});
            } else if (data.length !== 0) {
                return res.status(200).json({sellerID:data[0].sellerID,shopName:data[0].shopName})
            }
        })
    }catch (error) {
        return  res.status(500).json({ error: 'Internal server error' });
    }


}
async function verifyToken(req,res) {
    try{
        const token = req.headers.token ? req.headers.token:'empty';
        if(token==='empty'){
            res.status(401).json({message:'UnAuthorized Request Detected!'});
            return;
        }
        const isValid = new Promise((resolve,reject)=>{
            jwt.verify(token,process.env.JWT_ACCOUNT,(error,decoded)=>{
                if(error){
                    reject(false);
                }
                if(decoded){
                    resolve(true);
                }
            });
        });
        isValid.then(reult=>{
            console.log("Token verified!")
            res.status(200).json({state:true,message:'Success'});
        }).catch(err=>{
            console.log("UnAuthorized Request Detected!")
            res.status(200).json({state:true,message:'UnAuthorized Request Detected!'});
        });
    }catch (e) {
        res.status(500).json({message:e});
    }
}


module.exports = { createCustomer,LoginUser,getSeller,verifyToken };
