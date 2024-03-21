const mongoose = require('mongoose')
const moment = require('moment');
moment.locale('fr');
const path = require('path')

//const chemin_img = path.join(__dirname, "../Profil")
const userSchema = new mongoose.Schema({

    nom: {
        type: String,
        minLength: 2,
        maxLength: 55,
        unique: true,
        trimp: true,
        index: true
    },
    prenom: {
        type: String,
        minLength: 2,
        maxLength: 55,
        unique: true,
        trimp: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
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
    panier:{
        type:[Object]
    },
    commande:{
        type:[Object]
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