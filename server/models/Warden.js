const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const complaintSchema=new Schema({
   username:{
      type:String,
      required:true,
   },
   password:{
      type:String,
      required:true,
   },
   HostelName:{
      type:String,
      required:true,
   },
   role:{
      type:String,
      default:"Warden",
   }
});
const wardens=mongoose.model("warden",complaintSchema);
module.exports=wardens;