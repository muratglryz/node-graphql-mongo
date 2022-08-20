
const mongoose=require("mongoose");

const schema = mongoose.Schema;


const selling = new schema({
    user_id:String,
    address:String,
    telephone:String,
    mail:String,
    payment_type:String,
    total_price:String,
},
{
    collection: 'selling'
});



module.exports=mongoose.model("selling", selling);