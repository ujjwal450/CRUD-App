const mongoose = require('mongoose');
const { Schema } = mongoose
mongoose.connect('mongodb://127.0.0.1:27017/test')

const itemsSchema = new Schema({
  name: {
    type:String,
    required: true
  },
  description:{
    type: String,
    required: true
  }

})

const Item = mongoose.model('Item', itemsSchema)

// module.exports(Item)
