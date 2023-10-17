const db = require('../database');


const getOrders = async(req,res)=>{

    try{
        const id = req.headers.id
        const query= 'SELECT o.*,  c.email AS email FROM `order` AS o JOIN `customer` AS c ON o.customerID = c.customerID WHERE o.sellerID = ?;';
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
        const query= 'SELECT o.*,  c.email AS email FROM `order` AS o JOIN `customer` AS c ON o.customerID = c.customerID WHERE o.customerID = ?;';
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
        
        let { firstName,lastName,mobile,address1,address2,address3,customerid,sellerid } = req.body.formData;
        console.log(req.body.cart)
        
        let orderDate = new Date();
        let price = 0;
        let D_charge = 10;
        let totalPrice = D_charge;        //delivery charge (10/=)
        for (let item of req.body.cart) {
            price = item.productPrice * item.qty;
            totalPrice += price ;
        }

        if (totalPrice !== D_charge) {
            const query1 = "INSERT INTO `order` (firstName, lastName, phoneNumber, address1, address2, address3, customerID, sellerID, orderTotal, orderDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?); SELECT LAST_INSERT_ID() AS GenorderID;"

            db.query(query1, [firstName,lastName,mobile,address1,address2,address3,customerid,sellerid,totalPrice, orderDate],(error,data)=>{
                if (error) {
                    console.log(error)
                    return res.status(500).json({ error: 'Database error' });
                }else {
                    console.log("Order Added")

                    const GenOrderID = (data[1][0].GenorderID);
                    //query 2 for update order_item table

                    const cartItems = req.body.cart;
                    let placeholders = cartItems.map(() => "(?, ?, ?, ?)").join(", ");

                    let values = [];
                    for (let item of cartItems) {
                        values = values.concat([GenOrderID,item.productID, item.productPrice, item.qty]);
                    }

                    let query2 = `INSERT INTO order_item (orderId,productID,totalPrice,itemQty) VALUES ${placeholders}`;

                    db.query(query2, values, (error, results, fields) => {
                        if (error) {
                            console.error(error);
                        } else {
                            console.log("Data inserted successfully!");

                            // delete from cart_item table
                            for (let item of cartItems) {
                                db.query("DELETE FROM cart_items WHERE productID = ?", [item.productID], (error, results, fields) => {
                                    if (error) {
                                        console.error(error);
                                    } else {
                                        console.log(`Item with productID ${item.productID} deleted from cart table.`);
                                    }
                                });
                            }
                                                    
                        }
                    });

                    return  res.status(200).json({message: 'Order Updated'});


                }
            });
        }


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

                    function isSameDate(date1, date2) {
                        return date1.getDate() === date2.getDate() &&
                            date1.getMonth() === date2.getMonth() &&
                            date1.getFullYear() === date2.getFullYear();
                    }

                    if (isSameDate(orderDate, today)) {
                        totalToday += orderTotal;
                    }

                    if (orderDate >= past7Days) {
                        totalPast7Days += orderTotal;
                    }

                    if (orderDate >= past30Days) {
                        totalPast30Days += orderTotal;
                    }

            });
                return  res.status(200).json({today:totalToday.toFixed(2),past7Days:totalPast7Days.toFixed(2),past30Days:totalPast30Days.toFixed(2)});

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
