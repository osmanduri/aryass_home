const productModel = require('../Model/productModel')
const ObjectID = require('mongoose').Types.ObjectId
const moment = require('moment')
moment.locale('fr')

module.exports.getAllProduct = async (req, res) => {
    try{
        const productsWithTag = await this.getWithTag();

        res.send(productsWithTag)
    }catch(err){
        res.send(err)
    }
}

module.exports.getProductByCategorieWithTags = async (req, res) => {
  console.log(req.body)

  const {dispo, priceMin, priceMax, sortBy} = req.body

  console.log(dispo)
    try{
        console.log(req.params.choix_categorie)
        const productsByCategorieWithTag = await this.getWithTag(req.params.choix_categorie, dispo, priceMin, priceMax, sortBy);

        res.send(productsByCategorieWithTag)
    }catch(err){
        res.send(err)
    }
}


module.exports.getProductById = async (req, res) => {
    // Vérifie si l'ID du produit est valide
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send({ message: `Produit inconnu avec l'ID ${req.params.id}` });
    }

    try {
        // Récupération du produit par son ID avec les tags associés
        const productWithTagById = await this.getWithTagById(req.params.choix_categorie, req.params.id);
        
        // Si aucun produit n'est trouvé, renvoie une erreur 404
        if (productWithTagById.length === 0) {
            return res.status(404).send({ message: `Aucun produit trouvé avec l'ID ${req.params.id}` });
        }

        // Envoie le produit trouvé au client
        res.send(productWithTagById[0]);
    } catch (err) {
        // Gestion des erreurs potentielles lors de l'appel de la base de données
        res.status(500).send({ message: 'Erreur lors de la récupération du produit', error: err.message });
    }
};



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
            img: req.body.img,
            tags:req.body.tags,
            description:req.body.description,
            dispo:req.body.dispo,
            promo:req.body.promo
        })

        const savedProduct = await newProduct.save()

        res.status(200).send(savedProduct);
    }catch(err){
        res.status(400).send(err)
    }
}

module.exports.getWithTag = async (choix_categorie, dispo, priceMin1, priceMax1, sortBy) => {
    let matchCondition = { 'categorie': choix_categorie };
    const priceMin = null;
    const priceMax = null;
    // Ajoutez la condition de prix seulement si priceMin et priceMax ne sont pas null
    if (priceMin !== null || priceMax !== null) {
        matchCondition.prix = {}; // Initialisez l'objet pour les conditions de prix
        if (priceMin !== null) {
            matchCondition.prix.$gte = priceMin; // Ajoutez la condition plus grand ou égal
        }
        if (priceMax !== null) {
            matchCondition.prix.$lte = priceMax; // Ajoutez la condition moins grand ou égal
        }
    }

    let query = [
      { '$match': matchCondition },
      { 
        '$lookup': { // Joindre avec la collection de tags avant de déconstruire pour garder tous les produits
          'from': 'tags',
          'localField': 'tags',
          'foreignField': 'tagId',
          'as': 'tag_details'
        }
      },
      {
        '$unwind': { // Optionnel si vous voulez déconstruire le résultat du lookup
          'path': '$tag_details',
          'preserveNullAndEmptyArrays': true
        }
      },
      { 
        '$group': { // Regrouper à nouveau si `$unwind` est utilisé
          '_id': '$_id',
          'nomProduit': { '$first': '$nomProduit' },
          'categorie': { '$first': '$categorie' },
          'prix': { '$first': '$prix' },
          'img': { '$first': '$img' },
          'description': { '$first': '$description' },
          'tags': { '$push': '$tag_details' },
          'dispo': { '$first': '$dispo' },
          'promo': { '$first': '$promo' }
        }
      },
      {
        '$sort': { // Trier par nomProduit et ensuite par tags.augmentation si nécessaire
          'nomProduit': 1,
          'prix': 1
        }
      }
    ];
    
    

      const getTags = await productModel.aggregate(query)

      return getTags   
}

module.exports.getWithTagById = async (choix_categorie, id) => {
    let query = [
        {
          '$match': {
            'categorie': choix_categorie, 
            '_id': new ObjectID(id)
          }
        },
        {
          '$lookup': {
            'from': 'tags', 
            'localField': 'tags', 
            'foreignField': 'tagId', 
            'as': 'tag_result'
          }
        },
        {
          '$unwind': {
            'path': '$tag_result', 
            'preserveNullAndEmptyArrays': true
          }
        },
        {
          '$sort': {
            'tag_result.augmentation': 1
          }
        },
        {
          '$group': {
            '_id': '$_id', 
            'nomProduit': { '$first': '$nomProduit' },
            'categorie': { '$first': '$categorie' },
            'prix': { '$first': '$prix' },
            'img': { '$first': '$img' },
            'description': { '$first': '$description' },
            'tags': { '$push': '$tag_result' }
          }
        },
        {
          '$addFields': {
            'tags': {
              '$filter': {
                'input': '$tags',
                'as': 'tag',
                'cond': { '$ne': ['$$tag', null] }
              }
            }
          }
        }
      ];

      const getTags = await productModel.aggregate(query)

      return getTags   
}
