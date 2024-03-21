const userModel = require('../Model/userModel')
const ObjectID = require('mongoose').Types.ObjectId
const moment = require('moment')
moment.locale('fr')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        const user = await userModel.findById(req.params.id).select("-password")

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
    try{
        const user = await userModel.findOne({email: req.body.email})

        if(!user){
            return res.json({ message: "Utilisateur inconnue !"})
        }

        const decryptPassword = await bcrypt.compare(req.body.password, user.password)

        if(!decryptPassword){
            return res.json({message: "Mot de passe incorrect !"})
        }

        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SEC, {expiresIn: "3d"}
        )

        const {password, ...others} = user._doc

        res.status(200).send({...others, token})
    }catch(err){
        res.status(400).send(err)
    }
}