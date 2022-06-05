const {Item, User} = require('./mongodb')
const express  = require('express')
const app = express()
app.use(express.json())

app.get('/items', (req, res) => {
  Item.find({}).then((items) => {
    res.status(200).send(items)
  }).catch((error) => {
    res.status(400).send(error)
  })
})

app.post('/signup', (req, res) => {
  User.findOne({username: req.body.username}).then((user)=> {
    if (!user){
      const user = new User(req.body)
      return user.save(res.body)
    }
    res.send("username taken")
  }).then((user) => {
    res.send(user)
  }).catch((error) => {
    res.send(error)
  })
})

app.post('/login', (req, res) => {
  User.findOne({username: req.body.username, password: req.body.password}).then((user) => {
    if(!user){
      return res.send('User not found')
    }
    res.send("logged in")
  }).catch((error) => {
    res.send(error)
  })
})

app.get('/items/:id', (req,res) => {
  Item.findById({_id: req.params.id}).then((item) => {
    if (!item){
      return res.send("Item not found")
    }
    res.status(200).send(item)
  } ).catch((error) => {
    res.status(400).send(error)
  })
})

app.post('/items', (req, res) => {
  const item = new Item(req.body)
  item.save().then(() => {
    console.log(item)
  }).catch((error) => {
    res.status(400).send(error)
  })
  res.send("Item Added")
})

app.put('/items/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body).then((item) => {
    if(!item){
      res.send('Item not found')
    }
    res.send(item)
  }).catch((error) => {
    res.send(error)
  })
})

app.delete('/items/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id).then((item) => {
    if(!item){
      return res.send('Item not found')
    }
    res.send(item)
  }).catch((error) => {
    res.send(error)
  })
})

app.listen(3000,() => {
  console.log('On port 3000')
})