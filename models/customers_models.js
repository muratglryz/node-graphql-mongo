
const mongoose=require("mongoose");

const schema = mongoose.Schema;


const customers = new schema({
    username:{type:String, unique: true},
    password:String,
    first_name:String,
    last_name:String,
    address:String,
    telephone:{type:String, unique: true},
    mail:{type:String, unique: true},
},
{
    collection: 'customers'
});



module.exports=mongoose.model("customers", customers);
