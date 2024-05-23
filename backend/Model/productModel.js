const mongoose = require('mongoose')
const moment = require('moment');
moment.locale('fr');
const path = require('path')

const tagSchema = new mongoose.Schema({
    type: String,
    augmentation: Number,
    tagId: String,
    valeur:String
  });

//const chemin_img = path.join(__dirname, "../Profil")
const productSchema = new mongoose.Schema({

    nomProduit: {
        type: String,
        trimp: true,
    },
    categorie: {
        type: String,
        trimp: true,
    },
    prix: {
        type: Number,
        required: true,
    },
    prix_barre:{
        type:Number,
        required:false,
    },
    description:{
        type:String,
    },
    caracteristique:{
        type:String,
    },
    fiche_technique:{
        type:[String],
    },
    img:{
        type:[String],
        default:null
    },
    dispo:{
        type:String
    },
    promo:{
        type:Boolean
    },
    tags:{
        type:[String]
    },
    date_creation_product: {
        type: String,
        default: moment().format('LLL')
    },
    vente:{
        type:Number,
        default:0
    },
    }, {
        timestamps: true
    }

)

module.exports = mongoose.model('product', productSchema);