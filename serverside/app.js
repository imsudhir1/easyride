const express = require('express');
const app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json())
app.use(cors());
const port="3001";
const userRouter = require('./api/users/user.router');
const locationRouter = require('./api/location/location.router');
const customerRouter = require('./api/customer/customer.router');
const bookingRouter = require('./api/booking/booking.router');
const pricingRouter = require('./api/pricemanagement/pricemanagement.router');

app.use("/api/users", userRouter); 
app.use("/api/location", locationRouter); 
app.use("/api/customer", customerRouter); 
app.use("/api/booking", bookingRouter);
app.use("/api/pricemanagement", pricingRouter);

 
app.get("/api", (req, res) => {
    res.json({
        success:1,
        message:"weldone your rest api is working"
    })
}) 





 


app.listen(3001,()=>{
    console.log("server is running at :" + 3001)
    });  
 
