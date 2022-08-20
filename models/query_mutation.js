const graphql = require('graphql'); 
const basket_model = require('./basket_models');
const customers_model = require('./customers_models');
const following_model = require('./following_models');
const product_model = require('./products_models');
const selling_model = require('./selling_models');
const sell_product_model = require('./sell_product_models')

const{ GraphQLObjectType,
        GraphQLID,
        GraphQLString,
        GraphQLSchema,
        GraphQLInt, GraphQLList, GraphQLFloat } = graphql;

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
        productsM: {
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
        customersM: {
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
        basketM:{
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
        followingM:{
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
        sellingM:{
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
        sell_productM:{
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

