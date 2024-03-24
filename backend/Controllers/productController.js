const productModel = require('../Model/productModel')
const ObjectID = require('mongoose').Types.ObjectId
const moment = require('moment')
moment.locale('fr')

module.exports.getAllProduct = async (req, res) => {
    try{
        const products = await productModel.find()

        res.send(products)
    }catch(err){
        res.send(err)
    }
}


module.exports.getProductById = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('Produit inconnu ' + req.params.id)
    console.log(req.params.id, req.params.choix_categorie)
    try{
        const product = await productModel.findById(req.params.id)

        res.send(product)
    }catch(err){
        res.status(400).send(err)
    }
}


module.exports.updateProduct = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Produit inconnu ' + req.params.id)
    try {
        const updateProduct = await productModel.findByIdAndUpdate(
            req.params.id, {
                $set: req.body
            }, { new: true },
        );
        return res.status(200).send(updateProduct)
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.deleteProductById = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send('Utilisateur inconnu ' + req.params.id)
    }
    

    try{
        const productToDelete = await productModel.findByIdAndRemove(req.params.id)

        res.send(productToDelete)

    }catch(err){
        res.status(400).send(err)
    }
}


module.exports.addProduct = async (req, res) => {
    try{
        const newProduct = new productModel({
            nomProduit: req.body.nomProduit,
            categorie:req.body.categorie,
            prix: req.body.prix,
            img: req.body.img
        })

        const savedProduct = await newProduct.save()

        res.status(200).send(savedProduct);
    }catch(err){
        res.status(400).send(err)
    }
}
