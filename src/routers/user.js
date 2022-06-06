const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/signup', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({user, token})
  } catch (error) {
    res.status(400).send(error.message)
  }

})

router.post('/login', async(req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).send({user, token})
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post('/logout', auth, async(req, res) => {
  try {
    
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    console.log(req.user.tokens)
    await req.user.save()
    res.send(req.user.tokens)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/logoutAll', auth, async(req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
