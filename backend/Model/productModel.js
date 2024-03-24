const mongoose = require('mongoose')
const moment = require('moment');
moment.locale('fr');
const path = require('path')

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
    description:{
        type:String,
    },
    img:{
        type:[String],
        default:null
    },
    dispo:{
        type:Boolean
    },
    promo:{
        type:Boolean
    },
    date_creation_product: {
        type: String,
        default: moment().format('LLL')
    },

    }, {
        timestamps: true
    }

)

module.exports = mongoose.model('product', productSchema);