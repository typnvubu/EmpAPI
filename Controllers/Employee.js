
const Employee=require('../Models/Employee');
const multer = require('multer');


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});
const uploadImg=multer({storage:storage}).single('Image');

const getAllEmployee=(req,res)=>{
    Employee.find({},(err,data)=>{
        if(err) return res.json({Error:err});
        return res.json(data);
    });
    
};

const newEmployee=(req,res)=>{
 
    Employee.findOne({'ID':req.body.ID},(err,data)=>{
        //if(err) console.log(err);
        if(data===null)
        {
            var emp=new Employee( 
            {
                ID:req.body.ID,
                Firstname:req.body.Firstname,
                Lastname:req.body.Lastname,
                Sex:req.body.Sex,
                Image:req.file.path
            })
            emp.save((err,data)=>{
                if(err) return res.json({Error:err});
                return res.json(data);
            })
        }
        else 
        {
            return res.json({message:'Employee already exist!'});   
        }
    });
};

const deleteAllEmployee=(req,res)=>{

    Employee.deleteMany({},err=>{
        if(err) return res.json({message: "Complete delete failed"});
        return res.json({message: "Complete delete successful!"});

    });
};

const getOneEmployee=(req,res)=>{
    
    let id=req.params.id;
    Employee.find({"ID":id},(err,data)=>{
        if(err || !data) return res.json({message:'Employee doesn\'t exist!'});
        return res.json(data);
    });
};

const newComment=(req,res)=>{    
   
    let id=req.params.id;
    let newCom=req.body.comment;
    const comment = {
        text: newCom,
        date: new Date()
    }
    
    Employee.findOne({'ID':id},(err,data)=>{
       
        if(err || !data || !newCom) return res.json({message: "Employee doesn't exist."});
        data.Description.push(comment);
        data.save(err=>{
            if(err) return res.json({message:'Comment failed to add.', Error:err});
        });
        return res.json(data);
    });
};

const deleteOneEmployee=(req,res)=>{
    let id=req.params.id;
    Employee.deleteOne({'ID':id},(err,data)=>{
        if(err || !data) return res.json({message:'Employee doesn\'t exist!'});
        return res.json({message:'Employee is deleted'});
    });    
};

module.exports={getAllEmployee,newEmployee,deleteAllEmployee,getOneEmployee,newComment,deleteOneEmployee,uploadImg};