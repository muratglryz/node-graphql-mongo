const graphql = require('graphql'); 
const basket_model = require('./basket_models');
const customers_model = require('./customers_models');
const following_model = require('./following_models');
const product_model = require('./products_models');
const selling_model = require('./selling_models');
const sell_product_model = require('./sell_product_models')
const category_model=require('./category_models');

const{ GraphQLObjectType,
        GraphQLID,
        GraphQLString,
        GraphQLSchema,
        GraphQLInt, GraphQLList, GraphQLFloat } = graphql;

const category=new GraphQLObjectType({
    name: 'category_model',
    fields:()=>({
        _id: { type: GraphQLID },
        categoryname: { type: GraphQLString },
        category_topid: { type: GraphQLString },
        keys: { type: GraphQLString },
        categorylevel: { type: GraphQLInt },
        category_product:{
            type: new GraphQLList(product),
            resolve(parent,args){
                return product_model.find({category_id:parent._id})
            }
        }
    }),
})
const product = new GraphQLObjectType({
    name: "product_model",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        desc: { type: GraphQLString },
        SKU: { type: GraphQLInt },
        price: { type: GraphQLString },
        image: { type: GraphQLString },
        category_id: { type: GraphQLString },
        status: { type: GraphQLInt },
        category_name: {
            type:new GraphQLList(category),
            resolve(parent, args) {
                return category_model.find({ _id: parent.category_id })

            }
        }
    })
});

