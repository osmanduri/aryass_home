const userModel = require('../Model/userModel')
const ObjectID = require('mongoose').Types.ObjectId
const moment = require('moment')
moment.locale('fr')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.verifyConnected = async (req, res) => {
    res.send('connected!')
}

module.exports.verifyIsUserOrAdmin = (req, res) => {
    if(req.user.isAdmin === true){
        return res.send("isAdmin")
    }else if(req.user.isAdmin === false){
        return res.send("isNotAdmin")
    }else{
        return res.send("unknown")
    }
}

module.exports.getAllUsers = async (req, res) => {
    try{
        const users = await userModel.find()

        res.send(users)
    }catch(err){
        res.send(err)
    }
}

module.exports.getUserById = async (req, res) => {
    if (!ObjectID.isValid(req.params.user_id))
    return res.status(400).send('Utilisateur inconnu ' + req.params.user_id)
    try{
        const user = await userModel.findById(req.params.user_id)

        res.send(user)
    }catch(err){
        res.status(400).send(err)
    }
}

module.exports.updateUser = async(req, res) => {
    if (!ObjectID.isValid(req.params.user_id))
        return res.status(400).send('Utilisateur inconnu ' + req.params.user_id)
    console.log(req.body)
    try {
        const updateUser = await userModel.findByIdAndUpdate(
            req.params.user_id, {
                $set: req.body
            }, { new: true },
        ).select('-password');
        return res.status(200).send({user:updateUser, msg:"Utilisateur mis à jour"})
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.updateEmail = async (req, res) => {
    if (!ObjectID.isValid(req.params.user_id)) {
        return res.status(400).send('ID d\'utilisateur invalide: ' + req.params.user_id);
    }

    try {
        // Trouver l'utilisateur
        const user = await userModel.findById(req.params.user_id);
        if (!user) {
            return res.status(404).json({message:'Utilisateur non trouvé'});
        }

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect !" });
        }

        // Vérification de la nouvelle adresse e-mail
        if (!validateEmail(req.body.email)) {
            return res.status(400).json({message:'Adresse e-mail invalide'});
        }

        // Mise à jour de l'utilisateur
        const updateUser = await userModel.findByIdAndUpdate(req.params.user_id, {
            $set: { email: req.body.email }
        }, { new: true }).select('-password');

        if (!updateUser) {
            return res.status(404).send({message:'Utilisateur non trouvé lors de la mise à jour'});
        }

        return res.status(200).json({ user: updateUser, message:"Votre email a été changé !" });
    } catch (error) {
        return res.status(500).json({ message: "Erreur du serveur", error });
    }
};

function validateEmail(email) {
    // Utilisez une expression régulière pour valider l'e-mail
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


module.exports.updatePassword = async (req, res) => {
    if (!ObjectID.isValid(req.params.user_id)) {
        return res.status(400).send('ID d\'utilisateur invalide: ' + req.params.user_id);
    }

    try {
        // Trouver l'utilisateur
        const user = await userModel.findById(req.params.user_id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérification de l'ancien mot de passe
        const isPasswordValid = await bcrypt.compare(req.body.oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Ancien mot de passe incorrect !" });
        }

        // Hashage du nouveau mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

        // Mise à jour de l'utilisateur avec le nouveau mot de passe hashé
        const updateUser = await userModel.findByIdAndUpdate(req.params.user_id, {
            $set: { password: hashedPassword }
        }, { new: true }).select('-password');

        if (!updateUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé lors de la mise à jour' });
        }

        return res.status(200).json({ message: "Votre mot de passe a été changé avec succès !" });
    } catch (error) {
        return res.status(500).json({ message: "Erreur du serveur", error });
    }
};

module.exports.deleteUserById = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send('Utilisateur inconnu ' + req.params.id)
    }
    

    try{
        const DeletedUser = await userModel.findByIdAndRemove(req.params.id)

        res.send(DeletedUser)

    }catch(err){
        res.status(400).send(err)
    }
}

module.exports.addUser = async (req, res) => {

    const checkUserExist = await userModel.find({email:req.body.email})

    if(checkUserExist.length > 0){
        return res.status(403).send('Utilisateur déjà enregistré')
    }
    else{

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const newUser = new userModel({
            email: req.body.email,
            password: hashedPass,
            isAdmin: req.body.isAdmin,
        })

        const savedUser = await newUser.save()

        res.status(200).send({user:savedUser, message:"Utilisateur créé avec succès."});
    }catch(err){
        res.status(400).send(err)
    }
    }
}

module.exports.signIn = async (req, res) => {
    try {
        // Vérification de l'existence de l'utilisateur
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            // Utilisation d'un message d'erreur générique pour améliorer la sécurité
            return res.status(401).json({ message: "Email ou mot de passe incorrect !" });
        }

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect !" });
        }

        // Création du token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        // Exclusion du mot de passe du résultat retourné
        const { password, ...otherDetails } = user._doc;

        res.status(200).json({ ...otherDetails, token });
    } catch (err) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la connexion.", error: err.message });
    }
};