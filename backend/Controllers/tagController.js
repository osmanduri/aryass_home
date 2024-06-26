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

        const newTags = new tagModel({
            tagId: uuidv4(),
            categorie: req.body.categorie,
            type:req.body.type,
            augmentation: req.body.augmentation,
            valeur: req.body.valeur,
            label:req.body.label,
            information:req.body.information
        })
    
        const savedTag = await newTags.save()
    
        res.status(200).send(savedTag)
    }catch(err){
        res.status(400).send(err)
    }

}