const customer = new GraphQLObjectType({
    name: "customers_model",
    fields: () => ({
        _id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        address: { type: GraphQLString },
        telephone: { type: GraphQLString },
        mail: { type: GraphQLString },
    })
});
const basket = new GraphQLObjectType({
    name: "basket_models",
    fields: () => ({
        _id: { type: GraphQLID },
        user_id: { type: GraphQLString },
        product_id: { type: GraphQLString },
        piece: { type: GraphQLInt },
    })
});
const following = new GraphQLObjectType({
    name: "following_model",
    fields: () => ({
        _id: { type: GraphQLID },
        user_id: { type: GraphQLString },
        product_id: { type: GraphQLString },
    })
});
const selling = new GraphQLObjectType({
    name: "selling_model",
    fields: () => ({
        _id: { type: GraphQLID },
        user_id: { type: GraphQLString },
        address: { type: GraphQLString },
        telephone: { type: GraphQLString },
        mail: { type: GraphQLString },
        payment_type: { type: GraphQLString },
        total_price: { type: GraphQLString },
    })
});
const sell_product = new GraphQLObjectType({
    name: "sell_product_model",
    fields: () => ({
        _id: { type: GraphQLID },
        sell_id: { type: GraphQLString },
        product_id: { type: GraphQLString },
        piece: { type: GraphQLInt },
        total_price: { type: GraphQLString },
    })
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addcategoryM:{
            type: category,
            args:{
                categoryname: { type: GraphQLString },
                category_topid: { type: GraphQLString },
                keys: { type: GraphQLString },
                categorylevel: { type: GraphQLInt },
            },
            resolve(parent,args){
                let newcategory = new category_model({
                    categoryname: args.categoryname,
                    category_topid: args.category_topid,
                    keys: args.keys,
                    categorylevel: args.categorylevel,
                });
                return newcategory.save();
            }
        },
        updatecategoryM:{
            type: category,
            args:{
                _id: { type: GraphQLID },
                categoryname: { type: GraphQLString },
                category_topid: { type: GraphQLString },
                keys: { type: GraphQLString },
                categorylevel: { type: GraphQLInt },
            },
            resolve(parent,args){
                let newvalues = {
                    $set: {
                        categoryname:args.categoryname,
                        category_topid:args.category_topid,
                        keys:args.keys,
                        categorylevel:args.categorylevel
                    }
                }
                let update = category_model.findByIdAndUpdate({_id:args._id},newvalues,{returnOriginal: false});

                return update;
            }
        },
        removecategoryM:{
            type: category,
            args:{
                _id: { type: GraphQLID },

            },
            resolve(parent,args){
                let deleted = category_model.findByIdAndDelete(args._id,{returnOriginal: true});
                return deleted;
            }
        },
        addproductsM: {
            type: product,
            args: {
                name: { type: GraphQLString },
                desc: { type: GraphQLString },
                SKU: { type: GraphQLInt },
                price: { type: GraphQLString },
                image: { type: GraphQLString },
                category_id: { type: GraphQLString },
                status: { type: GraphQLInt },
            },

            resolve(parent, args) {
                let newProduct=new product_model({
                name: args.name,
                desc: args.desc,
                SKU: args.SKU,
                price: args.price,
                image: args.image,
                category_id: args.category_id,
                status: args.status,
            });

            return newProduct.save();
            }
        },
        updateproductsM:{
            type: product,
            args:{
                _id: { type: GraphQLID },
                name: { type: GraphQLString },
                desc: { type: GraphQLString },
                SKU: { type: GraphQLInt },
                price: { type: GraphQLString },
                image: { type: GraphQLString },
                category_id: { type: GraphQLString },
                status: { type: GraphQLInt },
            },
            resolve(parent,args){
                let newvalues = {
                    $set: {
                        name:args.name,
                        desc:args.desc,
                        SKU:args.SKU,
                        price:args.price,
                        image:args.image,
                        category_id:args.category_id,
                        status:args.status,
                    }
                }
                let update = product_model.findByIdAndUpdate({_id:args._id},newvalues,{returnOriginal: false});

                return update;
            }
        },
        addcustomersM: {
            type: customer,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                address: { type: GraphQLString },
                telephone: { type: GraphQLString },
                mail: { type: GraphQLString },
            },

            resolve(parent, args) {
                let newCustomer=new customers_model({
                username: args.username,
                password: args.password,
                first_name: args.first_name,
                last_name: args.last_name,
                address: args.address,
                telephone: args.telephone,
                mail: args.mail,
            });

            return newCustomer.save();
            }
        },
        updatecustomersM:{
            type: customer,
            args:{
                _id: { type: GraphQLID },
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                address: { type: GraphQLString },
                telephone: { type: GraphQLString },
                mail: { type: GraphQLString },
            },
            resolve(parent,args){
                let newvalues = {
                    $set: {
                        username:args.username,
                        password:args.password,
                        first_name:args.first_name,
                        last_name:args.last_name,
                        address:args.address,
                        telephone:args.telephone,
                        mail:args.mail,
                    }
                }
                let update = customers_model.findByIdAndUpdate({_id:args._id},newvalues,{returnOriginal: false});

                return update;
            }
        },
        addbasketM:{
            type: basket,
            args:{
                user_id:{type:GraphQLString},
                product_id : { type: GraphQLString },
                piece: { type: GraphQLInt },
            },
            resolve(parent,args){
                let newBasket = new basket_model({
                    user_id: args.user_id,
                    product_id: args.product_id,
                    piece: args.piece,
                });
                return newBasket.save();
            }
        },
        updatebasketM:{
            type: basket,
            args:{
                _id: { type: GraphQLID },
                user_id:{type:GraphQLString},
                product_id : { type: GraphQLString },
                piece: { type: GraphQLInt },
            },
            resolve(parent,args){
                let newvalues = {
                    $set: {
                        piece:args.piece
                    }
                }
                let update = basket_model.findByIdAndUpdate({_id:args._id},newvalues,{returnOriginal: false});

                return update;
            }
        },
        removebasketM:{
            type: basket,
            args:{
                _id: { type: GraphQLID },
            },
            resolve(parent,args){
                let deleted = basket_model.findByIdAndDelete(args._id,{returnOriginal: true});
                return deleted;
            }
        },
        addfollowingM:{
            type: following,
            args:{
                user_id:{type:GraphQLString},
                product_id : { type: GraphQLString },
            },
            resolve(parent,args){
                let newfollow = new following_model({
                    user_id: args.user_id,
                    product_id: args.product_id,
                });
                return newfollow.save();
            }
        },
        removefollowingM:{
            type: following,
            args:{
                _id: { type: GraphQLID },
            },
            resolve(parent,args){
                let deleted = following_model.findByIdAndDelete(args._id,{returnOriginal: true});
                return deleted;
            }
        },
        addsellingM:{
            type: selling,
            args:{
                user_id: { type: GraphQLString },
                address: { type: GraphQLString },
                telephone: { type: GraphQLString },
                mail: { type: GraphQLString },
                payment_type: { type: GraphQLString },
                total_price: { type: GraphQLString },
            },
            resolve(parent,args){
                let newselling = new selling_model({
                    user_id: args.user_id,
                    address: args.address,
                    telephone: args.telephone,
                    mail: args.mail,
                    payment_type: args.payment_type,
                    total_price: args.total_price,
                });
                return newselling.save();
            }
        },
        addsell_productM:{
            type: sell_product,
            args:{
                sell_id:{type:GraphQLString},
                product_id : { type: GraphQLString },
                piece: { type: GraphQLInt },
                total_price: { type: GraphQLString },
            },
            resolve(parent,args){
                let newsell_product = new sell_product_model({
                    sell_id: args.sell_id,
                    product_id: args.product_id,
                    piece: args.piece,
                    total_price: args.total_price,
                });
                return newsell_product.save();
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        productsQ: {
            type:new GraphQLList(product),
            resolve(parent, args) {
            return product_model.find({ status: 1 });  
            }
        
        }
    }
});

module.exports =new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})