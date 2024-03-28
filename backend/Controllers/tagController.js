const tagModel = require('../Model/tagModel')
const ObjectID = require('mongoose').Types.ObjectId
const moment = require('moment')
moment.locale('fr')
const { v4: uuidv4 } = require('uuid');


module.exports.getAllTags = (req, res) => {

    res.send('tags sent !')
}

module.exports.addTag = async (req, res) => {
    
    try{
        let tagsId = uuidv4();
        const newTags = new tagModel({
            tagId: tagsId,
            categorie: req.body.categorie,
            type:req.body.type,
            augmentation: req.body.augmentation,
            valeur: req.body.valeur,
            label:req.body.label
        })
    
        const savedTag = await newTags.save()
    
        res.status(200).send(savedTag)
    }catch(err){
        res.status(400).send(err)
    }

}