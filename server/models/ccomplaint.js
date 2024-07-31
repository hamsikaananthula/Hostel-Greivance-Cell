const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const complaintSchema = new mongoose.Schema({
   idd: {
     type: String,
     required: true,
   },
   RoomNo: {
     type: String,
     required: true,
   },
   HostelName: {
     type: String,
     required: true,
   },
   details: {
     type: String,
     required: true,
   },
   Status: {
     type: String,
     default: "Submitted",
   },
   Worker: {
     type: {
       username: String,
       name: String,
       Phoneno: String,
     },
     default: {
      username: "",
      name:"Going to be assigned",
      Phoneno:"Going to be informed",
    },
   },
 });
const CModel=mongoose.model("ccomplaint",complaintSchema);
module.exports=CModel;