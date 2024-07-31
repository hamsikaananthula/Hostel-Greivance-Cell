const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const userSchema=new Schema({
   username:{
      type:String,
      required:true,
   },
   password:{
      type:String,
      required:true,
   },
   role:{
      type:String,
      default:"Admin",
   }
});
const AdminModel=mongoose.model("admins",userSchema);

module.exports=AdminModel;