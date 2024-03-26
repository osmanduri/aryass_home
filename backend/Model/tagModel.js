const mongoose = require('mongoose')
const moment = require('moment');
moment.locale('fr');
const path = require('path')

const tagSchema = new mongoose.Schema({
    tagId:String,
    categorie:String,
    type: String,
    augmentation: Number,
    valeur:String
  });

module.exports = mongoose.model('tag', tagSchema);