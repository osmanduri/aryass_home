const commandeModel = require('../Model/commandeModel')


module.exports.getAllCommand = async (req, res) => {
    res.send('all commandes !')
}

module.exports.new = async (req, res) => {

    try{
        const newCommande = new commandeModel({
            user_id:req.body.user_id,
            panier:req.body.panier,
            payment_method:req.body.payment_method,
            prixTotal:req.body.prixTotal,
            email:req.body.email,
            entreprise:req.body.entreprise,
            adresse: req.body.adresse,
            ville: req.body.ville,
            pays: req.body.pays,
            codePostal:req.body.codePostal,
            telephone:req.body.telephone
    
        })
    
        const savedCommande = await newCommande.save()

        return res.status(200).send(savedCommande)
    }catch(err){
        return res.status(400).send(err)
    }

}