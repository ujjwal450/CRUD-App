const mongoose = require('mongoose');
const { Schema } = mongoose
mongoose.connect('mongodb://127.0.0.1:27017/test')

const itemSchema = new Schema({
  name: {
    type:String,
    required: true
  },
  description:{
    type: String,
    required: true
  }

})

const userSchema = new Schema({
  username:{
    type: String,
    required: true
  },
  password: {
    type:String,
    required: true
    // validate(value){

    // }
  }
})

const Item = mongoose.model('Item', itemSchema)
const User = mongoose.model('USer', userSchema)
module.exports = {Item, User}
