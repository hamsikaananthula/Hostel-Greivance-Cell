const mongoose =require("mongoose");
const initdata2=require("./data2.js");
const wardens=require("../models/Warden.js");
const mongo_url='mongodb://127.0.0.1:27017/test';
main()
.then(()=>{
   console.log("connected to db");
});
async function main(){
   await mongoose.connect(mongo_url);
}
const initdb1=async()=>{
   await wardens.deleteMany({});
   await wardens.insertMany(initdata2.data);
   console.log(initdata2.data);
   console.log("data was intialized");
}
initdb1();