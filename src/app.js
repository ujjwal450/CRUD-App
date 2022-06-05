const Item = require('./mongodb')
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

app.get('/items/:id', (req,res) => {
  Item.findById({_id: req.params.id}).then((item) => {
    if (!item){
      res.send("Item not found")
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
      res.send('Item not found')
    }
    res.send(item)
  }).catch((error) => {
    res.send(error)
  })
})

app.listen(3000,() => {
  console.log('On port 3000')
})