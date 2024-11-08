const express = require("express")
const router = express.Router()
const User = require("../models/usersModel")

router.post("/login", async (req, res) => {
    const {username, password} = req.body
    
    try {
        const user = await User.findOne({username, password})
        if(user){
           return res.status(200).json(user)
        }else{
            return res.status(400).json({message:"Login backend error"})
        }
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.post("/register", async (req, res) => {
    try {
        const newuser = new User(req.body)
        await newuser.save()
        return res.status(200).json({message:"User register successfully"})
    } catch (error) {
        return res.status(400).json(error)
    }
})

module.exports = router