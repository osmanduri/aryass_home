const productModel = require('../Model/productModel')
const ObjectID = require('mongoose').Types.ObjectId
const moment = require('moment')
moment.locale('fr')

module.exports.getAllProduct = async (req, res) => {
  console.log(req.body.recherche)
  try{
      const productsWithTag = await productModel.find();

      res.send(productsWithTag)
  }catch(err){
      res.send(err)
  }
}

module.exports.getAllProductRecherche = async (req, res) => {
    console.log(req.body.recherche)
    try{
        const productsWithTag = await this.getAllProductWithTag(req.body.recherche);

        if(productsWithTag.length > 0){
          res.status(200).send(productsWithTag)
        }else{
          res.status(404).send('Aucun produit trouvé')
        }
        
    }catch(err){
        res.send(err)
    }
}

module.exports.getProductByCategorieWithTags = async (req, res) => {
   const {dispo, priceMin, priceMax, sortBy} = req.body

    try{
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

module.exports.getAllProductWithTag = async (recherche) => { // Recherche pas nom
  console.log('this one ?')
  
  let query = [
    { 
      $match: {
      nomProduit: {
        $regex: RegExp(recherche, 'i')
      }
    } },
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

module.exports.getWithTag = async (choix_categorie, dispo, priceMin, priceMax, sortBy) => {
  console.log('this one ?')

  let matchCondition = { 
    'categorie': choix_categorie
  };

  const userSortChoice = sortBy; // exemple de choix utilisateur

  // Définition de l'objet sortCondition basé sur les choix de l'utilisateur
  let sortCondition = { nomProduit: 1};
  const sortOptions = {
    "En vedette": {"vedette": 1}, // Si aucune condition spéciale n'est requise pour "En vedette"
    "Meilleures ventes": { "ventes": -1 }, // Suppose qu'il existe un champ "ventes"
    "Alphabétique, de A à Z": { "nomProduit": 1 },
    "Alphabétique, de Z à A": { "nomProduit": -1 },
    "Prix: faible à élevé": { "prix": 1 },
    "Prix: élevé à faible": { "prix": -1 },
    "Date, de la plus ancienne à la plus récente": { "createdAt": 1 }, // Suppose qu'il existe un champ "dateCreation"
    "Date, de la plus récente à la plus ancienne": { "createdAt": -1 },
  };
  
  // Affecter la condition de tri basée sur le choix de l'utilisateur
  sortCondition = sortOptions[userSortChoice] || sortCondition; 
  
  // Vérifier si le tableau dispo contient des éléments
  if (dispo.length > 0) {
    // Si oui, ajouter la condition de filtrage sur dispo
    matchCondition.dispo = { $in: dispo };
  }
  
  // Ajoutez ici la logique de gestion de priceMin et priceMax si nécessaire
  if (priceMin !== null || priceMax !== null) {
      matchCondition.prix = {};
      if (priceMin !== null) {
          matchCondition.prix.$gte = priceMin;
      }
      if (priceMax !== null) {
          matchCondition.prix.$lte = priceMax;
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
          'promo': { '$first': '$promo' },
          'object_fit': { '$first': '$object_fit'}
        }
      },
      {
        '$sort': sortCondition
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


module.exports.getProductDetails = async (req, res) => {
  const categorie = req.params.choix_categorie; // Assurez-vous que cette variable correspond à votre route et paramètres
  let query = [
    {
      $match: {
        categorie: categorie // Filtrer par catégorie avant d'entrer dans $facet
      }
    },
    {
      $facet: {
        "maxPrice": [
          { $group: { _id: null, maxPrice: { $max: "$prix" } } }
        ],
        "totalEnStock": [
          { $match: { dispo: "En stock" } },
          { $count: "totalEnStock" }
        ],
        "totalRuptureDeStock": [
          { $match: { dispo: "Rupture de stock" } },
          { $count: "totalRuptureDeStock" }
        ]
      }
    },
    {
      $project: {
        maxPrice: { $arrayElemAt: ["$maxPrice.maxPrice", 0] },
        totalEnStock: { $arrayElemAt: ["$totalEnStock.totalEnStock", 0] },
        totalRuptureDeStock: { $arrayElemAt: ["$totalRuptureDeStock.totalRuptureDeStock", 0] }
      }
    }
  ];

  const getDetailsProduct = await productModel.aggregate(query);
  res.send(getDetailsProduct[0]);
}
