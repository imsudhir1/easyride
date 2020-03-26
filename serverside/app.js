const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json())
app.use(cors());
const port="3001";
const userRouter = require('./api/users/user.router');
const locationRouter = require('./api/location/location.router');
const customerRouter = require('./api/customer/customer.router');

app.use("/api/users", userRouter); 
app.use("/api/location", locationRouter); 
app.use("/api/customer", customerRouter); 

 
app.get("/api", (req, res) => {
    res.json({
        success:1,
        message:"weldone your rest api is working"
    })
}) 

 
 
 


server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});






 


app.listen(3001,()=>{
    console.log("server is running at :" + 3001)
    });  
 