const dotenv = require("dotenv");
const express = require("express");
const cors = require('cors');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');
const path = require('path')
const http = require("http")
// 1 using socket io
const socketIO = require("socket.io");
// 2 using events module of nodeJS to emit event from different modules (we want to emit an event from updatedOrder and listen it in app.js file (here))
const Emitter=require("events");

// dotenv configuration
dotenv.config({ path: './config.env' })

require("./db/connect");
const User = require('./models/userSchema')

//setting body parser (json to object)
app.use(express.json());

//to allow frontend to pass session and cookies
app.enable('trust proxy')
// session config
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production" ? true : false,
        maxAge: 1000 * 24 * 60 * 60,  // 24 hour,
    } 
})
)

app.use(flash());

// //global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    next()
})


// setting cross platform
app.use(cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_APP_URL],
    credentials: true,
}));

// 3 creating eventEmitter object and binding it to app object to use it in updatedOrder function (orderController in admin)
// ***************
const eventEmitter=new Emitter();
app.set("eventEmitter",eventEmitter);

// 4 socket io requires a server so we create one
const server = http.createServer(app)

//5 configuring socket io options
//*************** */
const io = socketIO(server, {
    cors: {
        origin: [process.env.CLIENT_URL, process.env.ADMIN_APP_URL],
        methods: ["GET", "POST"],
    },
})

// 6 whenever connection is established between sockets the connection event is emitted with a socket object so we handle it here 
// ********************
io.on("connection", (socket) => {
    //just to get to know that connection is established
    // console.log(`User Connected with Socket Id: ${socket.id}`);

    // //for testing purpose whenever some one emit message then this will work to see using example uncomment code in App.js in client
    // socket.on("message", (data) => {
    //     console.log("message from user ", data)
    // })

    // 7 the page which want to communicate with this send a id to join its personal room saved in data (Client side MyOrders.js emits a join event with id="getUpdatedOrder")
    // 8 our socket joins the private room 
    // *******************
    socket.on("join", (data) => {
        // clg
        socket.join(data)
    })
    // socket.on("disconnect", () => {
    //     console.log("disconnected")
    //     // socket.
    // })
})
// 9 now whenever orde gets updated it emits an event "orderUpdated" in updatedOrder function in (ordercontroller of admin) we handle that event here

//10 if an event of type/id "orderUpdated" was occured/emitted then emit a event in the private room using the id sent by the room itself and also send data
// ***************************
eventEmitter.on("orderUpdated",(data)=>{
    // 11 emits a socket event "orderUpdated to private room having id "getUpdatedOrder" 
    // console.log("DATA is ",data)
    io.to("getUpdatedOrder").emit("orderUpdated",data)
})

// 12 private room have a handler to what to do if a socket event of type "orderUpdated" was emit



//linking routes files (middleware) 
app.use(require('./routes/auth'));
app.use(require('./routes/admin/auth'));
app.use(require('./routes/category'));
app.use(require('./routes/product'));
app.use(require('./routes/message'))
app.use(require('./routes/order'), (req, res, next) => {
    req.io = io;
    next();
});
app.use(require("./routes/admin/initialData"));

// for acessing static files through path name

app.use(express.static(path.join(__dirname, "uploads")));


//setting port
PORT = process.env.PORT || 8000;

// listening req at the PORT
server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})