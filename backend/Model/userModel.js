const mongoose = require('mongoose')
const moment = require('moment');
moment.locale('fr');

const userSchema = new mongoose.Schema({

    nom: {
        type: String,
        default:"",
        trimp: true,
    },
    prenom: {
        type: String,
        default:"",
        trimp: true,
    },
    email: {
        type: String,
        trim: true,
    },
    entreprise:{
        type:String,
        trim:true,
        default:""
    },
    adresse:{
        type:String,
        trim:true,
        default:""
    },
    ville:{
        type:String,
        trim:true,
        default:""
    },
    pays:{
        type:String,
        trim:true,
        default:""
    },
    codePostal:{
        type:String,
        trim:true,
        default:""
    },
    telephone:{
        type:String,
        trim:true,
        default:""
    },
    dateNaissance:{
        type:String,
        trim:true,
        default:""
    },
    civilite:{
        type:String,
        trim:true,
        default:""
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