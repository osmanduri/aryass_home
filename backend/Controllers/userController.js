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
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('Utilisateur inconnu ' + req.params.id)
    try{
        const user = await userModel.findById(req.params.id)

        res.send(user)
    }catch(err){
        res.status(400).send(err)
    }
}

module.exports.updateUser = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Utilisateur inconnu ' + req.params.id)
    try {
        const updateUser = await userModel.findByIdAndUpdate(
            req.params.id, {
                $set: req.body
            }, { new: true },
        ).select('-password');
        return res.status(200).send(updateUser)
    } catch (err) {
        return res.status(400).send(err)
    }
}

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
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const newUser = new userModel({
            nom: req.body.nom,
            prenom:req.body.prenom,
            email: req.body.email,
            password: hashedPass,
            isAdmin: req.body.isAdmin,
        })

        const savedUser = await newUser.save()

        res.status(200).send(savedUser);
    }catch(err){
        res.status(400).send(err)
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