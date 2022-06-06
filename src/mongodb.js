const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
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
userSchema.pre('save', async function(next){
  const user = this
  if (user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})
userSchema.statics.findByCredentials = async (username, password) => {
  console.log(password)
  const user = await User.findOne({username})
  console.log(user)
  if (!user){
    throw new Error('Unable to login')
  }
  const isMatch =await bcrypt.compare(password, user.password)
  console.log(isMatch)
  if(!isMatch){
    throw new Error('Unable to login')
  }
  return user
}
const Item = mongoose.model('Item', itemSchema)
const User = mongoose.model('USer', userSchema)
module.exports = {Item, User}
