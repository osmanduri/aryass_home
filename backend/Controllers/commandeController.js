const commandeModel = require('../Model/commandeModel')


module.exports.getAllCommand = async (req, res) => {
    res.send('all commandes !')
}

module.exports.new = async (req, res) => {
    console.log(req.body)

    try{
        const newCommande = new commandeModel({
            user_id:req.body.user_id,
            nomComplet:req.body.nomComplet,
            email:req.body.email,
            panier:req.body.panier,
            payment_method:req.body.payment_method,
            prixTotal:req.body.prixTotal,
            entreprise:req.body.entreprise,
            adresse: req.body.adresse,
            ville: req.body.ville,
            pays: req.body.pays,
            codePostal:req.body.codePostal,
            telephone:req.body.telephone,
            monnaie:req.body.monnaire,
            status:req.body.status,
            procedure_paiement:req.body.procedure_paiement,
            status_paiement:req.body.status_paiement
    
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
        
        // Construire une condition qui exclut les commandes PayPal non payées
        let paymentConditions = [];
        if (payeOuNonPaye && payeOuNonPaye.length > 0) {
            paymentConditions.push({ status_paiement: { $in: payeOuNonPaye } });
        }
        // Ajouter la condition pour exclure les commandes PayPal non payées
        paymentConditions.push({
            $or: [
                { procedure_paiement: { $ne: 'paypal' } },
                { procedure_paiement: 'paypal', status_paiement: { $ne: 'unpaid' } }
            ]
        });

        query.$and = paymentConditions;

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