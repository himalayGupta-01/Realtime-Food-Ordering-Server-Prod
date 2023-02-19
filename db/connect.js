const mongoose = require("mongoose");

const DBONN = process.env.DATABASE_ONN;
// const DBOFF = process.env.DATABASE_OFF


//connecting database
mongoose.connect(DBONN).then(() => {
    console.log(`Trying to Connect to Online Database........`);
    console.log(`Connection Successfull With Online Database.............`);
}).catch((err) => {
    console.log(`No Connection with Online Database........`);
    // console.log(`Trying to Connect to Offline Database........`);

    // mongoose.connect(DBOFF).then(() => {
    //     console.log(`Connection Successfull With Offline Database.......`);
    // }).catch((err) => {
    //     console.log(`No Connection with OffLine Database...... Error is ${err}`);
    // });
});

