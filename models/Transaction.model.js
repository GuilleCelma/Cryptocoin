const {Schema, model} = require("mongoose")

const transactionSchema = new Schema({
    type:String,
    coin: String,
    value: String,
    date:String,
    author: String,
    edit: {
        type:Boolean,
        default: false
    }
    },
    {
    timestamps:true
    }
    )

const transaction = model("transaction", transactionSchema)

module.exports = transaction