const userModel = require('../Model/userModel')
const ObjectID = require('mongoose').Types.ObjectId


module.exports.addBasket = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Utilisateur inconnu ' + req.params.id);
    }

    try {
        const user = await userModel.findById(req.params.id);
        let panierExists = user.panier.some(element => element.id === req.body.id);

        if (!panierExists) {
            // Ajoute l'article au panier si non trouvé
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
                $push: {
                    panier: req.body
                }
            }, { new: true, upsert: true });

            res.status(200).send(updatedUser);
        } else {
            // Met à jour la quantité si l'article existe déjà dans le panier
            const index = user.panier.findIndex((element) => element.id === req.body.id);
            if (user.panier[index].quantite < 5) {
                user.panier[index].quantite += req.body.quantite;
                if (user.panier[index].quantite > 5) {
                    user.panier[index].quantite = 5;
                }

                // Mise à jour de l'utilisateur avec les nouvelles informations du panier
                const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
                    $set: { panier: user.panier }
                }, { new: true, upsert: true });

                res.status(200).send(updatedUser);
            } else {
                // La quantité n'a pas besoin d'être mise à jour, renvoie l'utilisateur tel quel
                res.status(200).send(user);
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.increaseBasket = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Utilisateur inconnu ' + req.params.id);
    }

    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).send('Utilisateur non trouvé.');
        }

        const index = user.panier.findIndex((element) => element.id === req.body.product_id);

        if (index !== -1 && user.panier[index].quantite < 5) {
            user.panier[index].quantite += 1;

            const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
                $set: { panier: user.panier }
            }, { new: true, upsert: true });

            res.status(200).send(updatedUser);
        } else {
            // L'article n'existe pas dans le panier ou la quantité est déjà à 5
            res.status(400).send({ message: 'L\'article ne peut pas être augmenté.' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.decreaseBasket = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Utilisateur inconnu ' + req.params.id);
    }

    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).send('Utilisateur non trouvé.');
        }

        const index = user.panier.findIndex((element) => element.id === req.body.product_id);

        if (index === -1) {
            return res.status(404).send('Article non trouvé dans le panier.');
        }

        // Réduire la quantité si supérieure à 1
        if (user.panier[index].quantite > 1) {
            user.panier[index].quantite -= 1;
        } else {
            // Retirer l'article du panier si la quantité est à 1
            user.panier.splice(index, 1);
        }

        // Mettre à jour l'utilisateur avec le nouveau panier
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
            $set: { panier: user.panier }
        }, { new: true, upsert: true });

        res.status(200).send(updatedUser);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.removeBasket = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Utilisateur inconnu ' + req.params.id);
    }

    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        // Vérifie si le produit existe dans le panier
        const productExists = user.panier.some(value => value.id === req.body.product_id);
        if (!productExists) {
            return res.status(404).send('Produit non trouvé dans le panier');
        }

        // Filtrer le panier pour enlever l'item spécifié
        const panierFiltre = user.panier.filter(value => value.id !== req.body.product_id);

        // Met à jour l'utilisateur avec le nouveau panier filtré
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
            $set: {panier: panierFiltre}
        }, { new: true, upsert: true }).exec();

        res.status(200).send(updatedUser);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.viderPanier = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID utilisateur invalide ' + req.params.id);
    }

    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        // Vider le panier de l'utilisateur
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
            $set: {panier: []}
        }, { new: true, upsert: true }).exec();

        res.status(200).send(updatedUser);
    } catch (err) {
        res.status(500).send(err);
    }
};