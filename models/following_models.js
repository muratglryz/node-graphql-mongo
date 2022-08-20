
const mongoose=require("mongoose");

const schema = mongoose.Schema;


const following = new schema({
    user_id:String,
    product_id:String,
},
{
    collection: 'following'
});



module.exports=mongoose.model("following", following);