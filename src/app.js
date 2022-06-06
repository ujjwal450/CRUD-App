const {Item, User} = require('./mongodb')
const express  = require('express')
const { Error } = require('mongoose')
const app = express()
app.use(express.json())

app.get('/items', async(req, res) => {

  try {

    const users = await Item.find({})
    res.send(users)
  } catch (error) {
    res.send(error)
  }

})

app.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body)
    const isUserExist = await User.findOne({username: req.body.username})
    if(isUserExist){
      throw new Error('Username taken')
    }
    await user.save()
    res.send(user)
  } catch (error) {
    res.send(error.message)
  }

})

app.post('/login', async(req, res) => {
  try {
    console.log(req.body)
    const user = await User.findByCredentials(req.body.username, req.body.password)
    res.send(user)
  } catch (error) {
    res.send(error.message)
  }
})

app.get('/items/:id', async(req,res) => {
  try {
    
    const item = await Item.findById({_id: req.params.id})
    if(!item){
      return res.send("Item not found")
    }
    res.send(item)
  } catch (error) {
    res.send(error)
  }
  
})

app.post('/items', async(req, res) => {
  const item = new Item(req.body)
  try {
    await item.save()
    res.send(item)
  } catch (error) {
    res.send(error)
  }
})

app.put('/items/:id', async(req, res) => {
  console.log(req.params)
  console.log(req.body)
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body)
    if(!item){
      return res.send('Item not found')
    }
    res.send("Item updated")
  } catch (error) {
    res.send(error)
  }
  
})

app.delete('/items/:id', async(req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)
    if(!item){
      return res.send("Item not found")
    }
    res.send(item)
  } catch (error) {
    res.send(error)
  }
  
})

app.listen(3000,() => {
  console.log('On port 3000')
})