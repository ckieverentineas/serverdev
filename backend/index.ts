import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express()
app.use(cors())
app.use(bodyParser.json());
const posts = new Array()
app.get('/user', async (req, res) => {
  res.json(posts)
})
app.post('/user/post', async (req, res) => {
  console.log(req.body)
  const { password, email} = await req.body
  console.log(email)
  const result = {
    email,
    password
  }
  posts.push(result)
  console.log(posts)
  res.json(posts)
})
const server = app.listen(3000)