var mongoose = require("mongoose");
var category = new mongoose.Schema(
  {
    categoryname: {
      type: String,
    },
    category_topid: {
      type: String,
    },
    keys: {
      type: String,
    },
    categorylevel: {
      type: Number,
    },
  },
  {
    collection: "category",
  }
);
module.exports=mongoose.model("category", category);