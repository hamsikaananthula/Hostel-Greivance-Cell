const mongoose =require("mongoose");
const Complaint=require("./ecomplaint");
const Worker = new mongoose.Schema({
   name: String,
   assignedComplaint: {
    type:Boolean,
    default:false,
   },
   expertise:{
    type:String,
    required:true,
   },
   role:{
    type:String,
    default:"Worker",
   },
   username:String,
   password:String,
   Phoneno:String,
 });
 const EWModel=mongoose.model("eworkers",Worker);
module.exports=EWModel;