
const graphql = require("graphql");

const yemeklistesiModel = require("../models/productlist");

const seceneklistesiModel = require("../models/options");

const yemekseceneklistesiModel = require("../models/product_option");

const
    { GraphQLObjectType,
        GraphQLID,
        GraphQLString,
        GraphQLSchema,
        GraphQLInt, GraphQLList, GraphQLFloat } = graphql;





const
    YemekListesiTip =
        new
            GraphQLObjectType({

                name: "yemeklistesiModel",

                fields: () => ({

                    _id: { type: GraphQLID },

                    yemekadi: { type: GraphQLString },

                    fiyat: { type: GraphQLFloat },

                    adet: { type: GraphQLFloat },

                    durum: { type: GraphQLInt },

                    image: { type: GraphQLString },

                    secenekler: {

                        type:
                            new
                                GraphQLList(yemek_secenekTip),

                        resolve(parent, args) {

                            return
                            yemekseceneklistesiModel.find({ yemekid: parent._id })

                        }

                    }

                })

            });



const
    SeceneklerTip =
        new
            GraphQLObjectType({

                name: "seceneklistesiModel",

                fields: () => ({

                    _id: { type: GraphQLID },

                    secenekadi: { type: GraphQLString },

                    fiyat: { type: GraphQLFloat },

                    durum: { type: GraphQLInt },

                    yemekler: {

                        type:
                            new
                                GraphQLList(yemek_secenekTip),

                        resolve(parent, args) {

                            return
                            yemekseceneklistesiModel.find({ secenekid: parent._id })

                        }

                    }

                })

            });



const
    yemek_secenekTip =
        new
            GraphQLObjectType({

                name: "yemekseceneklistesiModel",

                fields: () => ({

                    _id: { type: GraphQLID },

                    yemekid: { type: GraphQLID },

                    secenekid: { type: GraphQLID },

                    secenekbilgisi: {

                        type:
                            new
                                GraphQLList(SeceneklerTip),

                        resolve(parent, args) {

                            return
                            seceneklistesiModel.find({
                                _id: parent.secenekid,
                                durum: 1
                            })

                        }

                    },

                    yemekbilgisi: {

                        type:
                            new
                                GraphQLList(YemekListesiTip),

                        resolve(parent, args) {

                            return
                            yemeklistesiModel.find({
                                _id: parent.yemekid,
                                durum: 1
                            })

                        }

                    }

                })

            });

const RootQuery = new GraphQLObjectType({

                name: "Root",

                fields: {

                    yemekGetir: {

                        type:
                            new
                                GraphQLList(YemekListesiTip),

                        args: { _id: { type: GraphQLID } },

                        resolve(parent, args) {

                            return
                            yemeklistesiModel.find({ _id: args._id })

                        }

                    },

                    yemekler: {

                        type:
                            new
                                GraphQLList(YemekListesiTip),

                        resolve(parent, args) {

                            return
                            yemeklistesiModel.find({ durum: 1 });

                        }

                    },

                    secenekler: {

                        type:
                            new
                                GraphQLList(SeceneklerTip),

                        resolve(parent, args) {

                            return
                            seceneklistesiModel.find({ durum: 1 });

                        }

                    },

                    yemek_secenek: {

                        type:
                            new
                                GraphQLList(yemek_secenekTip),

                        resolve(parent, args) {

                            return
                            yemekseceneklistesiModel.find();

                        }

                    },

                }

            });



const
    Mutation =
        new GraphQLObjectType({

            name: "Mutation",

            fields: {

                yemekEkle: {

                    type: YemekListesiTip,

                    args: {

                        yemekadi: { type: GraphQLString },

                        fiyat: { type: GraphQLFloat },

                        adet: { type: GraphQLFloat },

                        durum: { type: GraphQLInt },

                        image: { type: GraphQLString },

                    },

                    resolve(parent, args) {

                        let
                            yeniYemek =
                                new
                                    yemeklistesiModel({

                                        yemekadi: args.yemekadi,

                                        fiyat: args.fiyat,

                                        adet: args.adet,

                                        durum: args.durum,

                                        image: args.image,

                                    });

                        return
                        yeniYemek.save();

                    }

                },

                secenekEkle: {

                    type: SeceneklerTip,

                    args: {

                        secenekadi: { type: GraphQLString },

                        fiyat: { type: GraphQLFloat },

                        durum: { type: GraphQLInt },

                    },

                    resolve(parent, args) {

                        let
                            yeniSecenek =
                                new
                                    seceneklistesiModel({

                                        secenekadi: args.secenekadi,

                                        fiyat: args.fiyat,

                                        durum: args.durum,

                                    });

                        return
                        yeniSecenek.save();

                    }

                },

                yemeksecenekEkle: {

                    type: yemek_secenekTip,

                    args: {

                        yemekid: { type: GraphQLString },

                        secenekid: { type: GraphQLString },

                    },

                    resolve(parent, args) {

                        let
                            yeniYemekSecenek =
                                new
                                    yemekseceneklistesiModel({

                                        yemekid: args.yemekid,

                                        secenekid: args.secenekid,

                                    });

                        return
                        yeniYemekSecenek.save();

                    }

                }

            }

        })

module.exports =
    new
        GraphQLSchema({

            query: RootQuery,

            mutation: Mutation,

        })

