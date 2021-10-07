const mongoose=require('mongoose');

const EmployeeSchema=new mongoose.Schema({
    ID:{type:String,required:true},
    Firstname:{type:String,required:true},
    Lastname:{type:String,required:true},
    Sex:Boolean,
    Image:String,
    Description:[{text:String,date:{type:Date,default: new Date()}}]
});

const Employee=mongoose.model('Employee',EmployeeSchema);

module.exports=Employee;