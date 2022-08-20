
const mongoose=require("mongoose");

const schema = mongoose.Schema;


const basket = new schema({
    user_id:String,
    product_id:String,
    piece:Number
},
{
    collection: 'basket'
});



module.exports=mongoose.model("basket", basket);
