const express = require('express')
const Item = require('../models/item')
const auth = require('../middleware/auth')

const router = new express.Router()


router.get('/items', auth, async(req, res) => {

  try {

    const users = await Item.find({})
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send(error)
  }

})


router.get('/items/:id', auth, async(req,res) => {
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

router.post('/items', auth, async(req, res) => {
  const item = new Item(req.body)
  try {
    await item.save()
    res.status(200).send(item)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/items/:id', auth, async(req, res) => {
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

router.delete('/items/:id', auth, async(req, res) => {
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

module.exports = router