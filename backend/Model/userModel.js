const mongoose = require('mongoose')
const moment = require('moment');
moment.locale('fr');

const userSchema = new mongoose.Schema({

    nom: {
        type: String,
        minLength: 2,
        maxLength: 55,
        trimp: true,
    },
    prenom: {
        type: String,
        minLength: 2,
        maxLength: 55,
        trimp: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
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
    aPropos:{
        type:String,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        minLength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    date_creation_user: {
        type: String,
        default: moment().format('LLL')
    },
    profil_img:{
        type:String,
        default:null
    }

    }, {
        timestamps: true
    }

)

module.exports = mongoose.model('users', userSchema);