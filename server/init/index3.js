const mongoose =require("mongoose");
const initdata2=require("./data3.js");
const Eworkers=require("../models/EWorker.js");
const mongo_url='mongodb://127.0.0.1:27017/test';
main()
.then(()=>{
   console.log("connected to db");
});
async function main(){
   await mongoose.connect(mongo_url);
}
const initdb3=async()=>{
   await Eworkers.deleteMany({});
   await Eworkers.insertMany(initdata2.data);
   console.log(initdata2.data);
   console.log("data was intialized");
}
initdb3();