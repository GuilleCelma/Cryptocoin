const { Schema, model } = require("mongoose");


const userSchema = new Schema({
  username: {
    type: String,
  },
  email:String,
  password: String,
  transactions:  [{ type: Schema.Types.ObjectId, ref: 'Transaction' }]
}, 
{
  timestamps:true
}
);

const User = model("User", userSchema);

module.exports = User;
