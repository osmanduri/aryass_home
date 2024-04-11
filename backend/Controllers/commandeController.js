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

module.exports.getCommandByUser = async (req, res) => {
    const { payeOuNonPaye } = req.body;  // Récupération des statuts de paiement à filtrer
    console.log("Statuts de paiement à filtrer:", payeOuNonPaye);

    try {
        let query = { user_id: req.params.user_id };
        // Assurez-vous que payeOuNonPaye est non vide avant d'ajouter au query
        if (payeOuNonPaye && payeOuNonPaye.length > 0) {
            query.status_paiement = { $in: payeOuNonPaye };
        }
        
        const commandes = await commandeModel.find(query).sort({ createdAt: -1 });

        if (commandes.length > 0) {
            return res.status(200).send(commandes);
        } else {
            return res.status(404).json({ message: "Aucune commande trouvée." });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
};