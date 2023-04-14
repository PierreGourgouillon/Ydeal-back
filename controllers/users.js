const User = require('../models/userModel');

exports.registerUser = async (req, res, next) => {
    // Verif
    let userFounded = await User.find({firebaseId: req.user.firebaseId})
    userFounded.push(...(await User.find({email: req.body.email})))
    if (userFounded.length != 0) return res.status(409).json({
        error: "USER_ALREADY_EXIST",
        data: {}
    });

    const user = new User({
        ...req.body,
        firebaseId: req.user.firebaseId
    })
    try {
        await user.save()
        res.status(201).json({
            error: null,
            data: {}
        });
    } catch (error) {
        res.status(400).json({
            error: "INTERNAL_ERROR",
            data: {}
        });
    }
}

exports.getUsers = async (req, res, next) =>{
    try {
        const users = await User.find()
        res.status(200).json({
            error: null,
            data: users
        });
    
    }catch(error){
        res.status(400).json({
            error:  "INTERNAL_ERROR" ,
            data: null
        }) 
    } 
}

exports.getUserId = async (req, res, next)=>{
    try{
        const userId = req.params.userId
        const userfound = await User.find({firebaseId: userId})
        //console.log()
        res.status(200).json({
            error: null,
            data: userfound
        });
    }catch(error){
        res.status(400).json({
            error:  "INTERNAL_ERROR" ,
            data: null
        }) 
    } 
}


exports.updateUser = async (req, res, next) => {
    const filter = { firebaseId: req.params.userId };
    const update = { ...req.body };

    try {
        let userUpdate = await User.findOneAndUpdate(filter, update, {new: true});
        res.status(201).json({
            error: null,
            data: userUpdate
        });
    } catch (error) {
        res.status(400).json({
            error: "INTERNAL_ERROR",
            data: {}
        });
    }
}
exports.deleteUser = async (req, res, next) =>{
    try{
        const userId = req.user.firebaseId
        const userFound = await User.findOne({firebaseId: userId})

        if (userId != userFound.firebaseId) {
            return res.status(400).json({
                error:  "NOT_OWNER_ERROR" ,
                data: null
            }) 
        }

        await User.deleteOne({ firebaseId: userId })
        res.status(200).json({
            error: null,
            data: {}
        });
    }catch(error){
        res.status(400).json({
            error:  "INTERNAL_ERROR" ,
            data: null
        }) 
    } 
}
