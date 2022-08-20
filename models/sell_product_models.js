
const mongoose=require("mongoose");

const schema = mongoose.Schema;


const sell_product = new schema({
    sell_id:String,
    product_id:String,
    piece:Number,
    total_price:String,
},
{
    collection: 'sell_product'
});



module.exports=mongoose.model("sell_product", sell_product);
