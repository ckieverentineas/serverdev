import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express()
app.use(cors())
app.use(bodyParser.json());
app.get('/user', async (req, res) => {
  const posts = {
      "email": "amino@ami.no",
      "password": "2213sfs",
      "birthday": "1999"
  }
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
  res.json(result)
})
const server = app.listen(3000)