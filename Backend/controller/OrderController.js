const db = require('../database');


const getOrders = async(req,res)=>{

    try{
        const id = req.headers.id
        const query= 'SELECT o.*, c.firstName AS firstName,c.lastName AS lastName, c.email AS email,c.phoneNumber AS phoneNumber FROM `order` AS o JOIN `customer` AS c ON o.customerID = c.customerID WHERE o.sellerID = ?;';
        db.query(query,[id],(err,data)=>{
            if (err) {
                console.log(err)
                return res.status(500).json({ error: 'Database error' });
            }else {
                return  res.status(200).json({data:data});

            }

        });
    }catch (error) {
        console.log(error)
        return  res.status(500).json({ error: 'Internal server error' });
    }

}

const getOrderItems = async(req,res)=>{

    try{
        const id = req.headers.id
        const query= 'SELECT oi.*,prod.productName AS productName,prod.productImage1 AS image,prod.productQty AS qty FROM `order_item` AS oi JOIN product AS prod ON oi.productID=prod.productID WHERE orderID=?;';
        db.query(query,[id],(err,data)=>{
            if (err) {
                console.log(err)
                return res.status(500).json({ error: 'Database error' });
            }else {

                return  res.status(200).json({data:data});

            }

        });
    }catch (error) {
        console.log(error)
        return  res.status(500).json({ error: 'Internal server error' });
    }

}
const updateTracking = async(req,res)=>{

    try{
        const {orderID,trackingNumber,deliveryCompany} = req.body

        const query= 'UPDATE `order` SET trackingID=? ,deliveryCompany=? WHERE orderID=?;';
        db.query(query,[trackingNumber,deliveryCompany,orderID],(err,data)=>{
            if (err) {
                console.log(err)
                return res.status(500).json({ error: 'Database error' });
            }else {
                console.log(data)
                return  res.status(200).json({message:"Tracking Details Updated"});

            }

        });
    }catch (error) {
        console.log(error)
        return  res.status(500).json({ error: 'Internal server error' });
    }

}

const updateStatus = async(req,res)=>{

    try{
        const {id,status} = req.body
        console.log(status)
        console.log(id)
        const query= 'UPDATE `order` SET orderStatus=? WHERE orderID=?;';
        db.query(query,[status,id],(err,data)=>{
            if (err) {
                console.log(err)
                return res.status(500).json({ error: 'Database error' });
            }else {
                console.log(data)
                return  res.status(200).json({message:"Order Status Updated"});

            }

        });
    }catch (error) {
        console.log(error)
        return  res.status(500).json({ error: 'Internal server error' });
    }

}


const deleteOrder = async(req,res)=>{

    try{
        const id = parseInt(req.params.id);
        console.log(id)
        const query= 'DELETE FROM order_item WHERE orderID = ?';
        db.query(query,[id],(err,data)=>{
            if (err) {
                console.log(err)
                return res.status(500).json({ error: 'Database error' });
            }else {

                const query= 'DELETE FROM `order` WHERE orderID = ?';
                db.query(query,[id],(err,data)=>{
                    if (err) {
                        console.log(err)
                        return res.status(500).json({ error: 'Database error' });
                    }else {
                        console.log(data)
                        return  res.status(200).json({message:"Order Deleted"});

                    }

                });

            }

        });
    }catch (error) {
        console.log(error)
        return  res.status(500).json({ error: 'Internal server error' });
    }

}

const getcustomerinfo = async(req,res) =>{

    const customerID = req.body.customerID

    const q = 
    
    `SELECT
    c.firstName,
    c.lastName,
    c.email,
    c.phoneNumber,
    c.addressL1,
    c.addressL2,
    c.addressL3
  FROM
  customer AS c

  WHERE
    c.customerID = ?;
  `
  
  db.query(q,[customerID],(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
  
  }
//get Customer Orders for see their order status
const getCustomerOrders = async(req,res)=>{

    try{
        const id = req.headers.id
        const query= 'SELECT o.*, c.firstName AS firstName,c.lastName AS lastName, c.email AS email,c.phoneNumber AS phoneNumber FROM `order` AS o JOIN `customer` AS c ON o.customerID = c.customerID WHERE o.customerID = ?;';
        db.query(query,[id],(err,data)=>{
            if (err) {
                console.log(err)
                return res.status(500).json({ error: 'Database error' });
            }else {
                return  res.status(200).json({data:data});

            }

        });
    }catch (error) {
        console.log(error)
        return  res.status(500).json({ error: 'Internal server error' });
    }

}

const putOrder = async(req,res)=>{
    try {
        
        let { firstName,lastName ,phoneNumber ,addressL1 ,addressL2,addressL3,customerid,paymentmethod } = req.body;
        console.log(firstName)
        const query1 = 'INSERT INTO `order` firstName = ?, lastName = ?,  phoneNumber = ?,  addressL1 = ?,  addressL2 = ?,  addressL3 = ? customerID = ?;';
        db.query(query1, [firstName,lastName ,phoneNumber ,addressL1 ,addressL2,addressL3 ,customerid],(error,data)=>{
            if (error) {
                console.log(error)
                return res.status(500).json({ error: 'Database error' });
            }else {
                console.log("Order Added")
                return  res.status(200).json({message: 'Customer Updated'});

            }

        });

    } catch (error) {
        console.log(error)
        return  res.status(500).json({ error: 'Internal server error' });
    }

}


const getSalesAmount = async(req,res)=>{

    try{
        const id = req.headers.id

        //get data since past 30 days
        const today = new Date();
        const past30Days = new Date(today);
        past30Days.setDate(today.getDate() - 30);
        const past7Days = new Date(today);
        past7Days.setDate(today.getDate() - 7);

        const query= 'SELECT orderDate, orderTotal\n' +
            '  FROM `order`\n' +
            '  WHERE DATE(orderDate) >= DATE(?) AND sellerID = ?';
        db.query(query,[past30Days,id],(err,data)=>{


            if (err) {
                console.log(err)
                return res.status(500).json({ error: 'Database error' });
            }else {
                //Calculate the sales in today, 7 days and 30 days
                let totalToday = 0;
                let totalPast7Days = 0;
                let totalPast30Days = 0;

                data.forEach((row) => {
                    const orderDate = new Date(row.orderDate);
                    const orderTotal = row.orderTotal;

                    if (orderDate === today) {
                        totalToday += orderTotal;
                    }

                    if (orderDate >= past7Days) {
                        totalPast7Days += orderTotal;
                    }

                    if (orderDate >= past30Days) {
                        totalPast30Days += orderTotal;
                    }

            });
                return  res.status(200).json({today:totalToday,past7Days:totalPast7Days,past30Days:totalPast30Days});

            }

        });
    }catch (error) {
        console.log(error)
        return  res.status(500).json({ error: 'Internal server error' });
    }

}





module.exports = {
    getOrders,
    getOrderItems,
    updateTracking,
    updateStatus,
    deleteOrder,
    getcustomerinfo,
    getCustomerOrders,
    getSalesAmount,
    putOrder
}
