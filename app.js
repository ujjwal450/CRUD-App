// const Item = require('./mongodb')
const express  = require('express')
const app = express()
app.use(express.json())
app.get('/items', (req, res) => {
  res.send('test')
})
app.post('/items', (req, res) => {
  console.log(req.body)
  
})
// app.update('items/item:id', (req, res) => {
//   res.send('Hello World')
// })

// app.delete('items/item:id', (req, res) => {
//   res.send('Hello World')
// })
app.listen(3000,() => {
  console.log('On port 3000')
})