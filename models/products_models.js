
const mongoose=require("mongoose");

const schema = mongoose.Schema;


const products = new schema({
    name:String,
    desc:String,
    SKU:Number,
    price:String,
    image:String,
    category_id:String,
    status:Number,
},
{
    collection: 'product'
});



module.exports=mongoose.model("product", products);
