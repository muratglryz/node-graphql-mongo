
const mongoose=require("mongoose");

const schema = mongoose.Schema;


const customers = new schema({
    username:String,
    password:String,
    first_name:String,
    last_name:String,
    address:String,
    telephone:String,
    mail:String,
},
{
    collection: 'customers'
});



module.exports=mongoose.model("customers", customers);
