const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./models/query_mutation");
const mongoose = require("mongoose");
const app = express();


app.use("/graphql",graphqlHTTP({
    schema: schema,
    graphiql:true
}));

mongoose.connect("mongodb://localhost/shopping").then((res)=>{
    app.listen(8080,()=>{
        console.log("mongodb listening");
        console.log("listening on port 8080");
    });
})