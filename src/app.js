const {Item, User} = require('./mongodb')
const express  = require('express')
const auth = require('./middleware/auth')
const app = express()
app.use(express.json())


app.get('/items', auth, async(req, res) => {

  try {

    const users = await Item.find({})
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send(error)
  }

})

app.post('/signup', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({user, token})
  } catch (error) {
    res.status(400).send(error.message)
  }

})

app.post('/login', async(req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).send({user, token})
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.get('/items/:id', auth, async(req,res) => {
  try {
    
    const item = await Item.findById({_id: req.params.id})
    if(!item){
      return res.send("Item not found")
    }
    res.status(200).send(item)
  } catch (error) {
    res.status(200).send(error)
  }
  
})

app.post('/items', auth, async(req, res) => {
  const item = new Item(req.body)
  try {
    await item.save()
    res.status(200).send(item)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.put('/items/:id', auth, async(req, res) => {
  console.log(req.params)
  console.log(req.body)
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body)
    if(!item){
      return res.status(404).send('Item not found')
    }
    res.status(201).send("Item updated")
  } catch (error) {
    res.status(400).send(error)
  }
  
})

app.delete('/items/:id', auth, async(req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)
    if(!item){
      return res.status(404).send("Item not found")
    }
    res.status(202).send(item)
  } catch (error) {
    res.status(404).send(error)
  }
  
})

app.listen(3000,() => {
  console.log('On port 3000')
})