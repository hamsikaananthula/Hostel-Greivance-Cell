const mongo_url='mongodb://127.0.0.1:27017/test';
const mongoose =require("mongoose");
const initdata=require("./data4.js");
const users=require("../models/admin.js");
main()
.then(()=>{
   console.log("connected to db");
});
async function main(){
   await mongoose.connect(mongo_url);
}
const initdb=async()=>{
   await users.deleteMany({});
   await users.insertMany(initdata.data);
   console.log(initdata.data);
   console.log("data was intialized");
}
initdb();