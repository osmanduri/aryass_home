const mongoose = require('mongoose')
const moment = require('moment');
moment.locale('fr');



const commandeSchema = new mongoose.Schema({

    user_id: {
        type: String
    },
    nomComplet:{
        type: String
    },
    articles:{
        type:[Object]
    },
    payment_method:{
        type:[String]
    },
    prixTotal:{
        type:Number
    },
    email: {
        type: String
    },
    entreprise:{
        type:String,
        trim:true
    },
    adresse:{
        type:String,
        trim:true
    },
    ville:{
        type:String,
        trim:true
    },
    pays:{
        type:String,
        trim:true
    },
    codePostal:{
        type:String,
        trim:true
    },
    telephone:{
        type:String,
        trim:true
    },
    status_paiement:{
        type:String,
        default:"unpaid"
    },
    session_id:{
        type:String
    },
    monnaie:{
        type:String
    },
    customer:{
        type:String
    },
    payment_intent:{
        type:String
    },
    status:{
        type:String
    },
    procedure_paiement:{
        type:String
    },
    date_creation_commande: {
        type: String,
        default: moment().format('LL') //default: moment().format('LLL')
    },
    }, {
        timestamps: true
    }

)



module.exports = mongoose.model('commandes', commandeSchema);