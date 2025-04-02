const Poll = require("../models/Poll/pollSchema.js")

const createPoll = async (req,res)=>{
    try {

        const {options, question, totalVotes} = req.body;

        const poll = await Poll.create({
            options, 
            question,
            totalVotes
        })

        return res.json({
            success: true,
            message: "Poll added in db"
        })

        
    } catch (error) {

        return res.json({
            success: false,
            message: "Something went wrong"
        })
        
    }
}

const getAllPolls = async (req,res)=>{
    try {

        const polls = await Poll.find({});

        return res.json({
            success: true,
            polls
        })
        
    } catch (error) {
        console.log("get all polls catch")
            return res.json({
                success: false,
                message: "Something went wrong"
            })
    }
}

module.exports = {
    createPoll,getAllPolls
}